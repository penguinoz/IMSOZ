import {global} from '/imports/global/global_things.js';
var instance;
Template.contentDetailVs.onCreated(function(){
  instance = this;
  instance.storyData = new ReactiveVar();
  instance.commentData = new ReactiveVar();
  instance.selectedComment = new ReactiveVar();
  instance.isLiked = new ReactiveVar(false);
  instance.likeData = new ReactiveVar();
  instance.selectedUser = new ReactiveVar();
  instance.contentId = instance.data._id;
  instance.pageOwnerId = this.data.pageOwnerId;
    instance.groupId = [];

  Session.set('confrim_center', false);

  Meteor.call("getStoryById",instance.data._id, function(err,res){
    if(err){
      console.log(err);
    } else {
      instance.groupId = res.groupId;
      instance.storyData.set(res);
      getLikeData(res.groupId);
      getCommentData(res.groupId);
    }
  });

  if(instance.data._id){
    Session.set("scrollPosition",instance.data._id);
  }

  // getCountinfo('getCommentLikeCount', _conetn)
  Session.set('commentControlOpen',false);
});

Template.contentDetailVs.onRendered(function(){
});

Template.contentDetailVs.events({
  "click #back": function(e, t){
    e.preventDefault();
    back(t);
  },
  "click #home": function(e, t){
    e.preventDefault();
    // back(t);
    if(Session.get('navData') && Session.get('navData').prevTemplate && Session.get('navData').type === 'BL'){
      Session.set("scrollPosition",Session.get('navData').contentId);
    }
    Router.go('endingNoteVs', {_id: t.pageOwnerId},{replaceState: false});
  },
  "click #like":function(e, t){
    var thisData = this;
    if(!Meteor.userId()){
      // alert('로그인 후에 사용가능합니다.');
      // Router.go('login',{},{replaceState: false});
      // return;
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'contentDetailVs',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    var likeObject = {
      userId : Meteor.userId(),
      contentId : this._id
    };

    if(t.isLiked.get()){
      t.isLiked.get(false);
      Meteor.call("removeLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'use', t.storyData.get().type,'DEFAULT', likeObject.contentId);
          getLikeData(t.groupId);
        }
      });
    } else {
      Meteor.call("insertLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {

          ///////////////// fcm send ///////////////////////////
          var fcmCode = global.fcmHistoryCode();
          Meteor.call('checkUpdateFcmHistory', [thisData.userId], fcmCode.like, thisData._id, function(err, res){
            if(err)console.log(err);
            if(res && res.length){
              Meteor.call("getTokenIds", res, function(err,res){
                if(err)console.log(err);
                if(res && res.length){
                  //fcm전송
                  //여기서 res는 무조건 하나
                  var sendObj = {
                    tokenId : res[0].fcmToken,
                    body : "누군가 내 글을 좋아합니다.",
                    title : "It's my story",
                    url : global.siteUrl +"/myPage/friends"
                  }
                  global.sendFcmMessage(sendObj);
                }
              });
            }
          });
          /////////////////////// end fcm /////////////////////

          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'get', t.storyData.get().type,'DEFAULT', likeObject.contentId);
          getLikeData(t.groupId);
        }
      });

    }
  },
  "click #setComment":function(e,t){
    var thisData = this;
    if(!Meteor.userId()){
      // alert('로그인 후에 사용가능합니다.');
      // Router.go('login',{},{replaceState: false});
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'contentDetailVs',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    if(!$("#comment").val()){
      // alert('댓글 내용이 없습니다.');
      var confrimData = {
        title : '댓글 내용을 입력해주세요.',
        context : '',
        templateName : 'contentDetail',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return;
    }

    var _id; //입력값이기때문에 설정하지않는다.
    // console.log(this);
    var commentObject = {
      userId : Meteor.userId(),
      contentId : this._id,
      comment : $("#comment").val(),
      updateDate : global.fn_dateFormat().HMS
    };

    var contentUserId = this.userId;
    Meteor.call("upsertComment", _id, commentObject, function(err, res){
      if(err){
        console.log(err);
      } else {

        //////////////////fcm 전송부분 //////////////////
        var fcmCode = global.fcmHistoryCode();
        // Meteor.call('checkUpdateFcmHistory', [thisData.userId], fcmCode.comment, thisData._id, function(err, res){
        //   if(err)console.log(err);
        //   if(res && res.length){

        //댓글 작성 알림
        // - 내글에 댓글을 달 땐 알림 보내지 않음 (내글 아닌 글에만 알림 전송)
        if(contentUserId !== Meteor.userId()){
          Meteor.call("getTokenIds", [thisData.userId], function(err,res){
            if(err)console.log(err);
            if(res && res.length){
              //fcm전송
              //여기서 res는 무조건 하나
              var sendObj = {
                tokenId : res[0].fcmToken,
                body : "댓글이 작성되었습니다. 앱에서 확인하세요!",
                title : "It's my story",
                url : global.siteUrl +"/story/detail/"+thisData._id
              }
              global.sendFcmMessage(sendObj);
            }
          });
        }
        //   }
        // });
        /////////////////////// end fcm /////////////////////

        //댓글 작성 포인트추가
        Meteor.call('setPoint', 'PO0003', Meteor.userId(), 'get', t.storyData.get().type,'DEFAULT', commentObject.contentId);

        getCommentData(t.groupId);
        $('#comment').val('');
      }
    });


  },
  "click .comment-control":function(e, t){
    e.preventDefault();

    if(!Meteor.userId()){
      // alert('로그인 후에 사용가능합니다.');
      // Router.go('login',{},{replaceState: false});
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'contentDetailVs',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    var deleteInfo = {
      commentId : this._id,
      parentInstance : t
    };
    Session.set('commentControlOpen',true);
    t.selectedComment.set(deleteInfo);
  },
  "click #editStory":function(e, t){
    e.preventDefault();

    Router.go('editStory',{_id: t.contentId},{replaceState: false});
  },
  "click #moveComment":function(e, t){
    e.preventDefault();
    var offset = $("#comment").offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
  },
  "click #removeStory": function(e, t){
    e.preventDefault();

    //confrim창 열가
    var confrimData = {
      title : '스토리 삭제',
      context : '스토리를 삭제하시겠습니까?',
      templateName : 'contentDetail',
      returnData : this._id,
      singleBtn : false,
      btnName : ''
    };


    Session.set('confrim_center', confrimData);
    // t.removeConfirmData.set(confrimData);
  },
  "click .tag":function(e,t){
    e.preventDefault();

    //검색화면으로 넘어갈 수 있게 해야함
    // console.log(this);
  },
  "click #commentUserProfile": function(e, t){
    t.selectedUser.set(this.userId);
  }
});

Template.contentDetailVs.helpers({
  hpStoryData: function(){
    return Template.instance().storyData.get();
  },
  hpCommentData:function(){
    // console.log("coment "+new Date());
    return Template.instance().commentData.get();
  },
  hpIsLiked:function(){
    return Template.instance().isLiked.get();
  },
  hpLikeData:function(){
    return Template.instance().likeData.get();
  },
  hpCommentControlPageOpen : function(){
    return Session.get('commentControlOpen');
  },
  hpSelectedComment: function(){
    return Template.instance().selectedComment.get();
  },
  hpCommentDeleteCallBack: function(_groupId){
    // getCommentData(_instance.contentId, _instance);
    getCommentData(_groupId);
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpConfirmCallBack :  function(_contentId){
    removeContent(_contentId, Template.intance());
  },
  hpIsEmpty : function(datas){
    if(datas && datas.length > 0){
      return true;
    }else{
      return false;
    }
  },
  hpSelectedUser : function(_userId){
    var result = false;
    if(_userId === Template.instance().selectedUser.get()){
      result = true;
    }
    return result;
  }
});

function getCommentData(_groupId){
  Meteor.call("getCommentByContentId", _groupId, function(err, res){
    if(err){
      console.log(err);
    } else {
      instance.commentData.set(res);
    }
  });
}


function getLikeData(_groupId){
  Meteor.call("getLikeByContentId", _groupId, function(err, res){
    if(err){
      console.log(err);
    } else {
      var isLiked = _.findWhere(res, {userId:Meteor.userId()}) ? true : false;

      instance.isLiked.set(isLiked);
      instance.likeData.set(res);
    }
  });
}

function removeContent(_contentId, _intance){
  // console.log('삭제 탔음', _contentId);
  Meteor.call('removeStory', _contentId, function(error, result){
    if(error){
      console.log(error);
    } else {

      //라이프맵 삭제
      Meteor.call('removeLifeMap',_contentId, function(error, result){
        if(error){
          console.log(error);
        } else {

        }
      });

      Session.set("timelineDataVs",null);
      //이전화면으로 이동
      back(_intance);
    }
  });
}

function back(_instance){

  window.history.back();
  // if(Session.get('navData') && Session.get('navData').prevTemplate){
  //   switch(Session.get('navData').prevTemplate){
  //     case 'endingNoteVs':
  //     if(Session.get('navData').type === 'BL'){
  //       Router.go('bucketDetailVs', {_id: _instance.pageOwnerId, contentId:Session.get('navData').contentId},{replaceState: false});
  //     } else {
  //       Router.go('endingNoteVs', {_id: _instance.pageOwnerId},{replaceState: false});
  //     }
  //     break;
  //     case 'bucketDetailVs' :
  //     Router.go(Session.get('navData').prevTemplate,  {_id: _instance.pageOwnerId, contentId:Session.get('navData').contentId},{replaceState: false});
  //     break;
  //     case 'lifeMap':
  //       if(Session.get('navData').type === 'BL'){
  //         Router.go('bucketDetailVs', {_id: _instance.pageOwnerId, contentId:Session.get('navData').contentId},{replaceState: false});
  //       } else {
  //         // Router.go('lifeMap',{_id:Session.get('navData').userId},{replaceState: false});
  //         Router.go('lifeMapView', {_id: _instance.pageOwnerId, searchStr : Session.get('navData').enSearchOption},{replaceState: false});
  //         // location.href = Session.get('navData').enSearchOption;
  //       }
  //     break;
  //   }
  // } else {
  //   Router.go('endingNoteVs', {},{replaceState: false});
  // }

  // Router.go('endingNoteVs', {_id: _instance.pageOwnerId},{replaceState: false});
}


Template.moveCommentTempVs.onCreated(function(){
});

Template.moveCommentTempVs.onRendered(function(){

  // if(Session.get("moveComment") ){
  //   var offset = $("#commentCnt").offset();
  //   $('html, body').animate({scrollTop : offset.top-100}, 400);
  // }

});

Template.moveCommentTempVs.onDestroyed(function(){
  // Session.set("moveComment",null);
});


/////////////////////// todo 막코딩 로딩 두번해서 데이터 없는 스크롤 계산 오류 방어//////////
Template.moveCommentTempEmptyVs.onCreated(function(){
});

Template.moveCommentTempEmptyVs.onRendered(function(){

  if(Session.get("moveComment") ){
    var offset = $("#commentCnt").offset();
    $('html, body').animate({scrollTop : offset.top-100}, 400);
  }

});

Template.moveCommentTempEmptyVs.onDestroyed(function(){
  // if(Session.get("moveComment")===2){
  Session.set("moveComment",null);
  // };
});

import {global} from '/imports/global/global_things.js';


var instance;
var metoerCallControl = false;
Template.bucketDicDetailVs.onCreated(function(){
  instance = this;
  instance.bucketData = new ReactiveVar();
  instance.contentId = instance.data._id;
  instance.isLiked = new ReactiveVar(false);
  instance.likeData = new ReactiveVar();
  instance.myLikeList = new ReactiveVar();
  instance.pageOwnerId = this.data.pageOwnerId;
  instance.userId = Meteor.userId();
  instance.bucketDataObj = {dic:{},story:[]};
  instance.storyCount = new ReactiveVar();
  instance.selectedUser = new ReactiveVar();
  instance.myBucketCnt = new ReactiveVar();
  instance.likeComCount = new ReactiveVar();

  Session.set('popup_guide', false);
  Session.set('confrim_center', false);
  Session.set('confrim_complete_center', false);
  Session.set("story_selectedMenu", 'buckyStory');

  Meteor.call("getMyBucketCount", instance.userId, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.myBucketCnt.set(result);
    }
  });

  Meteor.call("getBucketFromId", instance.data._id, global.fn_passCode(instance.pageOwnerId, 'DC'), function(err,res){
    if(err){
      console.log(err);
    } else {
      instance.bucketDataObj.dic = res;
      Meteor.call("getAllBuckyStory", instance.data._id, 0, function(err,res){
        if(err) console.log(err);
        if(res){
          // console.log(res);
          instance.bucketDataObj.story = res;
          instance.bucketData.set(instance.bucketDataObj);
        }
      });
      // instance.bucketData.set(bucketData);
    }
  });

  Meteor.call("getStoryCount", instance.data._id, instance.userId, function(err,res){
    if(err)console.log(err);
    if(res){
      instance.storyCount.set(res);
    }
  });

  Meteor.call("getLikeComCount", instance.data._id, function(err,res){
    if(err)console.log(err);
    if(res){
      // console.log(res);
      instance.likeComCount.set(res);
    }
  });
  getLikeData(instance.data._id, instance);
  getLikeListData(Meteor.userId(),instance);

  // var navData ={
  //   type : 'BS',
  //   category:"writeStory",
  //   contentId:instance.contentId,
  //   prevTemplate : "bucketDetailVs",
  //   pageOwnerId : instance.pageOwnerId,
  // };
  //
  // Session.set('navData', navData);

  if(instance.data && instance.data._id){
    Session.set("scrollPosition",instance.data._id);
  }
});

Template.bucketDicDetailVs.onRendered(function(){
  // $(".bdic-detail").show().animate( { left: 0 }, 500 );
  $(window).scroll(function() {

    // console.log("dic detail");
    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
      if (calc > 70) {
    //기존 데이터 가져오기

     if(metoerCallControl){
       $(".loading").hide();
       return;
     }
/////////////////////////////////////////////////////////////////
    var stCount = 0;
    if(instance.bucketDataObj && instance.bucketDataObj.story){
      stCount = instance.bucketDataObj.story.length;
    }
     var tabMenu = Session.get("story_selectedMenu");
     var contId = instance.bucketDataObj.dic._id;
     switch(tabMenu){
       case 'buckyStory':
         if(stCount >= instance.storyCount.get().all ){
           // console.log("return story");
           return;
         }
         metoerCallControl = true;
         // 전체 버키스토리 가져오는 기능
         Meteor.call("getAllBuckyStory", contId, stCount, function(err,res){
           if(err) console.log(err);
           if(res){
             metoerCallControl = false;
             instance.bucketDataObj.story = instance.bucketDataObj.story.concat(res);
             instance.bucketData.set(instance.bucketDataObj);
           }
         });
         break;
       case 'myBuckyStory':
         if(instance.bucketDataObj.story.length >= instance.storyCount.get().my ){
           // console.log("return mystory");
           return;
         }
         metoerCallControl = true;
         //내 버키스토리만 가져오는 기능
         Meteor.call("getMYBuckyStory", contId, Meteor.userId() , stCount, function(err,res){
           if(err) console.log(err);
           if(res){
             metoerCallControl = false;
             instance.bucketDataObj.story = instance.bucketDataObj.story.concat(res);
             instance.bucketData.set(instance.bucketDataObj);
           }
         });
         break;
       default :
         case 'endingNote':
     }
     metoerCallControl = false;
     $(".loading").hide();
/////////////////////////////////////////////////////////////////

   }
  });
});


Template.bucketDicDetailVs.events({
  "click #back": function(e, t){
    e.preventDefault();

    window.history.back();
    // //endingNote로 가기
    // // Router.go('endingNoteVs', {_id: t.pageOwnerId},{replaceState: false});
    // if(Session.get('navData') && Session.get('navData').prevTemplate){
    //   switch(Session.get('navData').prevTemplate){
    //     case 'endingNoteVs':
    //       Router.go('endingNoteVs', {_id: t.pageOwnerId},{replaceState: false});
    //     break;
    //     case 'lifeMap':
    //       // location.href = Session.get('navData').enSearchOption;
    //       // Router.go('lifeMap',{_id:Session.get('navData').userId},{replaceState: false});
    //       Router.go('lifeMapView', {_id: t.pageOwnerId, searchStr : Session.get('navData').enSearchOption},{replaceState: false});
    //     break;
    //   }
    // } else {
    //   Router.go('endingNoteVs', {_id: t.pageOwnerId},{replaceState: false});
    // }
  },
  "click #showDetail": function(e, t){
    e.preventDefault();

    // var contentId = t.contentId;
    // Router.go("contentBucketDetail", {_id: contentId},{replaceState: false});

    $(".detail-area").slideDown(300);
    $(".overlay-contents").hide();
    $("#showDetail").hide();
    $(".bucket-detail .dic-summary figure .img-frame-shadow").css("height", "400px !important");
    $("#img-frame").attr("src", "/images/bg/img_frame.png");
  },
  "click #hideDetail": function(e, t){
    $(".detail-area").slideUp(300);
    $(".overlay-contents").show();
    $("#showDetail").show();
    $(".bucket-detail .dic-summary figure .img-frame-shadow").css("height", "300px !important");
    $("#img-frame").attr("src", "/images/bg/bucket_shadow.png");
  },
  "click .float-button.flt-icon-pen a": function(e, t){
    e.preventDefault();
    if(Meteor.userId()){
      if(instance.bucketData.get().dic.myBucketId){
        Router.go("writeStory",{},{replaceState: false});
      } else {
        // alert('버킷리스트 따라하기 이후 버키스토리 작성이 가능합니다.');
        var popupData = {
          image : '/images/bg/guide_buckey_copy.png',
          title : '',
          context : '버킷리스트 <span>담기 이후</span><br />버키스토리 <span>작성이 가능</span>합니다.',
          templateName : 'guidePopup01',
          returnData : '',
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('popup_guide', popupData );
        return;
      }
    } else {
      Router.go("login",{},{replaceState: false});
    }
  },
  "click #follow": function(e, t){
    e.preventDefault();

    if(Meteor.userId()){
      //해당 버킷을 따라하기하시겠습니까? 컨펌창 띄우기
      //confrim창 열가
      var confrimData = {
        title : '내 버킷에 담기',
        context : '내 버킷에 담으시겠습니까?',
        templateName : 'bucketDicDetailVs',
        returnData : {
          type : 'follow',
          contentId : t.contentId,
        },
        singleBtn : false,
        btnName : ''
      };

      Session.set('confrim_center', confrimData);
    } else {
      // alert('로그인이 필요한 기능입니다.');
      // Router.go("login",{},{replaceState: false});
      var confrimData = {
        title : '로그인 후 사용가능합니다.',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
  },
  "click #complete": function(e, t){
    e.preventDefault();


    if(Meteor.userId()){
      //해당 버킷을 따라하기하시겠습니까? 컨펌창 띄우기
      //confrim창 열가
      var bucketData = instance.bucketData.get();
      //이미 완료한 경우 스킵하도록 수정
      if(bucketData.dic.isCompleted){
        // alert('완성된 버킷리스트입니다.');
        var confrimData = {
          title : '완성된 버킷리스트입니다.',
          context : '',
          templateName : 'bucketDicDetailVs',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };
        Session.set('confrim_center', confrimData);
        return;
      }
      // 스토리가 하나 이상 있는 지 확인
      if(t.storyCount.get().my > 0){
        var confrimData = {
          title : '따라한 버킷리스트<div class="myBucketInfo">'+t.myBucketCnt.get().myBucketCnt +'개 중 <span>' + t.myBucketCnt.get().myCompletedCnt + '개 완성</span></div>',
          context : '회원님의 소중한 버킷리스트를<br/>드디어 완성하셨군요!!<br/>',
          templateName : 'bucketDicDetail',
          returnData : {
            type : 'complete',
            contentId : t.contentId,
          },
          singleBtn : false,
          btnName : ''
        };

        Session.set('confrim_complete_center', confrimData);
      } else {
        // alert('하나 이상의 버키스토리를 작성해야 완료처리 할 수 있습니다.');
        // alert('버킷리스트 따라하기 이후 버키스토리 작성이 가능합니다.');
        var popupData = {
          image : '/images/bg/guide_story_write.png',
          title : '',
          context : '하나 이상의 버키스토리를 작성하셔야<br /><span>나 이거 했어! 처리를 할 수 있습니다.</span>',
          templateName : 'guidePopup01',
          returnData : '',
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('popup_guide', popupData );
        return;
      }



    } else {
      // alert('로그인이 필요한 기능입니다.');
      // Router.go("login",{},{replaceState: false});
      var confrimData = {
        title : '로그인 후 사용가능합니다.',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }


  },
  "click #like":function(e, t){
    if(!Meteor.userId()){
      // alert('로그인 후에 사용가능합니다.');
      // Router.go('login',{},{replaceState: false});
      // return;
      var confrimData = {
        title : '로그인 후 사용가능합니다.',
        context : '',
        templateName : 'bucketDicDetailVs',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    var likeObject = {
      userId : Meteor.userId(),
      contentId : t.contentId
    };

    if(t.isLiked.get()){
      t.isLiked.get(false);
      Meteor.call("removeLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'use', t.bucketDataObj.dic.type,'DEFAULT', likeObject.contentId);
          getLikeData(t.contentId, t);
        }
      });
    } else {
      Meteor.call("insertLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'get', t.bucketDataObj.dic.type,'DEFAULT', likeObject.contentId);
          getLikeData(t.contentId, t);
        }
      });

    }

    Session.set("timelineDataVs",null);
    Session.set('bucketListDataVs',null);
    Session.set("bucketListStatusVs", null);
    Session.set("scrollPositionVs", null);
  },
  "click .story .tab-menu a": function(e, t){
    e.preventDefault();

    // console.log(e.currentTarget.id);
    var menuId = e.currentTarget.id;
    var contId = this.dic._id;
    Session.set("story_selectedMenu", menuId);

    switch(menuId){
      case 'buckyStory':
        // 전체 버키스토리 가져오는 기능
        Meteor.call("getBucketFromId", contId, Meteor.userId(), function(err,res){
          if(err){
            console.log(err);
          } else {
            t.bucketDataObj.dic = res;
            Meteor.call("getAllBuckyStory", contId, 0, function(err,res){
              if(err) console.log(err);
              if(res){
                t.bucketDataObj.story = res;
                t.bucketData.set(instance.bucketDataObj);
              }
            });
          }
        });
        break;
      case 'myBuckyStory':
        //내 버키스토리만 가져오는 기능
        Meteor.call("getBucketFromId", contId, Meteor.userId(), function(err,res){
          if(err){
            console.log(err);
          } else {
            t.bucketDataObj.dic = res;
            Meteor.call("getMYBuckyStory", contId,Meteor.userId() , 0, function(err,res){
              if(err) console.log(err);
              if(res){
                t.bucketDataObj.story = res;
                t.bucketData.set(instance.bucketDataObj);
              }
            });
          }
        });
        break;
      default :
        case 'endingNote':
    }
  },
  "click #storyContent": function(e, t){
    e.preventDefault();
    if(!Meteor.userId()){
      // alert('로그인 하면 상세스토리를 확인 할 수 있습니다.');
      // return;
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'bucketDicDetailVs',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    // console.log(this);
    // var contentId = this.type;
    Router.go("contentDetailVs", {_id: t.pageOwnerId, contentId:this._id},{replaceState: false});
  },
  "click #commentMove" : function(e, t){
    e.preventDefault();
    Session.set("moveComment",true);
    Router.go("contentDetail", {_id: this._id,moveComment:true},{replaceState: false});
  },
  "click #likeList" : function(e, t){
    e.preventDefault();
    if(!Meteor.userId()){
      // alert('로그인 후에 사용가능합니다.');
      // Router.go('login',{},{replaceState: false});
      // return;
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'bucketDicDetailVs',
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
    var isMyLike = false;
    var li = t.myLikeList.get();
    var clickedId = this._id;
    var type = this.type;
    var subType = this.subType;
    li.forEach(function(item){
      if(item.contentId === clickedId){
        isMyLike = true;
      }
    });

    if(isMyLike){
      t.isLiked.get(false);
      Meteor.call("removeLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'use',  type, subType, clickedId);
          getLikeData(t.contentId, t);
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

          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'get',  type, subType, clickedId);
          getLikeData(t.contentId, t);
        }
      });

    }
    getLikeListData(Meteor.userId(),t);
  },
  "click #userProfile": function(e, t){
    t.selectedUser.set(this.users_docs._id);
  }
});

Template.bucketDicDetailVs.helpers({
  hpBucketData: function(){
    return Template.instance().bucketData.get();
  },
  hpIsLiked:function(){
    return Template.instance().isLiked.get();
  },
  hpLikeData:function(){
    return Template.instance().likeData.get();
  },
  hpGetCount:function(type){
    if(type === 'all'){
      return Template.instance().storyCount.get().all;
    }else{
      return Template.instance().storyCount.get().my;
    }
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpConfirmCallBack :  function(_data){
    if(_data.type === "follow"){
      followBucket(_data.contentId, Meteor.userId());
    } else if(_data.type === "complete"){
      completeBucket(_data.contentId, Meteor.userId());
    }
  },
  hpCompleteConfirmData : function(){
    return Session.get('confrim_complete_center');
  },
  hpPopupGuide: function(){
    return Session.get('popup_guide');
  },
  hpSelected: function(_id){
    var seletedId = Session.get("story_selectedMenu");
    var result = false;
    if(_id === seletedId){
      result = true;
    }
    return result;
  },
  hpIsMyLikeConetnt : function(contId){
    var myLikeArr = Template.instance().myLikeList.get();
    var isMyData = false;
    myLikeArr.forEach(function(item){
      if(item.contentId === contId){
        isMyData = true;
      }
    });
    return isMyData;
  },
  //사용자 프로파일이미지 클릭시 풍선 처리
  hpSelectedUser : function(_userId){
    var result = false;
    if(_userId === Template.instance().selectedUser.get()){
      result = true;
    }
    return result;
  },
  hpGetCommCount : function(id){
    var commData = Template.instance().likeComCount.get().commentCount;
    var resData = 0;
    for(var i=0; i<commData.length ; i++){
      if(commData[i]._id === id){
        resData = commData[i].comcount;
      }
    }
    return resData
  },
  hpGetLikeCount : function(id){
    var likeData = Template.instance().likeComCount.get().likeCount;
    var resData = 0;
    for(var i=0; i<likeData.length ; i++){
      if(likeData[i]._id === id){
        resData = likeData[i].likeCount;
      }
    }
    return resData
  }
});

Template.bucketDicDetailVs.onDestroyed(function(){
  $(window).off('scroll');
});

function followBucket(_contentId, _userId){
  Meteor.call('setFollowBucket', _contentId, _userId, function(error, result){
    if(error){
      console.log(error);
    } else {

      Session.set("timelineDataVs",null);
      Session.set('bucketListDataVs',null);
      Session.set("bucketListStatusVs", null);
      Session.set("scrollPositionVs", null);

      // console.log(result);
      //디테일 화면 변경
      // 1. 따라하기 아이콘 변경
      var bucketData = instance.bucketData.get();
      bucketData.dic.followCnt += 1; //따라하기 카운트 1증
      bucketData.dic.myBucketId = result; //등록된 BL스토리 컨텐츠 ID
      instance.bucketData.set(bucketData);


      //라이프맵 데이터 (따라하기)입력
      var subjectInfo = global.fn_getSubjectInfo('BL0001')
      var lifeMapObj = {
        contentId: _contentId,
        userId: Meteor.userId(),
        keyword: subjectInfo.keyword,
        images: subjectInfo.images,
        mDate: global.fn_dateFormat(currentDate).YMD,
        updateDate: currentDate,
        batchDate: '',
        isUpdated: 'true',
        type : 'BL',
        subType : 'BL0001', //따라하기 코드
        lock : false,
      };
      Meteor.call('setLifeMap', '', lifeMapObj);

      //따라하기 포인트 추가
      Meteor.call('setPoint', 'PO0007', _userId, 'get', instance.bucketDataObj.dic.type,'DEFAULT', _contentId);
    }
  });
}

function completeBucket(_contentId, _userId){

    Meteor.call('setBucketComplete', _contentId, _userId, function(error, result){
      if(error){
        console.log(error);
      } else {

        Session.set("timelineDataVs",null);
        Session.set('bucketListDataVs',null);
        Session.set("bucketListStatusVs", null);
        Session.set("scrollPositionVs", null);

        var bucketData = instance.bucketData.get();
        //완료표시 노란색으로 변경
        bucketData.dic.isCompleted = true;
        instance.bucketData.set(bucketData);


        //라이프맵 데이터 (완료)입력
        var subjectInfo = global.fn_getSubjectInfo('BL0002')
        var lifeMapObj = {
          contentId: _contentId,
          userId: Meteor.userId(),
          keyword: subjectInfo.keyword,
          images: subjectInfo.images,
          mDate: global.fn_dateFormat(currentDate).YMD,
          updateDate: currentDate,
          batchDate: '',
          isUpdated: 'true',
          type : 'BL',
          subType : 'BL0002', //나이거했어 코드
          lock : false,
        };
        Meteor.call('setLifeMap', '', lifeMapObj);


        Meteor.call('setPoint', 'PO0008', Meteor.userId(), 'get',  instance.bucketDataObj.dic.type,'DEFAULT', _contentId);
      }
    });

}

function getLikeData(_contentId, _instance){
  // console.log(_contentId);
  Meteor.call("getLikeByContentId", _contentId, function(err, res){
    if(err){
      console.log(err);
    } else {
      // console.log(res);
      var isLiked = _.findWhere(res, {userId:Meteor.userId()}) ? true : false;

      _instance.isLiked.set(isLiked);
      _instance.likeData.set(res);
    }
  });
}
//좋아요 목록 조회
function getLikeListData(userId, _instance){
  Meteor.call("getMyLikeContentList", Meteor.userId(), function(err, res){
    if(err){
      console.log(err);
    } else {
      _instance.myLikeList.set(res);
    }
  });
}

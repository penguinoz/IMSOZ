import {global} from '/imports/global/global_things.js';
var instance;
Template.contentDetail.onCreated(function(){
  instance = this;
  instance.storyData = new ReactiveVar();
  instance.commentData = new ReactiveVar();
  instance.selectedComment = new ReactiveVar();
  instance.isLiked = new ReactiveVar(false);
  instance.likeData = new ReactiveVar();
  instance.selectedUser = new ReactiveVar();
  instance.contentId = instance.data._id;
  instance.groupId = [];
  instance.fcmInfo = [];
  instance.contentType = '';
  instance.contentSubType = '';

  instance.familyInfo = new ReactiveVar();
  instance.capsuleFriends = new ReactiveVar();
  instance.groupFriends = new ReactiveVar();
  instance.isbucketListVia = new ReactiveVar(false);
  instance.isBelongToSharedGroup = new ReactiveVar(false);
  // Session.get("footer_selectedMenu");
  // if(Session.get("footer_selectedMenu") === 'bucketList'){
  //   instance.isbucketListVia.set(true);
  // }

  Session.get("footer_selectedMenu");
  if(Session.get("footer_selectedMenu") === 'bucketList'){
    instance.isbucketListVia.set(true);
  }


  Session.set('editor_addUserList',null);
  Session.set('confrim_center', false);
  Session.set('editor_shared_user_show',false);


  Tracker.autorun(function(){
    Session.get('editor_shared_user_show');
    Meteor.call("getStoryById", instance.data._id, function(err,res){
      if(err){
        console.log(err);
      } else {
        instance.storyData.set(res);
        instance.groupId = res.groupId;
        instance.fcmInfo = res.fcmInfo;
        instance.contentType = res.type;
        instance.contentSubType = res.subType;



        if(res.isShared){
          var id = res.parentId ? res.parentId : res._id;
          Meteor.call('getSharedFriends', id, function(error, result){
            if(error){
              console.log(error);
            } else {
              instance.groupFriends.set(result);
              var isBelogTo = _.contains(_.pluck(result.friendsData, '_id'), Meteor.userId());
              instance.isBelongToSharedGroup.set(isBelogTo);

              var friendsData = global.fn_removeObjInArr(result.friendsData, '_id', Meteor.userId())
              Session.set('editor_addUserList',friendsData);

              Meteor.call('getFamilyInfo', result.senderData._id, res.targetId, function(error, result){
                if(error){
                  console.log(error);
                } else {
                  instance.familyInfo.set(result);
                }
              });
            }
          });
        } else {
          if(res.type === 'BD' && res.targetId.length>0){
            Meteor.call('getFamilyInfo', Meteor.userId(), res.targetId, function(error, result){
              if(error){
                console.log(error);
              } else {
                instance.familyInfo.set(result);
              }
            });
          }
        }


        //친구에게 보낸/받은 타임캡슐일경우
        if(res.subType === 'TC0002'){
          var id = res.capsuleId ? res.capsuleId : res._id;
          Meteor.call('getCapsuleFriends', id, function(error, result){
            if(error){
              console.log(error);
            } else {
              var isBelogTo = _.contains(_.pluck(result.friendsData, 'userId'), Meteor.userId());
              instance.isBelongToSharedGroup.set(isBelogTo);
              instance.capsuleFriends.set(result);
            }
          });

          //확인 로직 여기로 다 이동하고 싶은데....
          if(instance.data._id === id){
            Meteor.call('setTimeCapsuleOpen', instance.data._id, id, Meteor.userId(), function(error, result){
              if(error){
                console.log(error);
              } else {
                global.fn_resetSession();
                // Session.set("timelineData",null);
                // Session.set('bucketListData',null);
                // Session.set("bucketListStatus", null);
                // Session.set("scrollPosition", null);
                Router.go("contentDetail", {_id: instance.data._id},{replaceState: false});
              }
            });
          }
        }
        getLikeData(instance.groupId);
        getCommentData(instance.groupId);

      }
    });
  });


  if(instance.data._id){
    Session.set("scrollPosition",instance.data._id);
  }

  // getCountinfo('getCommentLikeCount', _conetn)
  Session.set('commentControlOpen',false);

  //lifemap에서 open된 형태일경우, nav를 따로 세팅해준다.
  // if(instance.data.navStr){
  //   var navStr = global.fn_passCode(instance.data.navStr, 'DC').split('_');
  //   var navData = {
  //     "prevTemplate" :  navStr[0],
  //     "userId" : navStr[1],
  //     "type" : navStr[2],
  //     "contentId" : navStr[3],
  //     "enSearchOption" : navStr[4],
  //   };
  //
  //
  //   // var navData ={
  //   //   prevTemplate : "lifeMap",
  //   //   userId : t.pageOwnerId,
  //   //   type : this.type,
  //   //   contentId: this.contentId,
  //   //   enSearchOption : "/lifeMap/map/" + t.pageOwnerId + '/' + t.enSearchOption
  //   // };
  //   Session.set('navData', navData);
  // }

  //네비게이션 데이터
  var navData ={
    contentId: instance.data._id,
    prevTemplate : "contentDetail",
    isBucketGo : false,
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  if(!Session.get('nav_contentDetail')){
    Session.set('nav_contentDetail', Session.get('navData'));
  }
  //2. 넘길 정보
  Session.set('navData', navData);

});

Template.contentDetail.onRendered(function(){
  // if(instance && instance.data.isReples){
  //   var scrollPosition = $($("reples").attr("data-target")).offset().top;
  //   $("body").animate({
  //         scrollTop: scrollPosition
  //   }, 500);
  // }

  // $(".ending-note-wrap").scroll( function() {
  //   var scroll = $(window);
  //   $(window).scroll( function() {
  //     // console.log(scroll.scrollTop());
  //     if(scroll.scrollTop() > 1) {
  //       $(".contents-detail .detail-header .wrap").addClass("black-transparency");
  //     } else if(scroll.scrollTop() < 1){
  //       $(".contents-detail .detail-header .wrap").removeClass("black-transparency");
  //     }
  //   }
  // );
});

Template.contentDetail.events({
  "click #back": function(e, t){
    e.preventDefault();

    back();
  },
  "click #home": function(e, t){
    e.preventDefault();
    if(Session.get('navData')){
      if(Session.get('navData').prevTemplate && Session.get('navData').type === 'BL'){
        Session.set("scrollPosition",Session.get('navData').contentId);
      }
      Session.set('mapData',null); //라이프맵 데이터 초기화
      switch(Session.get('navData').prevTemplate){
        // case "endingNote" :
        //   Router.go('endingNote',{},{replaceState: false});
        //   break;
        case "bucketDetail" :
          Router.go('bucketList',{menu:'all'},{replaceState: false});
          break;
        default :
          Router.go('endingNote',{},{replaceState: false});
      }
    } else {
      Router.go('endingNote',{},{replaceState: false});
    }
  },
  "click #like":function(e, t){
    var thisData = this;
    if(!Meteor.userId()){
      // alert('로그인 후에 사용가능합니다.');
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);

      // Router.go('login',{},{replaceState: false});
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
          // 1. 로그 사용여부확인
          if(global.writeLog){
            //2. 로그 생성
             Meteor.call('setLog', 'LG0012', Meteor.userId(), t.storyData.get().type, t.storyData.get().subType); //좋아요 취소
          }

          getLikeData(t.groupId);
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'use', t.storyData.get().type, t.storyData.get().subType, likeObject.contentId);
        }
      });
    } else {
      Meteor.call("insertLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          // 1. 로그 사용여부확인
          if(global.writeLog){
            //2. 로그 생성
             Meteor.call('setLog', 'LG0011', Meteor.userId(),t.storyData.get().type, t.storyData.get().subType); //좋아요
          }

          //////////////////fcm 전송부분 //////////////////
          if(t.fcmInfo.length > 1){
            // 공유/타임캡슐이 내꺼 이외에 한개 이상 있을경우
            var fcmCode = global.fcmHistoryCode();
            var fcmInfo = t.fcmInfo;
            // 좋아요를 했다는것을 표시를 하고,
              Meteor.call('checkUpdateFcmHistory', [thisData.userId], fcmCode.like, thisData._id, function(err, res){
                if(err)console.log(err);
                if(res && res.length){
                  // 나머지 친구들에게 알림을 보낸다 ()
                  _.map(fcmInfo, function(_item){
                    var item = _item;
                    if(Meteor.userId() !== item.userId){
                      Meteor.call("getTokenIds", [item.userId], function(err,res){
                        if(err)console.log(err);
                        if(res && res.length){
                          //fcm전송
                          //여기서 res는 무조건 하나
                          var sendObj = {
                            tokenId : res[0].fcmToken,
                            body : "누군가 내 글을 좋아합니다.",
                            title : "It's my story",
                            url : global.siteUrl+"/story/detail/"+item._id,
                          }
                          // console.log('여러명 친구 : ',sendObj);
                          global.sendFcmMessage(sendObj);
                        }
                      });
                    }
                  });
                }
              });
          } else {
            //내글밖에 없을때
            if(thisData.userId !== Meteor.userId()){
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
                        url : global.siteUrl+"/story/detail/"+thisData._id
                      }
                      // console.log('하나남은 글 : ',sendObj);
                      global.sendFcmMessage(sendObj);
                    }
                  });
                }
              });
            }
          }



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
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);

      return;
      // Router.go('login',{},{replaceState: false});
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
        // var fcmCode = global.fcmHistoryCode();
        // Meteor.call('checkUpdateFcmHistory', [thisData.userId], fcmCode.comment, thisData._id, function(err, res){
        //   if(err)console.log(err);
        //   if(res && res.length){
        //     console.log(" res  :"+res);

        //댓글 작성 알림
        if(t.fcmInfo.length > 1){
          // 공유/타임캡슐이 내꺼 이외에 한개 이상 있을경우
          var fcmCode = global.fcmHistoryCode();
          var fcmInfo = t.fcmInfo;
          // 나머지 친구들에게 알림을 보낸다 ()
          _.map(fcmInfo, function(_item){
            var item = _item;
            if(Meteor.userId() !== item.userId){
              Meteor.call("getTokenIds", [item.userId], function(err,res){
                if(err)console.log(err);
                if(res && res.length){
                  //fcm전송
                  //여기서 res는 무조건 하나
                  var sendObj = {
                    tokenId : res[0].fcmToken,
                    body : "댓글이 작성되었습니다. 앱에서 확인하세요!",
                    title : "It's my story",
                    url : global.siteUrl +"/story/detail/"+item._id
                  };
                  // console.log('여러명 친구 : ',sendObj);
                  global.sendFcmMessage(sendObj);
                }
              });
            }
          });
        } else {
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
                };
                // console.log('하나남은 글 : ', sendObj);
                global.sendFcmMessage(sendObj);
              }
            });
          }
        }


        //   }
        // });
        /////////////////////// end fcm /////////////////////



        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
           Meteor.call('setLog', 'LG0009', Meteor.userId(), t.storyData.get().type, t.storyData.get().subType); //댓글 작성
        }


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
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
      // Router.go('login',{},{replaceState: false});
    }

    var deleteInfo = {
      commentId : this._id,
      groupId : t.groupId
    };
    Session.set('commentControlOpen',true);
    t.selectedComment.set(deleteInfo);
  },
  //글 수정
  "click #editStory":function(e, t){
    e.preventDefault();
    var tempNav = Session.get('navData');
    if(this.type === 'BS'){
      tempNav.bucketId  = this.bucketId;
    }
    tempNav.type = this.type;
    Session.set('navData', tempNav);

    Router.go('editStory',{_id: t.contentId},{replaceState: true});
  },
  // 댓글 입력창으로 이동
  "click #moveComment":function(e, t){
    e.preventDefault();
    var offset = $("#comment").offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
    $("#comment").focus();
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
  //태그 클릭
  "click .tag":function(e,t){
    e.preventDefault();

    //검색화면으로 넘어갈 수 있게 해야함
    // console.log(this);
  },
  //댓글 user 이미지클릭
  "click #commentUserProfile": function(e, t){
    t.selectedUser.set(this.userId);
  },
  // 공감
  "click #shareStory": function(e, t){
    // e.preventDefault();
    // if(this.isShared || this.type === 'TC'){
    //   var title = '이미 공유된 글입니다.';
    //   if(this.type === 'TC'){
    //     title = '타임캡슐로 작성된 글은 공유 할 수 없습니다.';
    //   }
    //   var confrimData = {
    //     title : title,
    //     context : '',
    //     templateName : 'contentDetail',
    //     returnData : null,
    //     singleBtn : true,
    //     btnName : '확인'
    //   };
    //   Session.set('confrim_center', confrimData);
    // } else {
    //   Session.set('editor_shared_user_show',true);
    // }
    if(this.type === 'TC'){
      title = '타임캡슐로 작성된 글은 공유 할 수 없습니다.';
      var confrimData = {
        title : title,
        context : '',
        templateName : 'contentDetail',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
    } else {
      Session.set('editor_shared_user_show',true);
    }
  },
  "click .bl-go":function(e,t){
    e.preventDefault();
    // var navData = Session.get('navData');
    var bucketId = this.bucketId;
    Meteor.call('checkIsBlLock', bucketId, function(error, result){
      if(error){
        console.log(error);
      } else {
        if(result.lock){
          if(result.userId === Meteor.userId()){
            var navData ={
              contentId: t.data._id,
              prevTemplate : "contentDetail",
              isBucketGo : true,
            };

            Session.set('navData', navData);
            Router.go('bucketDetail',  {_id: bucketId},{replaceState: false});
          } else {
            title = '버킷리스트 바로가기';
            var confrimData = {
              title : title,
              context : '공개되지 않은 버킷리스트입니다.',
              templateName : 'contentDetail',
              returnData : null,
              singleBtn : true,
              btnName : '확인'
            };
            Session.set('confrim_center', confrimData);
            return;
          }

        } else {
          var navData ={
            contentId: t.data._id,
            prevTemplate : "contentDetail",
            isBucketGo : true,
          };

          Session.set('navData', navData);
          Router.go('bucketDetail',  {_id: bucketId},{replaceState: false});
        }
      }

    })


  },
  "click .image-area a":function(e, t){
    // var herf = '';
    // if(this.titleImage){
    //   herf = global.fn_makeImageSrc(this.titleImage,'');
    // } else {
    //   herf = global.fn_makeImageSrc(this,'');
    // }

    $('.content-image-group').colorbox({
      // href : herf,
      rel : 'content-image-group',
      maxWidth : '90%',
      maxHeight : '90%',
      opacity : 0.8,
      transition : 'elastic',
      // title : '타이틀',
      // open : true,
      // current : ''
    });

    // $(".content-image-group").swipe( {
    //   //Generic swipe handler for all directions
    //   swipeLeft:function(event, direction, distance, duration, fingerCount) {
    //     $.colorbox.prev();
    //   },
    //   swipeRight:function(event, direction, distance, duration, fingerCount) {
    //     $.colorbox.next();
    //   },
    //   //Default is 75px, set to 0 for demo so any distance triggers swipe
    //   threshold:0
    // });

  },
  "click .bd-detail-btn":function(e, t){
    if($('.bd-user').hasClass('display-none')){
      $('.bd-detail-btn').css('transform', 'rotate(180deg)');
      $('.bd-user').removeClass('display-none');
    } else {
      $('.bd-detail-btn').css('transform', '');
      $('.bd-user').addClass('display-none');
    }
  }
});

Template.contentDetail.helpers({
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
    removeContent(_contentId);
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
  },
  hpFamilyInfo: function(){
    return Template.instance().familyInfo.get();
  },
  hpCapsuleFriends : function(){
    return Template.instance().capsuleFriends.get();
  },
  hpGroupFriends : function(){
    return Template.instance().groupFriends.get();
  },
  //공유될 사용자 검색 창 관리 핼퍼
  hpSearchShow : function(){
    return  Session.get('editor_shared_user_show');
  },
  // hpAddUserList : function(){
  //   return Session.get('editor_addUserList');
  // },
  hpIsbucketListVia : function(){
    return Template.instance().isbucketListVia.get();
  },
  hpIsBelongToSG : function(){
    return Template.instance().isBelongToSharedGroup.get();
  },
});

Template.contentDetail.onDestroyed(function(){
  // Session.set('nav_contentDetail', null);
  // Session.set('editor_addUserList',null);
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

function removeContent(_contentId){
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

      Session.set("timelineData",null);

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
         Meteor.call('setLog', 'LG0005', Meteor.userId(), instance.contentType, instance.contentSubType); //컨텐츠 삭제
      }

      //이전화면으로 이동
      back();
    }
  });
}



function back(){
  window.history.back();
  // if(Session.get('nav_contentDetail') && Session.get('nav_contentDetail').prevTemplate){
  //   switch(Session.get('nav_contentDetail').prevTemplate){
  //     case 'bucketDetail':
  //       Router.go('bucketDetail',  {_id: Session.get('nav_contentDetail').contentId},{replaceState: false});
  //       break;
  //     case 'bucketList':
  //       Router.go('bucketList',  {menu: Session.get('nav_contentDetail').menu},{replaceState: false});
  //       break;
  //     case 'endingNote':
  //       if(Session.get('nav_contentDetail').type === 'BL'){
  //         Router.go('bucketDetail',{_id:Session.get('nav_contentDetail').contentId},{replaceState: false});
  //       } else {
  //         Router.go('endingNote',{},{replaceState: false});
  //       }
  //     break;
  //     case 'lifeMap':
  //       if(Session.get('nav_contentDetail').type === 'BL'){
  //         Router.go('bucketDetail',{_id:Session.get('nav_contentDetail').contentId},{replaceState: false});
  //       } else {
  //         Router.go('lifeMapView', {_id: Session.get('nav_contentDetail').userId, searchStr : Session.get('nav_contentDetail').enSearchOption},{replaceState: false});
  //       }
  //       break;
  //     case 'inheritanceTo':
  //     case 'inheritanceFromList':
  //     case 'guardian':
  //       Router.go('inheritanceTo',{},{replaceState: false});
  //     break;
  //     default:
  //       Router.go('endingNote',{},{replaceState: false});
  //   }
  // } else {
  //   Router.go('endingNote',{},{replaceState: false});
  // }
  Session.set('nav_contentDetail', null);
  Session.set('editor_addUserList',null);
}

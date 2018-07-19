import {global} from '/imports/global/global_things.js';


var instance;
var metoerCallControl = false;
Template.bucketDicDetail.onCreated(function(){
  instance = this;
  instance.isAdmin = new ReactiveVar(false);
  instance.isOwner = new ReactiveVar(false);
  instance.bucketData = new ReactiveVar();
  instance.contentId = instance.data._id;
  instance.isLiked = new ReactiveVar(false);
  instance.likeData = new ReactiveVar();
  instance.myLikeList = new ReactiveVar();
  instance.userId = Meteor.userId();
  instance.bucketDataObj = {dic:{},story:[]};
  instance.storyCount = new ReactiveVar();
  instance.selectedUser = new ReactiveVar();
  instance.myBucketCnt = new ReactiveVar();
  instance.likeComCount = new ReactiveVar();
  // instance.privateBucket = new ReactiveVar(false);
  instance.lock = false;
  instance.prevPageData = {};

  Session.set('popup_guide', false);
  Session.set('confrim_center', false);
  Session.set('confrim_complete_center', false);

  Meteor.call('isAdmin', Meteor.userId(), function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.isAdmin.set(result);
    }
  });

  Meteor.call("getMyBucketCount", instance.userId, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.myBucketCnt.set(result);
    }
  });

  Meteor.call("getBucketFromId", instance.data._id, instance.userId, function(err,res){
    if(err){
      console.log(err);
    } else {
      instance.bucketDataObj.dic = res;
      if(res.userId === instance.userId){
        instance.isOwner.set(true);
      }
      if(res.lock){
        instance.lock = true;
        Session.set("story_selectedMenu", 'myBuckyStory');
      } else {
        Session.set("story_selectedMenu", 'buckyStory');
      }
      // var privateBL = res.lock;
      // instance.privateBucket.set(privateBL);
      Meteor.call("getAllBuckyStory", instance.data._id, 0, function(err,res){
        if(err) console.log(err);
        if(res){
          // console.log(res);
          instance.bucketDataObj.story = res;
          instance.bucketData.set(instance.bucketDataObj);
        }
      });

      //네비게이션 데이터
      var navData ={
        type : 'BL',
        contentId: instance.data._id,
        prevTemplate : "bucketDetail",
        subType : 'BS0001',
        dateTitle : 'DT0001',
        editorTitle : '버키스토리',
        lock : instance.lock,
      };
      //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
      if(!Session.get('nav_bucketDicDetail')){
        Session.set('nav_bucketDicDetail', Session.get('navData'));
      }
      //2. 넘길 정보
      Session.set('navData', navData);
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


  //
  // instance.prevPageData = Session.get('navData');
  //
  // var navData ={
  //   contentId:instance.contentId,
  //   prevTemplate : "bucketDetail"
  // };
  //
  // Session.set('navData', navData);

  if(instance.data && instance.data._id){
    Session.set("scrollPosition",instance.data._id);
  }



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
});

Template.bucketDicDetail.onRendered(function(){
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

   }
  });
});

Template.bucketDicDetail.events({
  "click #back": function(e, t){
    e.preventDefault();
    window.history.back();
    //
    // if(Session.get('nav_bucketDicDetail') && Session.get('nav_bucketDicDetail').prevTemplate){
    //   switch(Session.get('nav_bucketDicDetail').prevTemplate){
    //     // case 'bucketList':
    //     //   Router.go('bucketList',  {category: Session.get('nav_bucketDicDetail').category},{replaceState: false});
    //     //   break;
    //     case 'endingNote':
    //       Router.go('endingNote',{},{replaceState: false});
    //     break;
    //     case 'lifeMap':
    //       Router.go('lifeMapView', {_id: Session.get('nav_bucketDicDetail').userId, searchStr : Session.get('nav_bucketDicDetail').enSearchOption});
    //     break;
    //     case 'contentDetail':
    //       Router.go("contentDetail", {_id: Session.get('nav_bucketDicDetail').contentId},{replaceState: false});
    //     break;
    //     default:
    //       Router.go('bucketList',{menu:Session.get('nav_bucketDicDetail').menu},{replaceState: false});
    //   }
    // } else {
    //   Router.go('bucketList',{menu:'all'},{replaceState: false});
    // }
    //
    // Session.set('nav_bucketDicDetail', null);
  },
  "click #showDetail": function(e, t){
    e.preventDefault();

    // var contentId = t.contentId;
    // Router.go("contentBucketDetail", {_id: contentId},{replaceState: false});

    $(".detail-area").slideDown(300);
    $(".overlay-contents").hide();
    $("#showDetail").hide();
    $(".btn-detail.top-hide").show();
    $(".bucket-detail .dic-summary figure .img-frame-shadow").css("height", "400px !important");
    $("#img-frame").attr("src", "/images/bg/img_frame.png");


    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0022', Meteor.userId(),'BL', ''); //버킷리스트 상세보기 펼치기
    }
  },
  "click #hideDetail": function(e, t){
    $(".detail-area").slideUp(300);
    $(".overlay-contents").show();
    $("#showDetail").show();
    $(".btn-detail.top-hide").hide();
    $(".bucket-detail .dic-summary figure .img-frame-shadow").css("height", "300px !important");
    $("#img-frame").attr("src", "/images/bg/bucket_shadow.png");
  },
  "click .float-button.flt-icon-pen a": function(e, t){
    e.preventDefault();
    if(global.writeLog){
      Meteor.call('setLog', 'LG0041', Meteor.userId(), '', ''); //버키스토리 글쓰기 클릭
    }
    if(Meteor.userId()){
      if(instance.bucketData.get().dic.myBucketId){
        Router.go("writeStory",{},{replaceState: false});
      } else {
        // alert('버킷리스트 따라하기 이후 버키스토리 작성이 가능합니다.');
        var popupData = {
          image : '/images/bg/guide_buckey_copy.png',
          title : '',
          context : '버킷리스트를 <span>담으면</span><br />버키스토리를 <span>작성 할 수 있습니다.</span>',
          templateName : 'guidePopup01',
          returnData : '',
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('popup_guide', popupData );
        return;
      }
    } else {
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'bucketDicDetail',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
      // Router.go("login",{},{replaceState: false});
    }
  },
  "click #follow": function(e, t){
    e.preventDefault();

    if(Meteor.userId()){
      //해당 버킷을 따라하기하시겠습니까? 컨펌창 띄우기
      //confrim창 열가
      var confrimData = {
        title : '내 버킷에 담기',
        context : '내 버킷 리스트에 담으시겠습니까?',
        templateName : 'bucketDicDetail',
        returnData : {
          type : 'follow',
          contentId : t.contentId,
        },
        singleBtn : false,
        btnName : ''
      };

      Session.set('confrim_center', confrimData);

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
         Meteor.call('setLog', 'LG0020', Meteor.userId(),'BL', 'BL0001'); //버킷리스트 따라하기 클릭
      }
    } else {
      // alert('로그인이 필요한 기능입니다.');
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'bucketDicDetail',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
      // Router.go("login",{},{replaceState: false});
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
          templateName : 'bucketDicDetail',
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

        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
           Meteor.call('setLog', 'LG0021', Meteor.userId(),'BL', 'BL0002'); //버킷리스트 나이거했 클릭
        }
      } else {
        // alert('하나 이상의 버키스토리를 작성해야 완료처리 할 수 있습니다.');
        // alert('버킷리스트 따라하기 이후 버키스토리 작성이 가능합니다.');
        var popupData = {
          image : '/images/bg/guide_story_write.png',
          title : '',
          context : '버키스토리를 작성해서 공유하고<br /><span>나 이거 했어 !! 성공 !!</span>',
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
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'bucketDicDetail',
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
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'bucketDicDetail',
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

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
         Meteor.call('setLog', 'LG0012', Meteor.userId(), 'BL', 'BL0001'); //버킷리스트 좋아요 취소
      }

      Meteor.call("removeLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'set', t.bucketDataObj.dic.type,'DEFAULT', likeObject.contentId);
          getLikeData(t.contentId, t);
        }
      });
    } else {

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
         Meteor.call('setLog', 'LG0011', Meteor.userId(), 'BL', 'BL0001'); //버킷리스트 좋아요 클릭
      }
      Meteor.call("insertLike", likeObject, function(err, res){
        if(err){
          console.log(err);
        } else {
          Meteor.call('setPoint', 'PO0004', Meteor.userId(), 'get',  t.bucketDataObj.dic.type,'DEFAULT', likeObject.contentId);
          getLikeData(t.contentId, t);
        }
      });

    }



    global.fn_resetSession();
    // Session.set("timelineData",null);
    // Session.set('bucketListData',null);
    // Session.set("bucketListStatus", null);
    // Session.set("scrollPosition", null);
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
        case 'friendBuckyStory':
          //내 버키스토리만 가져오는 기능
          Meteor.call("getBucketFromId", contId, Meteor.userId(), function(err,res){
            if(err){
              console.log(err);
            } else {
              t.bucketDataObj.dic = res;
              Meteor.call("getAllBuckyStory", contId, 0, function(err,res){
                if(err) console.log(err);
                if(res){
                  console.log(res);
                  t.bucketDataObj.story = res;
                  //친구리스트만 걸러내기
                  Meteor.call("getMyFriends", Meteor.userId(), function(err,res){
                    if(err){
                      console.log(err);
                    }else{
                      var storyData = t.bucketDataObj.story;
                      var flist = _.pluck(res,"userId");
                      var filtData = [];
                      for(var i=0; i<storyData.length ; i++){
                        for(var z=0 ; z<flist.length ; z++){
                          if(storyData[i].userId === flist[z]){
                            filtData.push(storyData[i]);
                          };
                        }
                      }
                      t.bucketDataObj.story = filtData;
                      t.bucketData.set(instance.bucketDataObj);
                    }
                  })


                }
              });
            }
          });
          break;
        default :
        case 'endingNote':
    }
  },
  //스토리 컨텐츠 클릭(상세보기 이동)
  "click #storyContent": function(e, t){
    e.preventDefault();
    if(!Meteor.userId()){
      // alert('로그인 하면 상세스토리를 확인 할 수 있습니다.');
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0017', Meteor.userId(),'BL', 'BS0001'); //버키스토리 상세보기
    }
    // var contentId = this.type;
    Router.go("contentDetail", {_id: this._id},{replaceState: false});
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

          //////////////////fcm 전송부분 //////////////////
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
  },
  "click #bucketListEditor" :  function(e, t){
    e.preventDefault();
    Router.go('bucketListEditorMod',{_id:this.dic._id},{replaceState: true});
  },
  "click #userBucketListEditor" :  function(e, t){
    e.preventDefault();
    Router.go('editBucket',{_id:this.dic._id},{replaceState: true});
  },
  //버킷리스트 삭제
  "click #delete": function(e, t){
    e.preventDefault();

    Meteor.call("getOtherStoryCount", instance.data._id, instance.userId, function(err,res){
      if(err) {
        console.log(err);
      } else {
        if(!t.lock && res > 0){
          //공개글이고 남의 글이 있으면
          var confrimData = {
            title : '공개 버킷리스트 삭제',
            context : '회원님의 버킷리스트를<br/>다른 이용자들이 사용하고 있기 때문에<br/>해당 글을 <span class="color-red">삭제</span> 할 수 없습니다.',
            templateName : 'bucketDicDetail',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return;
        } else {
          //컨펌
          var confrimData = {
            title : '버킷리스트 삭제',
            context : '버킷리스트를 삭제하면<br/>회원님이 작성한 <span class="color-red">버키스토리</span>는<br/>모두 일반 스토리로 <span class="color-red">전환</span>됩니다.<br/><br/>삭제 하시겠습니까?',
            templateName : 'bucketDicDetail',
            returnData : {
              type : 'bucketDelete',
              params : 'delete',
              contentId : t.contentId,
            },
            singleBtn : false,
            btnName : ''
          };

          Session.set('confrim_center', confrimData);
        }
      };

    });


  },
  //버킷리스트 취소
  "click #bl-cancel": function(e, t){
    e.preventDefault();

    //컨펌
    var confrimData = {
      title : '버킷리스트 취소',
      context : '버킷리스트 담기를 취소하면<br/>회원님이 작성한 <span class="color-red">버키스토리</span>는<br/>모두 일반 스토리로 <span class="color-red">전환</span>됩니다.<br/><br/>삭제 하시겠습니까?',
      templateName : 'bucketDicDetail',
      returnData : {
        type : 'bucketDelete',
        params : 'cancel',
        contentId : t.contentId,
      },
      singleBtn : false,
      btnName : ''
    };

    Session.set('confrim_center', confrimData);
  },
});

Template.bucketDicDetail.helpers({
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
    } else if(_data.type ==="bucketDelete"){
      fn_bucketDelete(_data);
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
  //사용자 프로필 사진 클릭시 dropdown-toggle 표시
  hpSelectedUser : function(_userId){
    var result = false;
    if(_userId === Template.instance().selectedUser.get()){
      result = true;
    }
    return result;
  },
  hpIsAdmin : function(){
    return Template.instance().isAdmin.get();
  },
  hpIsOwner : function(){
    return Template.instance().isOwner.get();
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

Template.bucketDicDetail.onDestroyed(function(){
  $(window).off('scroll');
});

function followBucket(_contentId, _userId){
  var currentDate = global.fn_dateFormat().HMS;
  Meteor.call('setFollowBucket', _contentId, _userId, function(error, result){
    if(error){
      console.log(error);
    } else {

      global.fn_resetSession();
      // Session.set("timelineData",null);
      // Session.set('bucketListData',null);
      // Session.set("bucketListStatus", null);
      // Session.set("scrollPosition", null);
      // console.log(result);
      //디테일 화면 변경
      // 1. 따라하기 아이콘 변경
      var bucketData = instance.bucketData.get();
      bucketData.dic.followCnt += 1; //따라하기 카운트 1증
      bucketData.dic.myBucketId = result; //등록된 BL스토리 컨텐츠 ID
      instance.bucketData.set(bucketData);


      //라이프맵 데이터 (따라하기)입력
      var subjectInfo = global.fn_getSubjectInfo('BL0001');
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
  var currentDate = global.fn_dateFormat().HMS;
  Meteor.call('setBucketComplete', _contentId, _userId, function(error, result){
    if(error){
      console.log(error);
    } else {
      global.fn_resetSession();
      // Session.set("timelineData",null);
      // Session.set('bucketListData',null);
      // Session.set("bucketListStatus", null);
      // Session.set("scrollPosition", null);

      var bucketData = instance.bucketData.get();
      //완료표시 노란색으로 변경
      bucketData.dic.isCompleted = true;
      instance.bucketData.set(bucketData);


      //라이프맵 데이터 (완료)입력
      var subjectInfo = global.fn_getSubjectInfo('BL0002');
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


      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
         Meteor.call('setLog', 'LG0052', Meteor.userId(),'BL', 'BL0002'); //버킷리스트 나이거했 클릭
      }

      //완료 포인트 추가
      Meteor.call('setPoint', 'PO0008', Meteor.userId(), 'get',  instance.bucketDataObj.dic.type,'DEFAULT', _contentId);
    }
  });

}

function fn_bucketDelete(_data){
  Meteor.call("removeBucketList", _data.contentId, _data.params, function(error, result){
    if(error){
      console.log(error);
    } else {
      //이전 화면으로 돌아가는
      global.fn_resetSession();
      window.history.back();

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
         Meteor.call('setLog', 'LG0005', Meteor.userId(), 'BL', 'BL0001'); //컨텐츠 삭제
      }
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

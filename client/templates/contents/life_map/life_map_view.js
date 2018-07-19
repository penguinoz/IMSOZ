// import html2canvas from 'html2canvas';
import {global} from '/imports/global/global_things.js';

var instance;
Template.lifeMapView.onCreated(function(){
// instance.mapData = new ReactiveVar();
  instance = this;
  instance.pageOwnerId = this.data._id;
  instance.enSearchOption = this.data.searchOption;
  instance.searchOption = global.fn_passCode(this.data.searchOption, 'DC').split('_');
  instance.userId = global.fn_passCode(this.data._id, 'DC');
  instance.profileinfo = new ReactiveVar();
  instance.showDownLoadMap = new ReactiveVar();
  // instance.contentId = new ReactiveVar();
  // Session.set('lifeMapDetailShow', false);
  instance.startDate = '';
  instance.endDate = '';
  instance.isVisit = new ReactiveVar(true);
  // instance.mapData = new ReactiveVar();

  Session.set('confrim_capsule_open', false);

  // 친구노트 방문시 userId 변경설정
  if(Meteor.userId() === instance.userId){
    instance.isVisit.set(false);
  }

  Meteor.call('getUserInfoByUid', instance.userId, function(err, res){
    if(err){
      console.log(err);
    } else {
      var lifeMapUserInfo = {
        name : res[0].profile.name,
        profileImg : res[0].profile.profileImg
      };
      instance.profileinfo.set(lifeMapUserInfo);
    }
  });



  // var searchObj = {
  //   "type" : instance.searchOption[0].split(','),
  //   "subType" : instance.searchOption[1].split(','),
  //   "startDate" : instance.searchOption[2],
  //   "endDate" : instance.searchOption[3],
  //   "lock" : instance.searchOption[4] === "true" ? true : false,
  // };

  var searchObj = {
    text: instance.searchOption[0],
    type : instance.searchOption[1].split(','),
    subType:instance.searchOption[2].split(','),
    showLock : instance.searchOption[3] === "true" ? true : false,
    showShared : instance.searchOption[4] === "true" ? true : false,
  };


  Meteor.call('getLifeMap2', instance.userId, searchObj, function(error, result){
    if(error){
      console.log(error);
    } else {
      if(result && result.length > 0){
        // instance.mapData.set(result);
        Session.set('mapData', result);
      } else {
        // $("html").removeClass('scroll-hidden');
        // var confrimData = {
        //   title : '검색 결과가 없어 엔딩노트로 이동합니다.',
        //   context : '',
        //   templateName : 'lifeMapView',
        //   returnData : null,
        //   singleBtn : true,
        //   btnName : '확인'
        // };

        // Session.set('confrim_center', confrimData);
        alert('검색 결과가 없어 엔딩노트로 이동합니다.');
        Router.go('endingNote',{},{replaceState: true});

        // Router.go('lifeMap', {_id : instance.pageOwnerId},{replaceState: false});
      }
    }

    if(window.webkit){
      instance.showDownLoadMap.set(true);
    } else if(window.Android){
      instance.showDownLoadMap.set(true);
    } else {
      instance.showDownLoadMap.set(false);
    }
  });

  //네비게이션 데이터
  var navData ={
    type : 'LM',
    prevTemplate : "lifeMapView"
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  if(!Session.get('nav_lifeMapView')){
    Session.set('nav_lifeMapView', Session.get('navData'));
  }

});

Template.lifeMapView.onRendered(function(){
  var position = Session.get("scrollPosition");
  Tracker.autorun(function(){
    if(Session.get('mapData')){
      var height = $(window).height();
      $(".lifeMap").css('min-height',height);


      if(position){
        var scrollPosition = $("#"+position).offset().top;
        $('html, body').animate({
          scrollTop: scrollPosition-250
        }, 0);
      }
      Session.set("scrollPosition", null);
      Session.set("scrollPositionVs", null);
    }
  });
});

Template.lifeMapView.helpers({
  hpMapData: function(){
    // return Template.instance().mapData.get();
    return Session.get('mapData');
  },
  hpIsVisit : function() {
    return Template.instance().isVisit.get();
  },
  hpProfileData: function() {
    return Template.instance().profileinfo.get();
  },
  hpOpenCapsuleConfirmData : function(){
    return Session.get('confrim_capsule_open');
  },
  hpShowDownLoadMap : function() {
    return Template.instance().showDownLoadMap.get();
  }
});

Template.lifeMapView.events({
  "click #back": function(e, t){
    e.preventDefault();
    window.history.back();
    // Router.go('endingNote',{},{replaceState: false});
    // Session.set('nav_lifeMapView',null);
  },
  "click #save": function(e, t){
    // var mobile = (/iphone|ipad|ipod|android|diordna/i.test(navigator.userAgent.toLowerCase()));
    //
    // if (mobile) {
    //     var userAgent = navigator.userAgent.toLowerCase();
    //     if (userAgent.search("diordna") > -1 || userAgent.search("android") > -1 ) {
    //       /* android */
    //       Android.captureScreen();
    //     } else {
    //       // alert('ios!!');
    //       window.webkit.messageHandlers.captureScreen.postMessage({});
    //     }x`
    // }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0056', Meteor.userId(),'', ''); //라이프맵 다운 클릭
    }


    if(window.webkit){
      // alert('애플')
      window.webkit.messageHandlers.captureScreen.postMessage({});
    } else if(window.Android){
      // alert('안드로이드');
      Android.captureScreen();
    } else {
      // alert('브라우져');
    }

    // html2canvas(document.querySelector("#lifeMapPage .detail-body"),{
    //   allowTaint: true,
    //   logging:true,
    // }).then(function(canvas) {
    //   document.querySelector("#lifeMapPage .detail-body").appendChild(canvas);
    //         // $('#box1').append(canvas);
    // });
  },
  "click td": function(e, t){
    e.preventDefault();

    // if(t.isVisit){
    //   return;
    // }

    var navData ={
      prevTemplate : "lifeMap",
      userId : t.pageOwnerId,
      type : this.type,
      contentId: this.contentId,
      enSearchOption : t.enSearchOption
    };
    Session.set('navData', navData);
    // Session.set("scrollPosition", e.currentTarget.parentNode.id);
    // Session.set("scrollPosition", e.currentTarget.parentNode.id);

    //1. 내비 정보를 스트링으로 수정
      // var navStr = navData.prevTemplate+'_'+navData.userId+'_'+navData.type+'_'+navData.contentId+'_'+navData.enSearchOption;
    //2. 암호화
      // var enNavStr = global.fn_passCode(navStr, 'EC');




    if(t.isVisit.get()){
      //방문했을때는 상세를 보여주지 않는다.
      // if(_.isEqual(this.type, 'BL')){
      //   Router.go('bucketDetailVs', {_id: t.pageOwnerId, contentId:this.contentId},{replaceState: false});
      // } else {
      //   Router.go("contentDetailVs", {_id: t.pageOwnerId, contentId:this.contentId},{replaceState: false});
      // }
      var contentId = this.contentId;
      switch(this.type){
        case 'BL':
          Router.go('bucketDetailVs', {_id: t.pageOwnerId, contentId:contentId},{replaceState: false});
        break;
        case 'TC':
          //오프인일 계산하는 기능 추가
          if(this.isOpened){
            Router.go("contentDetailVs", {_id: t.pageOwnerId, contentId:contentId},{replaceState: false});
          } else {
            // alert('친구의소중한 타임캡슐은 개봉되기 전엔 볼 수 없어요!!');
            var confrimData = {
              title : '친구가 받은 소중한 타임캡슐은<br/>개봉되기 전엔 볼 수 없어요!!',
              context : '',
              templateName : 'lifeMapView',
              returnData : null,
              singleBtn : true,
              btnName : '확인'
            };

            Session.set('confrim_center', confrimData);
            return;
          }
        break;
        default:
          Router.go("contentDetailVs", {_id: t.pageOwnerId, contentId:contentId},{replaceState: false});
      }

    } else {
      var contentId = this.contentId;
      switch(this.type){
        case 'BL' :
          Router.go('bucketDetail', {_id: contentId},{replaceState: false});
          // location.href="/lifeMap/detail/bucket/" + contentId +"/" + enNavStr;
          break;
        case 'TC' :
          var capsuleId = this.capsuleId;
          Meteor.call('getStoryById', contentId, 1, function(error, result){
            if(error){
              console.log(error);
            } else {
              var openDay = result.mDate;

              if(result.isOpened){
                Router.go("contentDetail", {_id: contentId},{replaceState: false});
                // location.href="/lifeMap/detail/" + contentId +"/" + enNavStr;
              } else {
                // if(!capsuleId && result.targetId.length > 0){
                //   //친구꺼
                //   // alert('아직 친구분이 타임캡슐을 개봉하지 않았네요!!.');
                //   var confrimData = {
                //     title : '아직 친구분이 타임캡슐을 개봉하지 않았네요!!.',
                //     context : '',
                //     templateName : 'lifeMapView',
                //     returnData : null,
                //     singleBtn : true,
                //     btnName : '확인'
                //   };

                //
                //   Session.set('confrim_center', confrimData);
                // } else {
                  if(openDay <= global.fn_dateFormat(new Date()).YMD){
                    //opne하겠냐는 confirm 필요
                    var confrimData = {
                      title : '타임캡슐을<br/> 개봉할 준비가 되었습니다!!',
                      context : '회원님의 소중한 타임캡슐을<br/>개봉하시겠습니까?',
                      templateName : 'timeline',
                      returnData : {
                        contentId : contentId,
                        capsuleId : capsuleId,
                        userId : Meteor.userId(),
                        // senderId : senderId,
                      },
                      singleBtn : false,
                      btnName : ''
                    };

                    Session.set('confrim_capsule_open', confrimData);
                  } else {
                    // alert('타임캡슐 개봉일이 아닙니다.'); //문구수정 필요
                    var confrimData = {
                      title : '타임캡슐 개봉일이 아닙니다.',
                      context : '',
                      templateName : 'timeline',
                      returnData : null,
                      singleBtn : true,
                      btnName : '확인'
                    };

                    Session.set('confrim_center', confrimData);
                  }
                // }
              }
            }
          });
          break;
        default:
          Router.go("contentDetail", {_id: contentId},{replaceState: false});
          // location.href="/lifeMap/detail/" + contentId +"/" + enNavStr;
      }
    }
  }
});

Template.lifeMapView.onDestroyed(function(){
  // Session.set('mapData', null);
});

function fn_openCapsule(_contentId, _capsuleId, _userId){
  Meteor.call('setTimeCapsuleOpen', _contentId, _capsuleId, _userId, function(error, result){
    if(error){
      console.log(error);
    } else {
      global.fn_resetSession();
      // Session.set("timelineData",null);
      // Session.set('bucketListData',null);
      // Session.set("bucketListStatus", null);
      // Session.set("scrollPosition", null);
      Router.go("contentDetail", {_id: _contentId},{replaceState: false});
    }
  });
}

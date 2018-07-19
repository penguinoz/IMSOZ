import {global} from '/imports/global/global_things.js';

Template.footer.onCreated(function(){
  var instance = this;
  instance.isMine = this.data.isMine;
  // instance.isAdmin = new ReactiveVar(false);

  // Meteor.call('isAdmin', Meteor.userId(), function(error, result){
  //   if(error){
  //     console.log(error);
  //   } else {
  //     instance.isAdmin.set(result);
  //   }
  // });
  // Session.set('confrim_center', false);
});

Template.footer.onRendered(function(){
});

Template.footer.events({
  "click .tab-menu .menu.service": function(e, t){
    e.preventDefault();
    var menuId = e.currentTarget.id;
    if(Session.get("footer_selectedMenu") !== menuId){
      //타임라인 데이터 삭제
      global.fn_resetSession();
      // Session.set("timelineData",null);
      // Session.set('bucketListData',null);
      // Session.set("bucketListStatus", null);
      // Session.set("scrollPosition", null);
    }

    Session.set("footer_selectedMenu", menuId);
    var type ='';
    switch(menuId){
      case 'endingNote':
        if(t.isMine){
          Session.set('searchObj', null);
          Router.go('endingNote',{},{replaceState: false});
          type = 'ED';
        }
        break;
      case 'bucketList':
        Session.set('searchObj', null);
        if(Meteor.userId()){
          Router.go('bucketList',{menu:'all'},{replaceState: false});
        } else {
          Router.go('bucketList',{menu:'all'},{replaceState: false});
        }
        type = 'BL';
        break;
      case 'inheritance':
        Router.go('inheritanceTo',{},{replaceState: false});
        type = 'IH';
        break;
      default :
        case 'endingNote':
    }
    $(window).scrollTop(0);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0013', Meteor.userId(), type, ''); //엔딩/버킷/상속 메뉴 클릭
    }
  },
  "click .footer #my": function(e, t){
    e.preventDefault();

    if(Meteor.userId()){
      Session.set("footer_selectedMenu", 'my');
      Router.go('myPageFriends',{},{replaceState: false});
    } else {
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNote',
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
       Meteor.call('setLog', 'LG0013', Meteor.userId(), 'ST', ''); //엔딩/버킷/상속 메뉴 클릭
    }

    // // 1. 로그 사용여부확인
    // if(global.writeLog){
    //   //2. 로그 생성
    //   Meteor.call('setLog', 'LG0039', Meteor.userId(),'MY', ''); //마이페이지 클릭
    // }
  },
});

Template.footer.helpers({
  hpSelected: function(_id){
    var seletedId = Session.get("footer_selectedMenu");
    var result = false;
    if(_id === seletedId){
      result = true;
    }
    return result;
  },
  // hpConfirmCallBack: function(_callBack){
  //
  //   if(window.webkit){
  //     // alert('애플')
  //     window.webkit.messageHandlers.disconnectFcmToken.postMessage(Meteor.userId());
  //   } else if(window.Android){
  //     // alert('안드로이드');
  //     Android.disconnectFcmToken();
  //   } else {
  //     // alert('브라우져');
  //   }
  //
  //   // var mobile = (/iphone|ipad|ipod|android|diordna/i.test(navigator.userAgent.toLowerCase()));
  //   //
  //   // if (mobile) {
  //   //     var userAgent = navigator.userAgent.toLowerCase();
  //   //     if (userAgent.search("diordna") > -1 || userAgent.search("android") > -1) {
  //   //         /* android */
  //   //           // console.log('tokenup');
  //   //           Android.disconnectFcmToken();
  //   //     } else {
  //   //       window.webkit.messageHandlers.disconnectFcmToken.postMessage(Meteor.userId());
  //   //     }
  //   // }
  //   // 1. 로그 사용여부확인
  //   if(global.writeLog){
  //     //2. 로그 생성
  //      Meteor.call('setLog', 'LG0002', Meteor.userId(),'', ''); //로그아웃
  //   }
  //   //자동 로그아웃 확인용 세션
  //
  //   global.logout();
  // },
  // hpConfrimData : function(){
  //   return Session.get('confrim_center');
  // },
  // hpSearchData : function(){
  //   return Session.get('searchBox');
  // },
  // hpIsAdmin : function(){
  //   return Template.instance().isAdmin.get();
  // },
  // hpIsShowSearchBox: function(){
  //   var result = false;
  //   switch(Session.get("footer_selectedMenu")){
  //     case 'bucketList':
  //       result = true;
  //     break;
  //     case 'endingNote':
  //       result = true;
  //     break;
  //     default :
  //       result = false;
  //   }
  //   return result;
  // }
});

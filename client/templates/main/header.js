import {global} from '/imports/global/global_things.js';

Template.header.onCreated(function(){
  var instance = this;
  instance.isMine = this.data.isMine;
  instance.isAdmin = new ReactiveVar(false);
  Session.set('guidePop02', false);
  // Session.set('searchObj', null);

  Meteor.call('isAdmin', Meteor.userId(), function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.isAdmin.set(result);
    }
  });
    Session.set('confrim_center', false);
    Session.set('searchBox', false);
});

Template.header.onRendered(function(){
});

Template.header.events({
  "click #imsTitle": function(e, t){
    e.preventDefault();
    if(Meteor.userId()){
      Router.go('endingNote',{},{replaceState: false});
    } else {
      Router.go('bucketList',{menu:'all'},{replaceState: false});
    }
  },
  // "click .tab-menu a": function(e, t){
  //   e.preventDefault();
  //   var menuId = e.currentTarget.id;
  //   if(Session.get("footer_selectedMenu") !== menuId){
  //     //타임라인 데이터 삭제
  //     global.fn_resetSession();
  //     // Session.set("timelineData",null);
  //     // Session.set('bucketListData',null);
  //     // Session.set("bucketListStatus", null);
  //     // Session.set("scrollPosition", null);
  //   }
  //
  //   Session.set("footer_selectedMenu", menuId);
  //   var type ='';
  //   switch(menuId){
  //     case 'endingNote':
  //       if(t.isMine){
  //         Session.set('searchObj', null);
  //         Router.go('endingNote',{},{replaceState: false});
  //         type = 'EN';
  //       }
  //       break;
  //     case 'bucketList':
  //       Session.set('searchObj', null);
  //       if(Meteor.userId()){
  //         Router.go('bucketList',{menu:'all'},{replaceState: false});
  //       } else {
  //         Router.go('bucketList',{menu:'all'},{replaceState: false});
  //       }
  //       type = 'BL';
  //       break;
  //     case 'inheritance':
  //       Router.go('inheritanceTo',{},{replaceState: false});
  //       type = 'IN';
  //       break;
  //     default :
  //       case 'endingNote':
  //   }
  //   $(window).scrollTop(0);
  //
  //   // 1. 로그 사용여부확인
  //   if(global.writeLog){
  //     //2. 로그 생성
  //      Meteor.call('setLog', 'LG0013', Meteor.userId(), type, menuId); //엔딩/버킷/상속 메뉴 클릭
  //   }
  // },
  // "click .header #my": function(e, t){
  //   e.preventDefault();
  //
  //   Router.go('myPageFriends',{},{replaceState: false});
  //
  //   // 1. 로그 사용여부확인
  //   if(global.writeLog){
  //     //2. 로그 생성
  //     Meteor.call('setLog', 'LG0039', Meteor.userId(),'MY', ''); //마이페이지 클릭
  //   }
  //   //기존정보 확인
  //   //이전에 보던 화면
  // },
  "click #logout": function(e, t){
    e.preventDefault();

    //confrim창 열가
    var confrimData = {
      title : '로그아웃 하시겠습니까?',
      context : '',
      templateName : 'header',
      returnData : Meteor.userId(),
      singleBtn : false,
      btnName : ''
    };

    Session.set('confrim_center', confrimData);
    // t.removeConfirmData.set(confrimData);
  },
  "click #login": function(e, t){
    e.preventDefault();

    Meteor.logout();
    Router.go('login',{},{replaceState: false});
  },
  "click #search": function(e, t){


    var logType = 'ED';
    var searchData = {};

    switch(Session.get("footer_selectedMenu")){
      case 'bucketList':
        logType = 'BL';
        searchData.placeHolder = '제목, 내용, 태그 검색';
        searchData.templateName = Session.get("footer_selectedMenu");
        searchData.isPageOwner = t.isMine;
      break;
      case 'endingNote':
        logType = 'ED';
        searchData.placeHolder = '제목, 내용, 태그, 년도 검색';
        searchData.templateName = Session.get("footer_selectedMenu");
        if(!t.isMine){
          searchData.templateName = 'endingNoteVs';
        }
        searchData.isPageOwner = t.isMine;
      break;
      default :
        searchData.placeHolder = '제목, 내용, 태그, 년도 검색';
        searchData.templateName = Session.get("footer_selectedMenu");
        searchData.isPageOwner = t.isMine;
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0057', Meteor.userId(), logType, ''); //검색버튼 클릭
    }

    Session.set('searchBox', searchData);



  },
  "click #myEnding": function(e, t){
    e.preventDefault();
    global.fn_resetSession();
    // Session.set("timelineData",null);
    // Session.set('bucketListData',null);
    // Session.set("bucketListStatus", null);
    // Session.set("scrollPosition", null);
    Router.go('endingNote',{},{replaceState: false});
  },
  "click #bucketListEditor" :  function(e, t){
    e.preventDefault();
    Router.go('bucketListEditor',{},{replaceState: false});
  },
  "click #guide-info" : function(e, t){
    e.preventDefault();

    var logType = 'GD0002';
    var template = {};
    switch(Session.get("footer_selectedMenu")){
      case 'endingNote':
      logType = 'GD0002';
      template.templateName = 'guide03'; //슬라이드
      // template.data = "/images/bg/guide/guide_스토리.jpg";
      Session.set('guidePopTemplate', template);
      break;
      case 'bucketList':
      logType = 'BL0001';
        template.templateName = 'guide02';
        template.data = "/images/bg/guide/guide_버킷리스트.jpg";
        Session.set('guidePopTemplate', template);
      break;
      case 'inheritance':
      logType = 'IH0001';
        template.templateName = 'guide02';
        template.data = "/images/bg/guide/guide_상속.jpg";
        Session.set('guidePopTemplate', template);
      break;
      // case 'my':
      //   template.data = "/images/bg/guide/guide_스토리.jpg";
      //   Session.set('guidePop02', template);
      // break;
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0050', Meteor.userId(),'GD', logType); //가이드 시작
    }
  },

});

Template.header.helpers({
  hpConfirmCallBack: function(_callBack){

    if(window.webkit){
      // alert('애플')
      window.webkit.messageHandlers.disconnectFcmToken.postMessage(Meteor.userId());
    } else if(window.Android){
      // alert('안드로이드');
      Android.disconnectFcmToken();
    } else {
      // alert('브라우져');
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0002', Meteor.userId(),'', ''); //로그아웃
    }
    //자동 로그아웃 확인용 세션

    global.logout();
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpSearchData : function(){
    return Session.get('searchBox');
  },
  hpIsAdmin : function(){
    return Template.instance().isAdmin.get();
  },
  hpIsShowSearchBox: function(){
    var result = false;
    switch(Session.get("footer_selectedMenu")){
      case 'bucketList':
        result = true;
      break;
      case 'endingNote':
        result = true;
      break;
      default :
        result = false;
    }
    return result;
  },
  hpSelectedMenu : function(){
    return Session.get("footer_selectedMenu");
  },
  //둘러보기인지 아닌지
  hpisNonUserVs : function(){
    if(Meteor.userId()){
      return true;
    }else{
      return false;
    }
  },


});

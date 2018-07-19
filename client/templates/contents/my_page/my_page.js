import {global} from '/imports/global/global_things.js';

Template.myPage.onCreated(function(){
  var instance = this;
  instance.isAdmin = new ReactiveVar(false);


  if(!Meteor.userId()){
    var confrimData = {
      title : '로그인 확인',
      context : "'설정'은 로그인 후에 사용가능합니다.<br/>버킷리스트 화면으로 이동합니다.",
      templateName : 'endingNote',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    Router.go('bucketList',{menu:'all'},{replaceState: true});
    return;
  }

  Meteor.call('isAdmin', Meteor.userId(), function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.isAdmin.set(result);
    }
  });

  var template = {
    templateName : Session.get("myPage_selectedMenu"),
    header: true
  };
  Session.set("myPage_selectedTemplate", template);

});

Template.myPage.events({
  "click #back": function(e, t){
    e.preventDefault();
    window.history.back();
    // if(Session.get("footer_selectedMenu")){
    //   switch(Session.get("footer_selectedMenu")){
    //     case 'endingNote':
    //       Router.go('endingNote',{},{replaceState: false});
    //     break;
    //     case 'bucketList':
    //       Router.go('bucketList',{menu:'all'},{replaceState: false});
    //     break;
    //     case 'inheritance':
    //       Router.go('inheritanceTo',{},{replaceState: false});
    //     break;
    //     default:
    //       Router.go('endingNote',{},{replaceState: false});
    //   }
    // } else {
    //   Router.go('endingNote',{},{replaceState: false});
    // }
  },
  "click .top-sub-menu a": function(e, t){
    e.preventDefault();

    var menuId = e.currentTarget.id;
    Session.set("myPage_selectedTemplate", menuId);

    var template = {
      templateName : "myPoint",
      header: true
    };

    var logType = 'FRIENDS';
    switch(menuId){
      case 'myPoint':
        logType = 'POINT';
        Router.go('myPagePoint',{},{replaceState: false});
        template.templateName = "myPoint";
        Session.set("myPage_selectedTemplate", template);
      break;
      case 'myFriends':
      logType = 'FRIENDS';
        Router.go('myPageFriends',{},{replaceState: false});
        template.templateName = "myFriends";
        Session.set("myPage_selectedTemplate", template);
      break;
      case 'myInfo':
      logType = 'INFO';
        Router.go('myPageInfo',{},{replaceState: false});
        template.templateName = "myInfo";
        Session.set("myPage_selectedTemplate", template);
      break;
      case 'admin':
      logType = 'ADMIN';
        Router.go('imsAdminConfig',{_id:Meteor.userId()},{replaceState: false});
        template.templateName = "myAdminConfig";
        Session.set("myPage_selectedTemplate", template);
      break;
      default:
        Session.set("myPage_selectedTemplate", template);
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0033', Meteor.userId(),'MY', logType); //마이페이지 카테고리메뉴 클릭
    }
  }
});

Template.myPage.helpers({
  hpSelected: function(_menu){
    var result = false;
    if(_menu === Session.get("myPage_selectedMenu")){
      result = true;
    }
    return result;
  },
  hpSelectedTemplate: function(){
    return Session.get("myPage_selectedTemplate");
  },
  hpIsAdmin : function(){
    return Template.instance().isAdmin.get();
  },
});

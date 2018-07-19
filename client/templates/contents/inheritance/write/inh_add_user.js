import {global} from '/imports/global/global_things.js';
Template.ihnAddUser.onCreated(function(){
  var instance = this;

  instance.isSelected = new ReactiveVar("imsUser");

  var template = {
    templateName : "inhAddUserIms",
    header : true
  };
  Session.set("inhAddUser_selectedTemplate", template);

});

Template.ihnAddUser.events({
  "click #back": function(e, t){
    e.preventDefault();

    Router.go(Session.get('navData').prevTemplate,{},{replaceState: false});
  },
  "click .menu": function(e, t){
    e.preventDefault();

    var menuId = e.currentTarget.id;
    t.isSelected.set(menuId);

    var template = {
      templateName : "inhAddUserIms",
      header : true
    };

    var logType = 'IMSUSER';
    switch(menuId){
      case 'imsUser':
        logType = 'IMSUSER';
        template.templateName = "inhAddUserIms";
        Session.set("inhAddUser_selectedTemplate", template);
      break;
      case 'nonImsUser':
        logType = 'NONIMSUSER';
        template.templateName = "inhAddUserNonIms";
        Session.set("inhAddUser_selectedTemplate", template);
      break;
      default:
        Session.set("inhAddUser_selectedTemplate", template);
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0026', Meteor.userId(),'IH', logType); //상속하기 친구/직접입력 메뉴 클릭
    }
  }
});

Template.ihnAddUser.helpers({
  hpSelected: function(_menu){
    var result = false;
    if(_menu === Template.instance().isSelected.get()){
      result = true;
    }
    return result;
  },
  hpSelectedTemplate: function(){
    return Session.get("inhAddUser_selectedTemplate");
  },
});

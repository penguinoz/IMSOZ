import {global} from '/imports/global/global_things.js';
Template.inheritance.onCreated(function(){
  var instance = this;
  instance.isEnoughPoint = new ReactiveVar();
  instance.selectedTemplate = new ReactiveVar();

  if(!Session.get("inherit_selectedMenu")){
    Session.set("inherit_selectedMenu", 'btn_to');
  }
  //포인트 정보를 가져오는 method call을 이용해서 사용자의 포인트정보를 확인한다.
  var isEnoughPoint = true;

  instance.isEnoughPoint.set(isEnoughPoint);
  instance.selectedTemplate.set(this.data.subMenu);
});

Template.inheritance.onRendered(function(){
  if(Meteor.userId()){
    var guideType = 'guide02_IH0001';
    Meteor.call('checkGuide', guideType, Meteor.userId(), function(error, result){
      if(error){
        console.log(error);
      } else {
        if(!result){
          //가이드 문서
          var template = {};
          template.templateName = 'guide02'; //슬라이드
          template.data = "/images/bg/guide/guide_상속.jpg";
          Session.set('guidePopTemplate', template);

          //가이드 완료 체크
          Meteor.call('setGuideComplete', guideType, Meteor.userId(), function(error, result){
            if(error){
              console.log(error);
            } else {
            }
          });
        }
      }
    });
  }
});

Template.inheritance.helpers({
  hpIsEnoughPoint: function(){
    return Template.instance().isEnoughPoint.get();
  },
  hpSelectedTemplate: function(){
    return Template.instance().selectedTemplate.get();
  },
  hpSelected: function(_id){
    // console.log(Session.get("inherit_selectedMenu"));
    var seletedId = Session.get("inherit_selectedMenu");
    var result = false;
    if(_id === seletedId){
      result = true;
    }
    return result;
  }
});

Template.inheritance.events({
  "click .top-sub-menu a": function(e, t){
    e.preventDefault();


    var logType = 'TO';
    var menuId = e.currentTarget.id;
    switch(menuId){
      case 'btn_to':
      logType = 'TO';
        Router.go('inheritanceTo',{},{replaceState: false});
        t.selectedTemplate.set('inheritanceToList');
        break;
      case 'btn_from':
      logType = 'FROM';
        Router.go('inheritanceFrom',{},{replaceState: false});
        t.selectedTemplate.set('inheritanceFromList');
        break;
      case 'btn_guardian':
      logType = 'GUARDIAN';
        Router.go('guardian',{},{replaceState: false});
        t.selectedTemplate.set('guardianToList');
        break;
      case 'btn_funaral':
      logType = 'FUNARAL';
        $('.funaral-menu').removeClass("display-none");
        $('.black-over').removeClass("display-none");
        break;
      default :
      logType = 'TO';
        case 'btn_to':
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0024', Meteor.userId(),'IH', logType); //버키스토리 상세보기
    }

    // if(menuId !== 'btn_funaral'){
    //   Session.set("inherit_selectedMenu", menuId);
    // }
  }
});

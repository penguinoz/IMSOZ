import {global} from '/imports/global/global_things.js';
Template.inheritanceEmpty.onCreated(function(){
  var instance = this;
  instance.templateInfo = Session.get('navData').prevTemplate;
  // console.log(Session.get('navData').prevTemplate);
});


Template.inheritanceEmpty.events({
  "click .addInheritor": function(e, t){

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0025', Meteor.userId(),'', ''); //상속하기 버튼 클릭
    }

    if(Meteor.userId()){
      Meteor.call("getPoint",Meteor.userId(), 0, function(err,res){
        if(err)console.log(err);
        if(res){
          if(res.pointSum >= 1000){
            Router.go('addInheritor',{},{replaceState: false});
          }else{
            $('#myPointInfo').text(res.pointSum+" P");
            $('#pointPrevent').removeClass("display-none");
            $('.black-over').removeClass("display-none");
          }

        }
      });
      // Router.go('addInheritor',{},{replaceState: false});
    } else {
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
  },
  "click .addGuardian": function(e, t){
    if(Meteor.userId()){
      Router.go('addGuardian',{},{replaceState: false});
    } else {
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
  }
});

Template.inheritanceEmpty.helpers({
  hpTemplateInfo: function(){
    return Template.instance().templateInfo;
  }
});

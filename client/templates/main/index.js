import {global} from '/imports/global/global_things.js';
var templateName = 'index';

Template.index.onCreated(function(){
  var instance = this;

  instance.contentsTemplate = new ReactiveVar();
  instance.isMyPage = new ReactiveVar(this.data);




  if(this.data === 'root'){
    if(Meteor.userId()){
      Router.go("endingNote",{},{replaceState: true});
    } else {
      Router.go('login',{},{replaceState: true});
    }
  }


  if(Meteor.userId()){
    // Router.go("endingNote",{},{replaceState: true});
    Meteor.call("checkSNSUserProfile",function(err,res){
      if(!res){
        Router.go('login',{},{replaceState: false});
      }else{
        Meteor.call('checkGuide', 'guide01', Meteor.userId(), function(error, result){
          if(error){
            console.log(error);
          } else {
            if(!result){
              // 1. 로그 사용여부확인
              if(global.writeLog){
                //2. 로그 생성
                Meteor.call('setLog', 'LG0050', Meteor.userId(),'GD', 'GD0001'); //가이드 시작
              }
              Router.go('guide',{num:'01'},{replaceState: true});
            }
          }
        });
      }
    });
  }
  //가이드 표시 여부 체크 및 가이드 표시


  // if(!Meteor.user().profile){
  //   console.log("not profile");
  //   Router.go('registrationSns',{},{replaceState: false});
  //   return;
  // }



  Meteor.call('getCodeOption',function(error, result){
    if(error){
      return;
    } else {
      Object.keys(result).map(function(key,index){
        global[key] = result[key];
      });
    }
  }); //서버쪽 codeConfig설정
});

Template.index.onRendered(function(){

});

Template.index.helpers({
  hpContentsTemplate: function(){
    return Session.get("index_contentsTemplate");
  },
  hpIsMyPage: function(){
    return Template.instance().isMyPage.get();
  },
  hpGuideShow:function(){
    return Session.get('guidePopTemplate');
  },
});

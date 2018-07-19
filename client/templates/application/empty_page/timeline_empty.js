

Template.timelineEmpty.events({
  "click .writeStory": function(e, t){
    e.preventDefault();
    var timeline={};

    if(Meteor.userId()){
      Router.go('writeStory',{},{replaceState: false});
    } else {
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
      return;
      // Router.go('login',{},{replaceState: false});
    }
  }
});

Template.timelineEmpty.helpers({
  hpIsLogin: function(){
    if(Meteor.userId()){
      return true;
    } else {
      return false;
    }
  }
});

Template.timelineEmpty.onRendered(function(){
  $(".loading").hide();
});

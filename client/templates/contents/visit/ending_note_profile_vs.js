import {global} from '/imports/global/global_things.js';

Template.endingNoteProfileVs.onCreated(function(){
  var instance = this;
  instance.profileData = new ReactiveVar();
  instance.charCount = new ReactiveVar();
  instance.pageOwnerId =  this.data.userId;
  instance.userId =  global.fn_passCode(this.data.userId, 'DC');
  instance.storyCount = new ReactiveVar();


  Session.set('confrim_center', false);

  if(Meteor.userId() && instance.userId){
    Meteor.call("getProfileData", instance.userId, function(error, result){
      if(error){
        console.log(error);
      } else {
        instance.profileData.set(result);
      }
    });

    Meteor.call('getContentCount', instance.userId, false, function(error, result){
      if(error){
        console.log(error);
      } else {
        instance.storyCount.set(result);
      }
    });
  }


});

Template.endingNoteProfileVs.helpers({
  hpProfileData: function(){
    return Template.instance().profileData.get();
  },
  hpCharCount: function(){
    return Template.instance().charCount.get();
  },
});

Template.endingNoteProfileVs.events({
  "click #lifeMap": function(e, t){
    e.preventDefault();




        if(t.storyCount.get() >= global.lifeMapMinCnt){
          var encId = global.fn_passCode(Meteor.userId(), 'EC');

          Router.go('lifeMap', {_id: t.pageOwnerId},{replaceState: false});
        } else {
          var confrimData = {
            title : '라이프 맵은 글이 '+global.lifeMapMinCnt+'개 이상<br/>등록되어 있어야 확인 가능합니다.',
            context : '',
            templateName : 'endingNoteProfileVs',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return;
        }
  },
});

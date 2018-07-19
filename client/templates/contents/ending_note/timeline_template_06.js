//육아일기 템플릿
Template.timelineTemplate06.onCreated(function(){
  var instance = this;
  instance.familyInfo = new ReactiveVar();

  if(this.data && this.data.targetId){
    Meteor.call('getFamilyInfo', Meteor.userId(), this.data.targetId, function(error, result){
      if(error){
        console.log(error);
      } else {
        instance.familyInfo.set(result);
      }
    });
  }

});

Template.timelineTemplate06.helpers({
  hpFamilyInfo: function(){
    return Template.instance().familyInfo.get();
  }
});

Template.timelineTemplate06.onRendered(function(){
});

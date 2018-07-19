import {global} from '/imports/global/global_things.js';
var instance;
Template.lastLetterDetail.onCreated(function(){
  instance = this;
  instance.lastLetterData = new ReactiveVar();

  Session.set('confrim_center', false);

  Meteor.call("getLastLetter",instance.data._id, function(err,res){
    if(err){
      console.log(err);
    } else {
      instance.lastLetterData.set(res);
    }
  });
});

Template.lastLetterDetail.onRendered(function(){

});

Template.lastLetterDetail.events({
  "click #back": function(e, t){
    e.preventDefault();

    Router.go('inheritanceFrom',{},{replaceState: false});
  },
});

Template.lastLetterDetail.helpers({
  hpLastLetterData: function(){
    return Template.instance().lastLetterData.get();
  },
});

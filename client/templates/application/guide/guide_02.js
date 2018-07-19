
Template.guide02.onCreated(function(){
  var instance = this;
  instance.guideData = new ReactiveVar();
  instance.guideData.set(this.data);
});

Template.guide02.onRendered(function(){
    // $("html").addClass('touch-action-none');
    // $("body").addClass('scroll-hidden');
    // $(".contents").addClass('display-none');

});

Template.guide02.helpers({
  hpGuideData: function(){
    return Template.instance().guideData.get();
  }
});

Template.guide02.events({
  "click #btn-cancel": function(e, t){
    // $("html").removeClass('touch-action-none');
    // $("body").removeClass('scroll-hidden');
    // $(".contents").removeClass('display-none');
    Session.set('guidePopTemplate', false);
  }
});

Template.guide02.onDestroyed(function(){
  // $("html").removeClass('touch-action-none');
  // $("body").removeClass('scroll-hidden');
  // $(".contents").removeClass('display-none');
  Session.set('guidePopTemplate', false);
});

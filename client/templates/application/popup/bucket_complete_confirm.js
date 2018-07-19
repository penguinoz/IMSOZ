Template.bucketCompleteconfirm.onCreated(function(){
  var instance = this;
  instance.confirmData = ReactiveVar();
  instance.confirmData.set(this.data);
  instance.returnData = this.data.returnData;
  instance.templateName = this.data.templateName;
  instance.hpCallbackName = this.data.callBackName;

  $("html").addClass('scroll-hidden');
});

Template.bucketCompleteconfirm.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  // $('.prevent.over-pop').slideDown(300);
});

Template.bucketCompleteconfirm.helpers({
  hpConfirmData: function(){
    return Template.instance().confirmData.get();
  }
});


Template.bucketCompleteconfirm.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    Session.set('confrim_complete_center', false);
  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();

    Session.set('confrim_complete_center', false);
    Template[t.templateName].__helpers.get('hpConfirmCallBack')(t.returnData);
  }
});

Template.bucketCompleteconfirm.onDestroyed(function(){
  $("html").removeClass('scroll-hidden');
});

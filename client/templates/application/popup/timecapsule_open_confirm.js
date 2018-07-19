Template.timecapsuleOpenConfirm.onCreated(function(){
  var instance = this;
  instance.confirmData = ReactiveVar();
  instance.confirmData.set(this.data);
  instance.returnData = this.data.returnData;
  instance.templateName = this.data.templateName;
  instance.hpCallbackName = this.data.callBackName;

  $("html").addClass('scroll-hidden');
});

Template.timecapsuleOpenConfirm.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  // $('.prevent.over-pop').slideDown(300);
});

Template.timecapsuleOpenConfirm.helpers({
  hpConfirmData: function(){
    return Template.instance().confirmData.get();
  }
});


Template.timecapsuleOpenConfirm.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('confrim_capsule_open', false);
  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('confrim_capsule_open', false);

    Template[t.templateName].__helpers.get('hpConfirmCallBack')(t.returnData);
  }
});

Template.timecapsuleOpenConfirm.onDestroyed(function(){
  $("html").removeClass('scroll-hidden');
});

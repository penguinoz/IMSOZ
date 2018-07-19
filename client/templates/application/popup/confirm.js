Template.confirm.onCreated(function(){
  var instance = this;
  instance.confirmData = new ReactiveVar();
  instance.confirmData.set(this.data);
  instance.returnData = this.data.returnData;
  instance.templateName = this.data.templateName;
  instance.hpCallbackName = this.data.callBackName;

  $("html").addClass('scroll-hidden');
});

Template.confirm.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  // $('.prevent.over-pop').slideDown(300);
});

Template.confirm.helpers({
  hpConfirmData: function(){
    return Template.instance().confirmData.get();
  }
});


Template.confirm.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    Session.set('confrim_center', false);

  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();

    Session.set('confrim_center', false);
    Template[t.templateName].__helpers.get('hpConfirmCallBack')(t.returnData);
  }
});

Template.confirm.onDestroyed(function(){
  $("html").removeClass('scroll-hidden');
});

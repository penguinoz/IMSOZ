Template.inheritanceInfoPopup.onCreated(function(){
  var instance = this;
  instance.confirmData = ReactiveVar();
  instance.confirmData.set(this.data);
  instance.returnData = this.data.returnData;
  instance.templateName = this.data.templateName;
  instance.hpCallbackName = this.data.callBackName;

  $("html").addClass('scroll-hidden');
});

Template.inheritanceInfoPopup.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  // $('.prevent.over-pop').slideDown(300);
});

Template.inheritanceInfoPopup.helpers({
  hpConfirmData: function(){
    return Template.instance().confirmData.get();
  }
});


Template.inheritanceInfoPopup.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('inheritance_info_pop_show', false);

  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('inheritance_info_pop_show', false);

    // Template[t.templateName].__helpers.get('hpConfirmCallBack')(t.returnData);
  }
});

Template.guidePopup01.onCreated(function(){
  var instance = this;
  instance.popupData = ReactiveVar();
  instance.popupData.set(this.data);
  instance.returnData = this.data.returnData;
  instance.templateName = this.data.templateName;
  instance.hpCallbackName = this.data.callBackName;

  $("html").addClass('scroll-hidden');
});

Template.guidePopup01.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  // $('.prevent.over-pop').slideDown(300);
});

Template.guidePopup01.helpers({
  hpPopupData: function(){
    return Template.instance().popupData.get();
  }
});


Template.guidePopup01.events({
  "click #btn-cancel": function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('popup_guide', false);

  },
  // "click .btn-confirm":function(e, t){
  //   e.preventDefault();
  //
  //   $("html").removeClass('scroll-hidden');
  //   Session.set('popup_guide', false);
  //
  //   Template[t.templateName].__helpers.get('hpConfirmCallBack')(t.returnData);
  // }
});

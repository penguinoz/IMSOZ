import {global} from '/imports/global/global_things.js';

Template.officialNotification01.onCreated(function(){
  var instance = this;
  instance.officialNotiData = new ReactiveVar();
  var today = global.fn_dateFormat(new Date()).HMS;
  Meteor.call('getOfficialNoti', today, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.officialNotiData.set(result);
    }
  });
});

Template.officialNotification01.onRendered(function(){

});

Template.officialNotification01.helpers({
  hpNotiData: function(){
    return Template.instance().officialNotiData.get();
  }
});

Template.officialNotification01.events({
  "click #btn-close": function(e, t){
    e.preventDefault();

    if($("#check01")[0].checked){
      setCookie('notToday','Y', 1);
    }
    Session.set('colsedNoti', true);
    // $(".official-notification").hide('fade');
    $(".official-notification").hide();
    $("html").removeClass('scroll-hidden');
  }
});

Template.officialNotification01.onDestroyed(function(){
  $("html").removeClass('scroll-hidden');
});


function setCookie(name, value, expiredays) {
	var today = new Date();
	    today.setDate(today.getDate() + expiredays);
	    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + ';'
}

function closePopupNotToday(){
  setCookie('notToday','Y', 1);
  $("#main_popup").hide('fade');
}

function closeMainPopup(){
  $("#main_popup").hide('fade');
}

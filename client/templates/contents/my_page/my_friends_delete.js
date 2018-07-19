import {global} from '/imports/global/global_things.js';
Template.myFriendsDelete.onCreated(function(){
  var instance = this;
  instance.deleteUserInfo = new ReactiveVar(instance.data);

  $("html").addClass('scroll-hidden');
});

Template.myFriendsDelete.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  $('.prevent.over-pop').slideDown(300);
});


Template.myFriendsDelete.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('myFriends_deleteConfirmPageOpen', false);

  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('myFriends_deleteConfirmPageOpen', false);
    Template['myFriends'].__helpers.get('hpDelFriendConfirmCallBack')(t.deleteUserInfo.get());
  }
});


Template.myFriendsDelete.helpers({
  hpDeleteUserInfo: function(){
    return Template.instance().deleteUserInfo.get();
  }
});


Template.myFriendsDelete.onDestroyed(function(){
  $("html").removeClass('scroll-hidden');
});

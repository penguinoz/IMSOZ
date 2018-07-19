Template.myFriendsAdd.onCreated(function(){
  var instance = this;
  instance.addUserInfo = new ReactiveVar(instance.data);
  $("html").addClass('scroll-hidden');
});

Template.myFriendsAdd.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  $('.prevent.over-pop').slideDown(300);
});


Template.myFriendsAdd.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('myFriends_addConfirmPageOpen', false);
  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();

    //삭제 method 추가되어야 함
    $("html").removeClass('scroll-hidden');
    Session.set('myFriends_addConfirmPageOpen', false);
  }
});


Template.myFriendsAdd.helpers({
  hpAddUserInfo: function(){
    return Template.instance().addUserInfo.get();
  }
});
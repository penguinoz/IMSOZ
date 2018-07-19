import {global} from '/imports/global/global_things.js';
Template.searchUser.onCreated(function(){
  var instance = this;
  instance.isSelected = new ReactiveVar("imsUser");

  instance.usersInfo = new ReactiveVar();
  instance.selectedUser = new ReactiveVar([]);

  if(this.data){
    instance.selectedUser.set(this.data);
  }
  // hpAddUserList

  Meteor.call("getSearchMyFriends", Meteor.userId(), '',function(err,res){
    if(err){
      console.log(err);
    }else{
      instance.usersInfo.set(res);
    }
  });
});

Template.searchUser.events({
  "click #backSearchUser": function(e, t){
    e.preventDefault();

    Session.set('editor_search_user_show',false);
  },
  "click .btn-select": function(e, t){
    e.preventDefault();

    var tempUser = [];
    var tempUserId = _.pluck(t.selectedUser.get(), '_id');

    var userData = {
      _id : this._id,
      username : this.username,
      profileImg : this.profile.profileImg,
      name : this.profile.name,
      nickName : this.profile.nickName,
    };

    if(_.contains(tempUserId, userData._id)){
      //제외
      tempUser = global.fn_removeObjInArr(t.selectedUser.get(), '_id', userData._id);
    } else {
      //포함
      tempUser = t.selectedUser.get();
      tempUser.push(userData);
    }

    t.selectedUser.set(tempUser);
  },
  //확인버튼
  "click .btn-bottom" : function(e, t){
    if(t.selectedUser.get().length === 0){
      // alert('대상을 선택해 주세요');
      var confrimData = {
        title : '대상을 선택해 주세요',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else {
      var userInfo = t.selectedUser.get();
      Session.set('editor_addUserList', userInfo);
      Session.set('editor_search_user_show',false);
    }
  },
  "click #searchFrdList" : function(e,t){
    var searchWord = $("#searchWord").val();
    var options = {};
    Meteor.call("getSearchMyFriends",Meteor.userId(), searchWord,function(err,res){
      if(err){
        console.log(err);
      }else{
        t.usersInfo.set(res);
      }
    });
  },
  'keypress #searchWord': function (e,t) {
    // e.preventDefault();
    if (e.which === 13) {
      var searchWord = e.currentTarget.value;
      // console.log(searchWord);
      var options = {};
      Meteor.call("getSearchMyFriends",Meteor.userId(), searchWord,function(err,res){
        if(err){
          console.log(err);
        }else{
          t.usersInfo.set(res);
        }
      });
    }
  },
  'click .remove-user' : function(e, t){
    var tempUser = [];
    var userData = {
      _id : this._id,
      username : this.username,
      profileImg : this.profileImg,
      name : this.name,
    };
    tempUser = global.fn_removeObjInArr(t.selectedUser.get(), '_id', userData._id);
    t.selectedUser.set(tempUser);
  },
});

Template.searchUser.helpers({
  hpSelected: function(_menu){
    var result = false;
    if(_menu === Template.instance().isSelected.get()){
      result = true;
    }
    return result;
  },
  hpSelectedUserInfo: function(){
    return Template.instance().selectedUser.get();
  },
  hpSearchResult: function(){
    return Template.instance().usersInfo.get();
  },
  hpSelect: function(_userId){
    var result = false;
    var tempUserId = _.pluck(Template.instance().selectedUser.get(), '_id');
    if(_.contains(tempUserId, _userId)){
      result = true;
    }
    return result;
  }
});

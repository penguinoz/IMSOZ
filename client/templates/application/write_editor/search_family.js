import {global} from '/imports/global/global_things.js';
Template.searchFamily.onCreated(function(){
  var instance = this;
  instance.isSelected = new ReactiveVar("imsUser");

  instance.selectedUser = new ReactiveVar([]);
  instance.subType = this.data.subType;


  Session.set('addFamily_showProfileImgEditor', false); //가족 프로필 사진 편집 화면
  Session.set('editor_add_family_data',false); //가족등록 화면 띄우는 flag;

  if(this.data.users){
    instance.selectedUser.set(this.data.users);
  }

  Meteor.call('getFamilyData', Meteor.userId(), instance.subType, function(error, result){
    if(error){
      console.log(error);
    } else {
      Session.set('familyData', result);
    }
  });
});

Template.searchFamily.events({
  //뒤로
  "click #backsearchFamily": function(e, t){
    e.preventDefault();

    Session.set('editor_search_user_show',false);
  },
  //자녀/반려동물 선택
  "click .btn-select": function(e, t){
    e.preventDefault();

    var tempUser = [];
    var tempUserId = _.pluck(t.selectedUser.get(), '_id');

    var userData = {
      _id : this._id,
      username : this.name,
      profileImg : this.profileImg,
      name : this.name,
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
  "click #addFamilyconfirm" : function(e, t){
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
  //자녀/반려동물 선택 취소
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
  //자녀/반려동물 추가
  'click #addFamily': function(e,t){
    var data = {
      subType : t.subType,
      isShow:true,
      data: ''
    };
    Session.set('editor_add_family_data',data);
  },
  //자녀/반려동물 정보 수정
  "click #editFamily": function(e, t){
    var data = {
      _id : this._id,
      name : this.name,
      birthday : this.birthday,
      profileImg : this.profileImg,
      sex : this.sex,
      subType : t.subType,
      isShow:true,
    };
    Session.set('editor_add_family_data',data);
  },
});

Template.searchFamily.helpers({
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
    return Session.get('familyData');
  },
  hpSelect: function(_userId){
    var result = false;
    var tempUserId = _.pluck(Template.instance().selectedUser.get(), '_id');
    if(_.contains(tempUserId, _userId)){
      result = true;
    }
    return result;
  },
  hpProileImgData: function(){
    return Session.get('addFamily_showProfileImgEditor');
  },
  hpAddFamilyData : function(){
    return Session.get('editor_add_family_data');
  },
});

Template.searchFamily.onDestroyed(function(){
  Session.set('familyData', null);
});

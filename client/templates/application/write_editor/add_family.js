import { Random } from 'meteor/random';

Template.addFamily.onCreated(function(){
  var instance = this;
  instance.memberData = new ReactiveVar();
  instance.subType = new ReactiveVar(this.data.subType);
  instance.birthDay = new ReactiveVar();
  instance.userInfo = this.data;

  // console.log('addFmail : ', this);

  //생일 설정
  if(instance.userInfo.birthday){
    instance.birthDay.set(instance.userInfo.birthday);
  } else {
    instance.birthDay.set('1990-01-01');
  }
});

Template.addFamily.onRendered(function(){
  if(Template.instance().userInfo){

    //이름설정
    $('#userName').val(Template.instance().userInfo.name);

    //성별 설정
    if(Template.instance().userInfo.sex){
      if(Template.instance().userInfo.sex === '남'){
       $("#mail").prop("checked", true);
     } else {
       $("#female").prop("checked", true);
     }
    }

    // //생일 설정
    // if(Template.instance().userInfo.birthday){
    //   $('#mDate').val(Template.instance().userInfo.birthday);
    // }
    var imageData = {
      profileImg : Template.instance().userInfo.profileImg,//t.myInfoData.get().profileImg
      isShow : true
    };
    // $('#mDate').val(global.fn_dateFormat(global.fn_getCalDate(global.fn_dateFormat().YMD, 15, 'SUM')).YMD);

    Session.set('editor_add_family_data', imageData);
  }
});

Template.addFamily.events({
  //뒤로가기 버튼
  "click #backAddFamily": function(e, t){
    e.preventDefault();

    var data = {
      isShow : false
    };
    Session.set('editor_add_family_data',data);
    // Session.set('editor_add_family_data',false);
  },
  //확인버튼
  // "click .btn-bottom" : function(e, t){
  //   // var userInfo = t.selectedUser.get();
  //   // var data = {
  //   //   _id : userInfo._id,
  //   //   username : userInfo.username,
  //   //   profileImg : userInfo.profile.profileImg ? userInfo.profile.profileImg : '',
  //   //   name : userInfo.profile.name,
  //   // };
  //   // Session.set('editor_addUserList', [data]);
  //   // Session.set('editor_add_family_data',false);
  // },
  //이미지 변경 버튼
  "click .edit-img": function(e, t){
    e.preventDefault();

    var data = {
      isShow : false,
    }
    Session.set('editor_add_family_data',data);

    var imageData = {
      templateName : 'editProfileImage',
      header : false,
      fromTemp : "addFamily",
      profileImg : t.userInfo.profileImg ? t.userInfo.profileImg : '',
      isShow : true,
      data : {
        _id : t.userInfo._id? t.userInfo._id : '',
        birthday : $('#mDate').val(),
        name : $('#userName').val(),
        sex :$("[name=sex]:checked").val(),
        subType : t.subType.get(),
      }
    };
    Session.set('addFamily_showProfileImgEditor', imageData);
  },
  "click #save": function(e,t){
    e.preventDefault();
    var data = {
      _id: t.userInfo._id? t.userInfo._id : Random.id(),
      profileImg : Session.get('editor_add_family_data').profileImg,
      sex: $("[name=sex]:checked").val(),
      birthday: $('#mDate').val(),
      name: $("#userName").val(),
      relation : t.subType.get()
    };

    var relation = t.subType.get();

    Meteor.call('setFamilyData', Meteor.userId(), data, function(error, result){
      if(error){
        console.log(error);
      } else {
        Meteor.call('getFamilyData', Meteor.userId(), relation, function(error, result){
          if(error){
            console.log(error);
          } else {
            Session.set('familyData', result);
          }
        });
        var data = {
          isShow : false
        };
        Session.set('editor_add_family_data',data);
      }
    });
  },
});

Template.addFamily.helpers({
  hpProfileImage : function(){
    return Session.get('editor_add_family_data').profileImg;
  },
  hpBirthDay : function(){
    return Template.instance().birthDay.get();
  }
});

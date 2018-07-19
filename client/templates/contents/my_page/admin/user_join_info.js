import {global} from '/imports/global/global_things.js';

Template.userJoinInfo.onCreated(function(){
  var instance = this;
  instance.userList = new ReactiveVar();
  var name = '';
  var sDate = global.fn_getCalDateByMonth(new Date(), 1, 'SUB');
  var eDate = global.fn_dateFormat(new Date()).YMD;
  eDate = global.fn_dateFormat(eDate).YMD;

  Meteor.call('getUserList', name, sDate, eDate, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.userList.set(result);
    }
  });
});

Template.userJoinInfo.onRendered(function(){
  var sDate = global.fn_getCalDateByMonth(new Date(), 1, 'SUB');
  $('input[name=sDate]').val(global.fn_dateFormat(sDate).YMD);
  $('input[name=eDate]').val(global.fn_dateFormat(new Date()).YMD);
});

Template.userJoinInfo.helpers({
  hpUserListData: function(){
    return Template.instance().userList.get();
  }
});

Template.userJoinInfo.events({
  "click input[name='searchBtn']": function(e, t){
    e.preventDefault();

    var name = $('input[name=searchName]').val();
    var sDate = $('input[name=sDate]').val();
    var eDate = $('input[name=eDate]').val();
    Meteor.call('getUserList', name, sDate, eDate, function(error, result){
      if(error){
        console.log(error);
      } else {
        t.userList.set(result);
      }
    });
  },
  "click input[name='searchBtnAll']": function(e, t){
    var name = '';
    var sDate = '1999-01-01';
    var eDate = global.fn_dateFormat(new Date()).YMD;
    Meteor.call('getUserList', name, sDate, eDate, function(error, result){
      if(error){
        console.log(error);
      } else {
        t.userList.set(result);
      }
    });
  }
});

import {global} from '/imports/global/global_things.js';

Template.logList.onCreated(function(){
  var instance = this;
  instance.logListData = new ReactiveVar();
  var name = ''
  var sDate = global.fn_dateFormat(new Date()).YMD;
  var eDate = global.fn_getCalDate(new Date(), 1, 'SUM')
  eDate = global.fn_dateFormat(eDate).YMD;

  Meteor.call('getLogList', name, sDate, eDate, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.logListData.set(result);
    }
  });
});

Template.logList.onRendered(function(){
  var eDate = global.fn_getCalDate(new Date(), 1, 'SUM');
  $('input[name=sDate]').val(global.fn_dateFormat(new Date()).YMD);
  $('input[name=eDate]').val(global.fn_dateFormat(eDate).YMD);
});

Template.logList.helpers({
  hpLogListData: function(){
    return Template.instance().logListData.get();
  }
});

Template.logList.events({
  "click input[name='searchBtn']": function(e, t){
    e.preventDefault();

    var name = $('input[name=searchName]').val();
    var sDate = $('input[name=sDate]').val();
    var eDate = $('input[name=eDate]').val();
    Meteor.call('getLogList', name, sDate, eDate, function(error, result){
      if(error){
        console.log(error);
      } else {
        t.logListData.set(result);
      }
    });
  },
  "click input[name='searchBtnAll']": function(e, t){
    var name = '';
    var sDate = '1999-01-01';
    var eDate = global.fn_dateFormat(new Date()).YMD;
    Meteor.call('getLogList', name, sDate, eDate, function(error, result){
      if(error){
        console.log(error);
      } else {
        t.logListData.set(result);
      }
    });
  }
});

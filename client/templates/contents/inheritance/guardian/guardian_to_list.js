import {global} from '/imports/global/global_things.js';
var templateName = "guardianToList";

var dragFlag = false;
var x, y, pre_x, pre_y;


Template.guardianToList.onCreated(function(){

  var instance = this;
  instance.guardianListData = new ReactiveVar();
  instance.nonUserGuardians = new ReactiveVar();
  instance.selectedIndex = ReactiveVar();

  Meteor.call("getGuardianList",Meteor.userId(),function(err,res){
    if(err){
      console.log(err);
    }else if(res){
      instance.guardianListData.set(res);
    }
  });

  Meteor.call("getNonUserGuardian",Meteor.userId(),function(err,res){
    if(err){
      console.log(err);
    }
    if(res){
      instance.nonUserGuardians.set(res);
    }
  });

  var navData ={
    type : 'GD',
    category:"addGuardian",
    prevTemplate : "guardian"
  };

  Session.set('navData', navData);
});

Template.guardianToList.onRendered(function(){

});

Template.guardianToList.helpers({
  hpGuardianListData: function(){
    return Template.instance().guardianListData.get();
  },
  hpNonUserGuardianList: function(){
    return Template.instance().nonUserGuardians.get();
  },
  hpSelect: function(_index){
    var result = false;
    var index = parseInt(Template.instance().selectedIndex.get());
    if(index === _index){
      result = true;
    }
    // console.log(Template.instance().selectedIndex.get(), ", "+_index, result);
    return result;
  },
  hpCheckUnless : function(){
    var gardiData = Template.instance().guardianListData.get();
    var nonUserGardi = Template.instance().nonUserGuardians.get();
    if(!gardiData || !nonUserGardi){
      return true;
    }
    if(!gardiData.length && !nonUserGardi.length){
      return true;
    }else{
      return false;
    }
  }
});

Template.guardianToList.events({
  "click .btn-select": function(e, t){
    e.preventDefault();
    // t.selectedIndex.set(e.currentTarget.id);
    // t.selectedUser.set(this);
  },
  "click figure": function(e, t){
    e.preventDefault();
  },
  "click [name=delGuardian]":function(e,t){
    if (confirm("가디언을 삭제 하시겠습니까?") == false) {
        return;
    }
    Meteor.call("pullGuardianUser",this._id,function(err,res){
      if(err){
        console.log(err);
      }else{
        Meteor.call("getGuardianList",Meteor.userId(),function(err,res){
          if(err){
            console.log(err);
          }else if(res){
            t.guardianListData.set(res);
          }
        });

        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
          Meteor.call('setLog', 'LG0030', Meteor.userId(),'', ''); //가디언 삭제
        }
      }
    });
  },
  "click [name=delNonUGuardian]":function(e, t){
    if (confirm("가디언을 삭제 하시겠습니까?") == false) {
        return;
    }
    Meteor.call("nonUserPullGuardianUser",this.email,function(err,res){
      if(err){
        console.log(err);
      }else{
        Meteor.call("getNonUserGuardian",Meteor.userId(),function(err,res){
          if(err){
            console.log(err);
          }else if(res){
            t.nonUserGuardians.set(res);
          }
        });
      }
    });
  },
  "mousedown .category-slide-wrap": function(e, t){
    dragFlag = true;
    var obj = $(".category-slide-wrap");
    x = obj.scrollLeft();
    y = obj.scrollTop();

    pre_x = e.screenX;
    pre_y = e.screenY;

    $(".category-slide-wrap").css("cursor", "pointer");


    // $('#result').text(dragFlag);
  },
  "mousemove .category-slide-wrap": function(e, t){
    if (dragFlag) {
      var obj = $(".category-slide-wrap");
      obj.scrollLeft(x - e.screenX + pre_x);
      obj.scrollTop(y - e.screenY + pre_y);

      //$('#result').text((x - e.screenX + pre_x) + "," + (y - e.screenY + pre_y));
      return false;
    }
  },
  "mouseup .category-slide-wrap": function(e, t){
    dragFlag = false;
    $(".category-slide-wrap").css("cursor", "default");
  },
  "click .float-button a":function(e,t){
    e.preventDefault();

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0054', Meteor.userId(),'', ''); //가디언 추가버튼 클릭
    }

    Session.set("opneToglePamamSession",true);

  },
});

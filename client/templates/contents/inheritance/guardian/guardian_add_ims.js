Template.guardianAddIms.onCreated(function(){
  var instance = this;
  instance.usersInfo = ReactiveVar();
  instance.selectedIndex = ReactiveVar();
  instance.selectedUser = ReactiveVar();
  // instance.isClickedNext = ReactiveVar(false);
  searchFriends(this);


  // instance.usersInfo.set(usersInfo);
});

Template.guardianAddIms.onRendered(function(){
});


Template.guardianAddIms.events({
  "click .btn-select": function(e, t){
    e.preventDefault();
    t.selectedIndex.set(e.currentTarget.id);
    t.selectedUser.set(this);
  },
  "click .btn-bottom" : function(e, t){
    if(!t.selectedUser.get()){
      // alert('상속 대상을 선택해 주세요');
      var confrimData = {
        title : '상속 대상을 선택해 주세요',
        context : '',
        templateName : 'guardianAddFin',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else {
      var templateData = t.selectedUser.get();
      templateData.templateName = 'guardianAddIms';

      var template = {
        templateName : 'guardianAddFin',
        header : false,
        data : templateData
      };
      Session.set("guardianAdd_selectedTemplate", template);
    }
  },
  "click #searchFrdList" : function(e,t){
    var searchWord = $("#searchWord").val();
    var options = {};
    Meteor.call("getGuardianIds",Meteor.userId(),function(err,res){
      if(err){
        console.log(err);
      }else{
        Meteor.call("findUserList", searchWord, options, res,function(err,res){
          if(err){
            console.log(err);
          }
          if(res){
            // console.log(t.usersInfo.get());
            t.usersInfo.set(res);
          }
        });
      }
    });

  },
  'keypress': function (e,t) {
    if (e.which === 13) {
      var searchWord = $("#searchWord").val();
      var options = {};
      Meteor.call("getGuardianIds",Meteor.userId(),function(err,res){
        if(err){
          console.log(err);
        }else{
          Meteor.call("findUserList", searchWord, options, res,function(err,res){
            if(err){
              console.log(err);
            }
            if(res){
              // console.log(t.usersInfo.get());
              t.usersInfo.set(res);
            }
          });
        }
      });
    }
  }
});


Template.guardianAddIms.helpers({
  hpSelectedUserInfo: function(){
    return Template.instance().selectedUser.get();
  },
  hpSearchResult: function(){
    return Template.instance().usersInfo.get();
  },
  hpSelect: function(_index){
    var result = false;
    var index = parseInt(Template.instance().selectedIndex.get());
    if(index === _index){
      result = true;
    }
    // console.log(Template.instance().selectedIndex.get(), ", "+_index, result);
    return result;
  }
});


function searchFriends(ins){
  //친구검색
  Meteor.call("getMyFriends",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){
      var frienList = [];
      res.forEach(function(val){
        frienList.push(val.userId);
      });
      //이미보낸 리스터 검색
      Meteor.call("getGuardianIds",Meteor.userId(),function(err,res){
        if(err){
          console.log(err);
        }
        if(res){
          // console.log("res "+res);
          // console.log("frienList "+frienList);
          var infFriends = _.difference(frienList,res);

          //보낸사람 빼고 검색
          Meteor.call("getUserInfoByUid",infFriends,function(err,res){
            if(err){

            }
            if(res){
              // console.log(res);
              res.forEach(function(val){
                val.responMe = false;
                val.type = false;
                val.myFrien = true;
              })
              ins.usersInfo.set(res);
            }
          });
        }
      });


    }
  });
}

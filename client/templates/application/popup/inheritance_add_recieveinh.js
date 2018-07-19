Template.inheritanceAddRecieveinh.onCreated(function(){

});

Template.inheritanceAddRecieveinh.events({
  "click #codeComfirm": function(e, t){
    var inputCode = $("#inhCodeInput1").val() + $("#inhCodeInput2").val() + $("#inhCodeInput3").val() +$("#inhCodeInput4").val();
    Meteor.call("checkInhCodeInputMyinh",inputCode,function(err,res){
      if(err){
        console.log(err);
      }
      if(res){

        Session.set("opneToglePamamSession",false);
        Template['inheritanceFromList'].__helpers.get('hpInhCodeCallBack')();
      } else {
        alert('일치하는 상속코드가 없습니다.\n상속코드를 확인해주세요.');
      }

    });
  },
  "click #closePupup": function(e,t){
    Session.set("opneToglePamamSession",false);
  },
  "keyup input": function(e, t){
    var string = $(e.currentTarget).val().replace(/[^0-9]/gi, "");
    $(e.currentTarget).val(string);
  },
  // "keydonw input": function(e, t){
  //   console.log(e);
  // },
  // "keypress input": function(e, t){
  //   console.log(e);
  // },
  // "paste input": function(e, t){
  //   console.log(e);
  // }
});

Template.inheritanceAddRecieveinh.helpers({

  helper: function(){

  }
});

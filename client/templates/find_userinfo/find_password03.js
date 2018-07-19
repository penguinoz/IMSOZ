//새비밀번호 입력 화면
Template.findPassword03.onCreated(function(){
  var instance = this;
  instance.userId = new ReactiveVar();

});

Template.findPassword03.onRendered(function(){
  $(window).scrollTop(0);
});

Template.findPassword03.events({
  "click .back": function(e, t){
    e.preventDefault();
    var template = {
      templateName : 'findPassword02',
      header : false,
      data : t.userId.get()
    };

    Session.set("index_contentsTemplate", template);
  },
  "click #finished":function(e,t){
    e.preventDefault();
    var passNum = $("#password").val();
    var passCheck = $("#passwordCheck").val();
    //pass check
    if (!checkValid( /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,30}$/,$("#password"),"비밀번호는 영문과 숫자를 포함한 8~30자를 입력해 주세요")){
      return false;
    }
    if(passNum !== passCheck){
      // alert("비밀번호가 일치하지 않습니다.")
      // return;
      var confrimData = {
        title : '비밀번호가 일치하지 않습니다.',
        context : '',
        templateName : 'findPassword02',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    Meteor.call("userPassChange",t.data.userId, passNum, function(err,res){
      if(err){
        console.log(err);
      }else{
        // var template = {
        //   templateName : 'login',
        //   header : false,
        // };
        // alert("비밀번호 변경이 완료되었습니다.\n 다시 로그인해 주세요.");
        var confrimData = {
          title : '비밀번호 변경이 완료되었습니다.<br/> 다시 로그인해 주세요.',
          context : '',
          templateName : 'findPassword02',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        Router.go('login');
      }

    })
  },
});


function checkValid(re, tar, msg){
        if(re.test(tar.val())) return true;
        var confrimData = {
          title : msg,
          context : '',
          templateName : 'myInfo',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };
        Session.set('confrim_center', confrimData);
        // alert(msg);
        // tar.value="";
        tar.focus();
        return false;
}

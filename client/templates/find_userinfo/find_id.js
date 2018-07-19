var instance;
Template.findId.onRendered(function(){
  instance = this;
  this.phonAuthCheckComp = false
  this.userPhoneNum = "";
  this.callSMSInterval = true;
  this.authCheckData = {};
  instance.userId = new ReactiveVar();

});

Template.findId.events({
  "click .back": function(e, t){
    e.preventDefault();
    // window.history.back();
    Router.go('login',{},{replaceState: false});
  },
  "click #findIdNextPage":function(e,t){
    e.preventDefault();
    if(!t.phonAuthCheckComp){
      // alert("휴대폰 인증이 필요합니다.");
      // return;
      var confrimData = {
        title : '휴대폰 인증이 필요합니다.',
        context : '',
        templateName : 'findId',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    Meteor.call("findMyidCheck",$("#userName").val() ,$("#userPhone").val(),function(err,res){
      if(err)console.log(err);
      if(res){
        if(true){
          var template = {
            templateName : 'findId02',
            header : false,
            data : {username:res.username}
          };

          Session.set("index_contentsTemplate", template);
        }
      }else{
        var confrimData = {
          title : '일치하는 정보가 없습니다.',
          context : '',
          templateName : 'findId',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        return;
        // return alert('일치하는 정보가 없습니다.');
      };
    })
  },
  "click #checkPhoneAuth" : function(e, t){
    if(!t.callSMSInterval){
      return;
    }
    var phoneNum = $('.phone input').val()
    if (!checkValid( /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,$('.phone input'),"휴대폰 번호가 정확하지 않습니다.")){
      return false;
    }
    Meteor.call("callSMSAuth", phoneNum, true ,function(err,res){
      if(err)console.log(err);
      if(res){
        if(res === "isThere"){
          // alert("이미 등록되어있는 핸드폰 입니다.");
          // return;
          var confrimData = {
            title : '이미 등록되어 있는 휴대폰입니다..',
            context : '',
            templateName : 'findId',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return;
        }else{
          t.authCheckData = res;
          $("#phoneAuthBt").removeClass("hidden");
          sendSMSTime();
        }
      }
    });
    $("#checkPhoneAuth").css("color", "#b7b7b7");
    t.callSMSInterval = false;
    // setTimeout(function(){
    //   t.callSMSInterval = true;
    //   $("#checkPhoneAuth").css("color", "#ff6960");
    // }, 6000);


  },
  "click #phoneAuthBt" : function(e, t){
    if(!t.authCheckData){
      // alert("인증번호가 아직 발송되지 않았습니다.");
      // return;
      var confrimData = {
        title : '인증번호가 아직 발송되지 않았습니다.',
        context : '',
        templateName : 'findId',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    var checkPhoneAuthNum = $("#phoneAuthInput").val();
    var requestPhoneNum = $('.phone input').val();

    if(checkPhoneAuthNum !== t.authCheckData.authNum){
      // alert("인증번호가 올바르지 않습니다.");
      var confrimData = {
        title : '인증번호가 올바르지 않습니다.',
        context : '',
        templateName : 'findId',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      return;
    }
    if(requestPhoneNum !== t.authCheckData.phoneNum){
      // alert("인증요청한 번호가 다릅니다.");
      var confrimData = {
        title : '인증번호를 확인해 주세요.',
        context : '',
        templateName : 'findId',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      return;
    }
    if(!timeLimit){
      // alert("인증시간이 초과하였습니다.")
      var confrimData = {
        title : '인증시간이 초과하였습니다.',
        context : '',
        templateName : 'findId',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      t.callSMSInterval = true;
      $("#checkPhoneAuth").css("color", "#ff6960");
      return;
    }
    clearInterval(x);
    timeLimit = false;
    document.getElementById("phoneAuthInput").placeholder = "";
    // alert('인증 성공!');
    var confrimData = {
      title : '휴대폰 인증이 완료되었습니다.',
      context : '',
      templateName : 'findId',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    $("#phoneAuthBt").addClass("hidden");
    t.phonAuthCheckComp = true;
    //최종 입력번호와 인증번호비교 위함
    t.userPhoneNum = requestPhoneNum;

    // if(checkPhoneAuthNum === t.authCheckData.authNum && requestPhoneNum === t.authCheckData.phoneNum && timeLimit){
    //   t.phonAuthCheckComp = true;
    //   t.userPhoneNum = requestPhoneNum;
    // }else{
    //   t.phonAuthCheckComp = false;
    // }

  }
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


//////////////////////// countdown ////////////////////////////////////
var x;
var timeLimit = false;
function sendSMSTime(){

  var countDownDate = new Date().getTime() + 3*60000;
  if(x){
    clearInterval(x);
  }
  timeLimit = true;
  x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"d
    document.getElementById("phoneAuthInput").placeholder = minutes + "분 " + seconds + "초 ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        timeLimit = false;
        document.getElementById("phoneAuthInput").placeholder = "";
    }
  }, 1000);
}

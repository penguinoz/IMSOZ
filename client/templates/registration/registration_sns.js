//회원가입 > 약관동의
var templateName = "registrationSns";

var userInfo = {};
Template.registrationSns.onCreated(function(){
  var instance = this;
  this.phonAuthCheckComp = false
  this.userPhoneNum = "";
  this.callSMSInterval = true;
  instance.birthDay = new ReactiveVar();

  Meteor.call("checkSNSUserProfile",function(err,res){
    if(!res){
      console.log("not");
    }else{
      console.log("go");
      Meteor.call('checkGuide', 'guide01', Meteor.userId(), function(error, result){
        if(error){
          console.log(error);
        } else {
          global.fn_resetSession();

          if(!result){
          // if(false){
            // 1. 로그 사용여부확인
            if(global.writeLog){
              //2. 로그 생성
              Meteor.call('setLog', 'LG0050', Meteor.userId(),'GD', 'endingNote'); //가이드 시작
            }
            Router.go('guide',{num:'01'},{replaceState: true});
          } else {
            // Router.go('bucketList',{menu:'my'},{replaceState: false});
            Router.go('endingNote',{},{replaceState: true});

            //자동 로그아웃 확인용 세션
            global.selfLogout = false;
          }

        }
      });
    }
  });

  Meteor.call("getSnsInfo",function(err,res){
    if(err){
      console.log(err)
    }else{
      if(res){
        console.log(res);
        userInfo = res;
        if(res.sex === "여"){
          $('input:radio[name=sex]:input[value=여]').attr("checked", true);
        }
        $("#name").val(res.name)
        $("#nickname").val(res.nickName)
        // $("#birthDay").val(res.birthday)
        // $("#mDate").val(res.birthday)
        if(res.birthday){
          instance.birthDay.set(res.birthday);
        } else {
          instance.birthDay.set('1990-01-01');
        }
      }
    }


  })
  // if(user.services.facebook){
  //   var result = HTTP.call('GET', 'https://graph.facebook.com/v2.4/' + user.services.facebook.id,
  //   {params :{access_token: user.services.facebook.accessToken,
  //    fields:'first_name, last_name, birthday, email, gender, location, link, friends'}}
  //  );
});

Template.registrationSns.onRendered(function(){
  var height = $(window).height();
  $(".registration").height(height);
});

Template.registrationSns.helpers({
  hpBirthDay : function(){
    return Template.instance().birthDay.get();
  }
});

Template.registrationSns.events({
  "click .back": function(e, t){
    e.preventDefault();
    Router.go('login',{},{replaceState: false});
  },
  "click #registNextPage":function(e,t){
    var check1 = $("#check01").prop("checked") ;
    var check2 = $("#check02").prop("checked") ;
    var check3 = $("#check03").prop("checked") ;

    if (check1 && check2 ) {
      regData = {
        service: check1,
        privateInfo: check2,
        event: check3,
      };

      if(!$("#name").val().trim()){
        var confrimData = {
          title : '이름을 입력해 주세요.',
          context : '',
          templateName : 'registrationSns',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        return false;
      }
      if(!$("#nickname").val().trim()){
        var confrimData = {
          title : '닉네임을 입력해 주세요.',
          context : '',
          templateName : 'registrationSns',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        return false;
      }

      //phone check
      if($('.phone input').val() !== "01010101"){
        if(!t.phonAuthCheckComp){
          // alert("모바일 인증이 필요합니다!");
          var confrimData = {
            title : '모바일 인증이 필요합니다.',
            context : '',
            templateName : 'registrationSns',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return false;
        }
        if(t.userPhoneNum !== $('.phone input').val()){
          // alert("인증받은 휴대폰 번호와 다릅니다.")
          var confrimData = {
            title : '인증받은 휴대폰 번호와 다릅니다.',
            context : '',
            templateName : 'registrationSns',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return false;
        }
      }

      userInfo.sex = $(":input:radio[name=sex]:checked").val().trim();
      // userInfo.birthday = $("#birthDay").val().trim();
      userInfo.birthday = $("#mDate").val().trim();
      userInfo.mobile = $("#mobileNum").val().trim();
      userInfo.name = $("#name").val().trim();
      userInfo.nickName = $("#nickname").val().trim();
      userInfo.agreement = regData;
      var email = userInfo.email;
      var setParam = {profile:userInfo,auth:"user",username:email};
      Meteor.call("setUserProfileSNSData",setParam,function(err,res){
        if(err){
          console.log(err);
        }else{
          Router.go('endingNote',{},{replaceState: false});
        }
      })

      // var template = {
      //   templateName : 'registration',
      //   header : false,
      //   data : regData
      // };
      // Session.set("index_contentsTemplate", template);
    } else {
      // return alert('필수항목에 동의해주세요.');
      var confrimData = {
        title : '필수항목에 동의해주세요.',
        context : '',
        templateName : 'registrationSns',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
  },
  "click .box-head": function(e, t){
    if(e.target.type !== 'checkbox'){
      if($(e.currentTarget).siblings().hasClass('display-none')){
        $(e.currentTarget).siblings().removeClass('display-none');
      } else {
        $(e.currentTarget).siblings().addClass('display-none');
      }
    }
  },
  "click #checkPhoneAuth" : function(e, t){
    if(!t.callSMSInterval){
      return;
    }
    var phoneNum = $('.phone input').val();
    if (!checkValid( /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,$('.phone input'),"휴대폰 번호가 정확하지 않습니다.")){
      return false;
    }
    Meteor.call("callSMSAuth", phoneNum, true ,function(err,res){
      if(err)console.log(err);
      if(res){
        // if(res === "isThere"){
        //   // alert("이미 등록되어있는 핸드폰 입니다.");
        //   // return;
        //   var confrimData = {
        //     title : '이미 등록되어있는 휴대폰 입니다.',
        //     context : '',
        //     templateName : 'findPassword02',
        //     returnData : null,
        //     singleBtn : true,
        //     btnName : '확인'
        //   };
        //
        //   Session.set('confrim_center', confrimData);
        //   return false;
        // }else{
          t.authCheckData = res;
          $("#phoneAuthBt").removeClass("hidden");
          sendSMSTime();
        // }
      }
    });
    $("#checkPhoneAuth").css("color", "#b7b7b7");
    t.callSMSInterval = false;
    setTimeout(function(){
      t.callSMSInterval = true;
      $("#checkPhoneAuth").css("color", "#ff6960");
    }, 6000);


  },
  "click #phoneAuthBt" : function(e, t){
    if(!t.authCheckData){
      // alert("인증번호가 아직 발송되지 않았습니다.");
      var confrimData = {
        title : '인증번호가 아직 발송되지 않았습니다.',
        context : '',
        templateName : 'registrationSns',
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
        templateName : 'registrationSns',
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
        title : '인증요청한 번호가 다릅니다.',
        context : '',
        templateName : 'registrationSns',
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
        title : '인증요청 시간이 만료되었습니다.',
        context : '',
        templateName : 'registrationSns',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      return;
    }
    clearInterval(x);
    timeLimit = false;
    document.getElementById("phoneAuthInput").placeholder = "";
    // alert('인증 성공!');
    var confrimData = {
      title : '휴대전화 인증이 완료되었습니다.',
      context : '',
      templateName : 'registrationSns',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    $("#phoneAuthBt").addClass("hidden");
    t.phonAuthCheckComp = true;
    //최종 입력번호와 인증번호비교 위함
    t.userPhoneNum = requestPhoneNum;

    //???? 안쓰남?
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
/////////////////////////////////////////////////////////////////////////

import {global} from '/imports/global/global_things.js';

Template.guardianAddFin.onCreated(function(){
  var instance = this;
  instance.guardianInfo = new ReactiveVar(instance.data);
  instance.prevTemplate = instance.data.templateName;
  // instance.code = "12345647890";


  // console.log(instance.data);
  // $('.final-step').removeClass('display-none');
});

Template.guardianAddFin.events({
  "click #backSearchUser": function(e, t){
    var template = {
      templateName : t.prevTemplate,
      header : true,
    };
    Session.set("guardianAdd_selectedTemplate", template);
  },
  "click .save": function(e, t){
    e.preventDefault();

    var data = {};
    if(this._id){
      //유져
      data = {
        guardianId : this._id,
        regData : global.fn_dateFormat().HMS
      };
    } else {
      //비유져
      data = {
        name : t.data.profile.name,
        email : t.data.profile.email,
        phone : t.data.profile.phone,
        regData : global.fn_dateFormat().HMS
      };
    }

    //confirm 및 알림
    var confrimData = {
      title : '가디언 등록 확인',
      context : '가디언에게 문자, 이메일을 통해 알림을 보냅니다.<br/><br/>계속진행하시겠습니까?',
      templateName : 'guardianAddFin',
      returnData : data,
      singleBtn : false,
      btnName : ''
    };

    Session.set('confrim_center', confrimData);
  }
});

Template.guardianAddFin.helpers({
  hpInhUserInfo: function(){
    return Template.instance().guardianInfo.get();
  },
  hpConfirmCallBack :  function(_data){
    saveGuardianData(_data);
  },
  // hpInhCode : function(){
  //   return Template.instance().code;
  // }
});

function saveGuardianData(_data){
  //true 유져 false 비유져
  if(_data.guardianId){
    //유져
    Meteor.call('pushGuadianList', _data, function(err,res){
      if(err){
        console.log(err);
      }else{
        Meteor.call("getUserInfoSenderRecib", _data.guardianId, function(err,res){
          if(err)console.log(err);
          if(res){
            //메일 알림 (가디언에게)
            sendMail(res.toUser.profile.name, res.fromUser.profile.name, res.toUser.profile.email);

            // 문자서비스 주석풀고 사용가능
            var messageStr = res.toUser.profile.name+"님 \n"+res.fromUser.profile.name +" 님이 당신을 가디언으로 등록 하였습니다.\n"+res.fromUser.profile.name +"님의 죽음을 알게되면\n잇츠마이스토리에 꼭 알려주시기 바랍니다.\n 고객센터 : 02-2282-7377\n앱 다운로드 : http://m.itsmystory.com/appDown";
            Meteor.call("callSMSMessage",_data._id, res.toUser.profile.mobile, messageStr,function(err, res){
              if(err){
                console.log(err);
              }
              if(res){

              }
            });

          }
        });
        // 저장 완료 후 이동
        Router.go('guardian',{},{replaceState: false});
      }
    });
  }else{
    //비유져

    Meteor.call('nonUserPushGuadianList', _data, function(err,res){
      if(err){
        console.log(err);
      }else{
        // 저장 완료 후 이동
        if(_data.email){
          sendMail(_data.name, Meteor.user().profile.name, _data.email);
        }

        // 문자서비스 주석풀고 사용가능
        var messageStr = _data.name+"님\n"+Meteor.user().profile.name +"님이 당신을 가디언으로 등록 하였습니다.\n"+Meteor.user().profile.name +"님의 죽음을 알게되면\n잇츠마이스토리에 꼭 알려주시기 바랍니다.\n 고객센터 : 02-2282-7377\n앱 다운로드 : http://m.itsmystory.com/appDown";
        Meteor.call("callSMSMessage",'', _data.phone, messageStr,function(err, res){
          if(err){
            console.log(err);
          }
          if(res){

          }
        });
        Router.go('guardian',{},{replaceState: false});
      }
    });



    // Meteor.call('nonUserPushGuadianList', _data, function(err,res){
    //   if(err){
    //     console.log(err);
    //   }else{
    //     if(res.overLap){
    //       //true는 이미 있는 이메일 주소
    //       // alert("이미 있는 이메일주소 입니다.");
    //       // return;
    //       var confrimData = {
    //         title : '이미 있는 이메일주소 입니다.',
    //         context : '',
    //         templateName : 'guardianAddFin',
    //         returnData : null,
    //         singleBtn : true,
    //         btnName : '확인'
    //       };
    //
    //       Session.set('confrim_center', confrimData);
    //       return;
    //     } else {
    //       // 저장 완료 후 이동
    //       sendMail(_data.name, Meteor.user().profile.name, _data.email);
    //
    //       // 문자서비스 주석풀고 사용가능
    //       var messageStr = _data.name+"님\n"+Meteor.user().profile.name +"님이 당신을 가디언으로 등록 하였습니다.\n"+Meteor.user().profile.name +"님의 죽음을 알게되면\n잇츠마이스토리에 꼭 알려주시기 바랍니다.\n 고객센터 : 02-2282-7377\n앱 다운로드 : http://m.itsmystory.com/appDown";
    //       Meteor.call("callSMSMessage",'', _data.phone, messageStr,function(err, res){
    //         if(err){
    //           console.log(err);
    //         }
    //         if(res){
    //
    //         }
    //       });
    //       Router.go('guardian',{},{replaceState: false});
    //     }
    //   }
    // });
  }

  // 1. 로그 사용여부확인
  if(global.writeLog){
    //2. 로그 생성
    Meteor.call('setLog', 'LG0029', Meteor.userId(),'', ''); //가디언 등록
  }
}


function sendMail(myName, senName, toEmail){


    var context =   "<html lang='en'>\
  <head><meta charset='UTF-8'><link rel='stylesheet' type='text/css'></head>\
  <body>\
    <div style='width:730px; margin: 0px auto 0px auto; '>\
      <div class='send-email-body' style='border-top: 7px solid #ff6c5c; font-family: \"Noto Sans KR\", sans-serif; font-size: 12px; letter-spacing: -0.02em;'>\
      <div style='font-size: 25px; color: #f74f4a; margin-left: 50px; margin-top: 20; font-weight: bold;'>It's my story</div>\
      <div style='width: 70%; margin: 30px 30px 0px 0px;'>\
        <img src='https://s3.ap-northeast-2.amazonaws.com/iml-images/ims_common/blank_inheritance_img3.png' alt='' >\
        <div style='margin: 42px auto 0px auto; font-weight: 400; text-align:center; width: 730px;'>\
          <span style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>"+myName+"님</span><br>\
          <span style='font-size: 22px; line-height: 1.9em;'>"+senName+"님이 당신을 가디언으로 등록 하였습니다.</span><br> <span style='font-size: 22px; line-height: 1.9em;'>"+ senName +"님의 죽음을 알게되면  <br>잇츠마이스토리에 꼭 알려주시기 바랍니다. </span>\
          <br style='font-size: 22px; line-height: 1.9em;'>\
          <br style='font-size: 22px; line-height: 1.9em;'>\
          <span style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>고객센터</span><br>\
          <span style='font-size: 22px; line-height: 1.9em;'>02-2282-7377</span><br>\
          <br style='font-size: 22px; line-height: 1.9em;'>\
          <span style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>앱다운로드</span><br>\
          <span style='font-size: 22px; line-height: 1.9em;'>http://m.itsmystory.com/appDown</span>\
        </div>\
      </div>\
      <div class='send-email-footer' style='font-family: \"Dotum\"; background-color: #e0e5e8; margin-top: 100px;'>\
      <div class='footer-content' style='padding: 20px 40px 27px 40px;'>\
      <div class='footer-site-title' style='float: left; margin: 55px 103px 36px 48px; color: #969595;'>It's my story</div>\
      <div class='footer-site-info' style='letter-spacing: 0.04em;'>\
      <p class='footer-info-text' style='color: #707476; font-weight: bold;'>본 메일은 발신전용입니다. <br />문의사항은 support@itsmystory.com으로 보내주시기 바랍니다.</p>\
      <p class='footer-official-info' style='color: #969595;'>\
      <strong>주소</strong> : 서울시 성동구 독서당로 173 상가동 301-1호 | <strong>우편번호</strong> 14732<br /><strong>홈페이지</strong> : www.thepruits.com | <strong>전화번호</strong> : 02-2282-7377<br /><strong>고객상담</strong> : AM10 - PM06 (점심시간 PM12 - PM01)\
      </p></div></div></div></div></body></html>\
    </div>\
  </body>\
  </html>"

  // console.log(context);
  var emailSend = global.fn_sendEmail('cert', toEmail, "[It's my story] "+senName+"님의 가디언으로 등록되었습니다.", context, '');
// console.log(emailSend);
Meteor.call('sendEmail', emailSend);

}

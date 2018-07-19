import {global} from '/imports/global/global_things.js';

Template.inhAddUserFin.onCreated(function(){

  var instance = this;
  instance.inhUserInfo = new ReactiveVar(instance.data);
  instance.prevTemplate = instance.data.templateName;
});

Template.inhAddUserFin.events({
  "click #backSearchUser": function(e, t){
    var template = {
      templateName : t.prevTemplate,
      header : true,
    };
    Session.set("inhAddUser_selectedTemplate", template);
  },
  "click .save": function(e, t){
    e.preventDefault();

    var data = {};
    if(t.inhUserInfo.get()._id){
      data = {
        _id : t.inhUserInfo.get()._id
      };
    } else {
      data = {
        name : t.data.profile.name,
        email : t.data.profile.email,
        phone : t.data.profile.phone
      };
    }

    var confrimData = {
      title : '상속인 등록 확인',
      context : '상속인 및 가디언으로 자동 등록되며<br/> 상속인에게 문자,이메일을 통해 알림을 보냅니다.<br/><br/>계속진행하시겠습니까?',
      templateName : 'inhAddUserFin',
      returnData : data,
      singleBtn : false,
      btnName : ''
    };


    Session.set('confrim_center', confrimData);
    // saveInhData(t)
  },
  "click #saveInherit": function(e,t){

    // Meteor.call();
  }
});

Template.inhAddUserFin.helpers({
  hpInhUserInfo: function(){
    return Template.instance().inhUserInfo.get();
  },
  hpConfirmCallBack :  function(_data){
    saveInhData(_data);
  },
});



//상속저장 유져 비유져 포
function saveInhData(_data){
  Meteor.call('setPoint', 'PO0006', Meteor.userId(), 'use', 'IH','DEFAULT', _data._id);
  var insertParam = {
    // inheriterId : t.inhUserInfo.get()._id,

    inheriterId : _data._id,
    // inheritCode : t.code,
    relation : $("#inhRelationInput").val(),
    message : $("#inhMessage").val(),
    secret : true,//$('#isSecret').is(":checked"),
    bookService : $('#bookService').is(":checked"),
    regDate : global.fn_dateFormat().HMS
  };
  //유저 비유저 분기점
  // var tmpData = t.inhUserInfo.get()
  var inheritCode = "";

  if(_data._id){
    //유져

    Meteor.call("pushInheriterList",insertParam,function(err,res){
      if(err){
        console.log(err);
      }else{
        //내 기존 등록된 가디언인지 확인
        inheritCode = global.fn_makeCodeFormate(res);
        Meteor.call("getUserInfoSenderRecib", _data._id, function(err,res){
          if(err)console.log(err);
          if(res){
            //메일 알림 (상속인에게)
            sendMail(res.toUser.profile.name, insertParam.relation, res.fromUser.profile.name, inheritCode, res.toUser.profile.email);

            // 상속 문자 서비스
            var messageStr = res.toUser.profile.name+"님\n"+insertParam.relation+" "+res.fromUser.profile.name +"님이 당신을 상속인으로 등록 하였습니다. \n잇츠마이스토리에 회원 가입 후 상속 > 니가 그리워 메뉴에서 상속코드를 입력하면 내용을 확인 할 수 있습니다.\n상속코드 : "+inheritCode+"\n앱 다운로드 : http://m.itsmystory.com/appDown";
            Meteor.call("callSMSMessage",_data._id, res.toUser.profile.mobile, messageStr,function(err, res){
              if(err){
                console.log(err);
              }
              if(res){

              }
            });
          }
        });

        //가디언에도 추가시킴
        Meteor.call("getGuardianIds",Meteor.userId(),function(err,res){
          if(err){
            console.log(err);
          }
          if(res){
            //가디언이 아니면
            if(res.indexOf(_data._id) === -1){
              var guardianData =
              {
                guardianId:_data._id,
                regData:global.fn_dateFormat().HMS
              }
              Meteor.call('pushGuadianList',guardianData,function(err,res){
                if(err){
                  console.log(err);
                }else{
                  //가디언 등록 알림
                  Meteor.call("getUserInfoSenderRecib", guardianData.guardianId, function(err,res){
                    if(err)console.log(err);
                    if(res){
                      //가디언 메일 문자서비스
                      sendMailGuardian(res.toUser.profile.name, res.fromUser.profile.name, res.toUser.profile.email);

                      // 가디언 문자 서비스
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
                }
              });
            }
          }
        });

        Router.go(Session.get('navData').prevTemplate,{},{replaceState: false});
      }
    } );

    // 저장 완료 후 이동
  }else{
    //비유져
    insertParam.name = _data.name;
    insertParam.email = _data.email;
    insertParam.phone = _data.phone;

    _data.inhCode = insertParam.inheritCode;
    _data.relation = insertParam.relation;

    Meteor.call("nonUserAddInheriter",insertParam,function(err,res){
      if(err){
        console.log(err);
      }else{
        var inhCodeNuser = global.fn_makeCodeFormate(res);
        if(_data.email){
          //상속인 등록 메일
          sendMail(_data.name, _data.relation, Meteor.user().profile.name, inhCodeNuser, _data.email);

        }

        // 상속인 문자서비스
        var messageStr = _data.name+"님\n"+insertParam.relation+" "+Meteor.user().profile.name +"님이 당신을 상속인으로 등록 하였습니다. \n잇츠마이스토리에 회원 가입 후 상속 > 니가 그리워 메뉴에서 상속코드를 입력하면 내용을 확인 할 수 있습니다.\n상속코드 : "+inhCodeNuser+"\n앱 다운로드 : http://m.itsmystory.com/appDown";
        //주석풀고 사용가능
        Meteor.call("callSMSMessage", '', _data.phone, messageStr,function(err, res){
          if(err){
            console.log(err);
          }
          if(res){

          }
        });

        //가디언 추가
        Meteor.call('nonUserPushGuadianList', _data, function(err,res){
          if(err){
            console.log(err);
          }else{
            //가디언 등록 메일
            sendMailGuardian(_data.name, Meteor.user().profile.name, _data.email);

            //가디언 문자 서비스
            messageStr = _data.name+"님\n"+Meteor.user().profile.name +"님이 당신을 가디언으로 등록 하였습니다.\n"+Meteor.user().profile.name +"님의 죽음을 알게되면\n잇츠마이스토리에 꼭 알려주시기 바랍니다.\n 고객센터 : 02-2282-7377\n앱 다운로드 : http://m.itsmystory.com/appDown";
            Meteor.call("callSMSMessage",'', _data.phone, messageStr,function(err, res){
              if(err){
                console.log(err);
              }
              if(res){

              }
            });
          }
        });



        Router.go(Session.get('navData').prevTemplate,{},{replaceState: false});
      }
    } );
  }


  // 1. 로그 사용여부확인
  if(global.writeLog){
    //2. 로그 생성
    Meteor.call('setLog', 'LG0027', Meteor.userId(),'', ''); //상속인등록 (_data._id있으면 회원 없으면 비회원)
    //2. 로그 생성
    Meteor.call('setLog', 'LG0029', Meteor.userId(),'', ''); //가디언 등록
  }
}



function sendMail(myName, relation, senName, inheritCode, toEmail){


    var context = "<html lang='en'>\
    <head><meta charset='UTF-8'><link rel='stylesheet' type='text/css'></head>\
    <body>\
      <div style='width:730px; margin: 0px auto 0px auto; '>\
      <div class='send-email-body' style='border-top: 7px solid #ff6c5c; font-family: \"Noto Sans KR\", sans-serif; font-size: 12px; letter-spacing: -0.02em;'>\
        <div style='font-size: 25px; color: #f74f4a; margin-left: 50px; margin-top: 20; font-weight: bold;'>It's my story</div>\
        <div style='width: 70%; margin: 30px 30px 0px 0px;'>\
          <img src='https://s3.ap-northeast-2.amazonaws.com/iml-images/ims_common/blank_inheritance_img2.png' alt='' >\
          <div style='margin: 42px auto 0px auto; font-weight: 400; text-align:center; width: 730px;'>\
            <span style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>"+ myName +"님</span><br>\
            <span style='font-size: 22px; line-height: 1.9em;'>"+relation+" "+ senName +"님이 당신을 상속인으로 등록 하였습니다.</span><br> <span style='font-size: 22px; line-height: 1.9em;'>잇츠마이스토리에 <span style='color:#82a071;'>회원 가입</span> 후 </span><br> <span style='color:#82a071; font-size: 22px; line-height: 1.9em;'>상속>니가 그리워 메뉴에서 상속코드를 입력하시면<br> 내용을 확인 할 수 있습니다.</span>\
            <br style='font-size: 22px; line-height: 1.9em;'>\
            <br style='font-size: 22px; line-height: 1.9em;'>\
            <span style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>상속코드</span><br>\
            <span style='font-size: 22px; line-height: 1.9em;'>"+inheritCode+"</span><br>\
            <br style='font-size: 22px; line-height: 1.9em;'>\
            <sapan style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>앱다운로드</sapan><br>\
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
        </p></div></div></div></div></body></html>';\
      </div>\
    </body>\
    </html>";

  // console.log(context);
  var emailSend = global.fn_sendEmail('cert', toEmail, "[It's my story] "+senName+"님이 상속한 내용이 있습니다.", context, '');
// console.log(emailSend);
Meteor.call('sendEmail', emailSend);

}



function sendMailGuardian(myName, senName, toEmail){
  var context =   "<html lang='en'>\
  <head><meta charset='UTF-8'><link rel='stylesheet' type='text/css'></head>\
  <body>\
    <div style='width:730px; margin: 0px auto 0px auto; '>\
      <div class='send-email-body' style='border-top: 7px solid #ff6c5c; font-family: \"Noto Sans KR\", sans-serif; font-size: 12px; letter-spacing: -0.02em;'>\
      <div style='font-size: 25px; color: #f74f4a; margin-left: 50px; margin-top: 20; font-weight: bold;'>It's my story</div>\
      <div style='width: 70%; margin: 30px 30px 0px 0px;'>\
        <img src='https://s3.ap-northeast-2.amazonaws.com/iml-images/ims_common/blank_inheritance_img3.png' alt='' >\
        <br style='font-size: 22px; line-height: 1.9em;'>\
        <br style='font-size: 22px; line-height: 1.9em;'>\
        <div style='margin: 42px auto 0px auto; font-weight: 400; text-align:center; width: 730px;'>\
          <span style='font-size: 22px; line-height: 1.9em; color: #f0ad67;'>"+myName+"님</span><br>\
          <span style='font-size: 22px; line-height: 1.9em;'>"+senName+"님이 당신을 가디언으로 등록 하였습니다.</span><br> <span style='font-size: 22px; line-height: 1.9em;'>"+ senName +" 님의 죽음을 알게되면  <br>잇츠마이스토리에 꼭 알려주시기 바랍니다. </span>\
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

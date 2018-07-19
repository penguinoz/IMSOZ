//초대하기
import {global} from '/imports/global/global_things.js';
export default function export_email_invitation(_data) {

var htmlContext = "<!doctype html> \
<html lang='en'><head><meta charset='UTF-8'><link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/earlyaccess/notosanskr.css'></head> \
<body> \
<div class='container' style='background-color: #eaeff2; width: 730px; font-family: \"Noto Sans KR\", sans-serif; font-size: 12px; color: #000000; margin-left:auto; margin-right:auto;'> \
<div class='send-email-body' style='border-top: 7px solid #ff6c5c; letter-spacing: -0.02em;'> \
<div class='title' style='text-align: center; font-size: 32px; font-weight: bold; color: #1f1f1f; line-height: 2.4em; margin-top: 82px;'>Invitation!</div> \
<div class='context' style='text-align: center; font-size: 24px; color: #3f3f3f; line-height: 1.9em; font-weight: 300;'> \
안녕하세요, <span class='username' style='font-weight: bold; color: #4bbc75;'> "+_data.receiverName+"님</span> It's my story로 인생을 긍정적으로<br/> 변화해가고 있는 "+_data.senderName+"님께서 초대장을 보내셨어요.</div> \
<div class='info-box' style='background-color: #ffffff; text-align: center; margin: 26px 72px 104px; line-height: 2.3em; border-radius: 4px;'> \
<img src='" + global.s3.bucketPath + "ims_common/img_invite.png' alt='' style='width: 198px; margin: 2px 0px 0px 0px;'> \
<div class='subtitle' style='font-weight: bold; font-size: 24px; color: #3f3f3f; margin: 0px 0px 17px 0px;'>초대 메시지</div> \
<div class='subcontext' style='color: #b5b5b5;width: 388px;margin: 0px auto;text-align:left;'> \
<div style='font-weight:500; color:#3f3f3f; margin:9px 0;'>To. "+_data.receiverName+"</div><div><span style='font-weight:500; color:#3f3f3f;'>"+_data.title+"</span><br/>" + _data.message + "</div></div> \
<div class='button-container' style='margin-left: auto; margin-right: auto; padding-top: 21px; padding-bottom: 71px; width: 394px;'> \
<div class='button1' style='width: 195px; background-color: #ff6c5c; font-size: 13px; border-radius: 3px; padding: 5px 0px; float:left;'> \
<a href='"+global.siteUrl+"' target='_blank' style='color: #ffffff; text-decoration: unset;'>로그인 하기</a> \
</div> \
<div class='button2' style='margin-left: auto; width: 195px; background-color: #82b63a; font-size: 13px; border-radius: 3px; padding: 5px 0px;'> \
<a href='"+global.siteUrl+"' target='_blank' style='color: #ffffff; text-decoration: unset;'>회원가입 하기</a> \
</div></div></div></div> \
<div class='send-email-footer' style='font-family: \"Dotum\"; background-color: #e0e5e8;'> \
<div class='footer-content' style='padding: 20px 40px 27px 40px;'> \
<div class='footer-site-title' style='float: left; margin: 52px 103px 36px 48px; color: #828282; font-weight: bold; font-size: 14px;'>It's my story</div> \
<div class='footer-site-info' style='letter-spacing: 0.04em;'> \
<p class='footer-info-text' style='color: #707476; font-weight: bold;'>본 메일은 발신전용입니다. <br />문의사항은 support@itsmystory.com으로 보내주시기 바랍니다.</p> \
<p class='footer-official-info' style='color: #969595;'><strong>주소</strong> : 서울시 성동구 독서당로 173 상가동 301-1호 | <strong>우편번호</strong> 14732<br /><strong>홈페이지</strong> : www.thepruits.com | <strong>전화번호</strong> : 02-2282-7377<br /><strong>고객상담</strong> : AM10 - PM06 (점심시간 PM12 - PM01) \
</p></div></div></div></div></body></html>";

return htmlContext;
}

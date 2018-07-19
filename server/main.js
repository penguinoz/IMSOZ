// import { Meteor } from 'meteor/meteor';
import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import export_email_time_capsule from '/imports/email_template/email_time_capsule.js';

Meteor.startup(() => {

  // code to run on server at startup
  if(!Meteor.settings.public.serverType){
    // console.log('check a start option');
    throw new Meteor.Error('check a start option', 'check a start option');
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  Meteor.call('getCodeOption',function(error, result){
    if(error){
      return;
    } else {
      process.env.MAIL_URL = result.smtpServerInfo;
    }
  }); //서버쪽 codeConfig설정

  ServiceConfiguration.configurations.remove({
      service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
      service: "facebook",
      appId: '413975455749458',
      secret: '411abf03d4d6c35218d958363071ef7a',
      loginStyle: "redirect",
  });

  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "108123250282-ngm1lenvsa6mgpn5heufln6h7l2g5eg4.apps.googleusercontent.com",
    loginStyle: "redirect",
    secret: "nRDED48kjLyYkx4jEJX8G9V2"
  });


  ServiceConfiguration.configurations.remove({
    service: "kakao"
  });
  ServiceConfiguration.configurations.insert({
    service: "kakao",
    clientId: "0339469866b7ad4abb3a491fa972ac03",
    // secret: "812X6RPzmWhhpDRuzqt1dbzO0MUStDAj"
    loginStyle: "redirect",

  });

  Accounts.validateNewUser((user) => {
    if (!user.services.facebook || !user.profile) {
      return true;
    } else {
      throw new Meteor.Error(403, 'Username must have at least 3 characters');
    }
  });

  Accounts.onCreateUser(function (options, user) {
      if (!user.services.facebook) {
          return user;
      }

      if(user.services.facebook){
        var result = HTTP.call('GET', 'https://graph.facebook.com/v2.4/' + user.services.facebook.id,
        {params :{access_token: user.services.facebook.accessToken,
         fields:'first_name, last_name, birthday, email, gender, location, link, friends'}}
       );

        var usernameparam =user.services.facebook.email;
        // user.username = usernameparam;
        user.auth = "user";
        // user.username = [{address: user.services.facebook.email}];
        // var profileData = {
        //   name: result.data.first_name+result.data.last_name,
        //   nickName:"",
        //   sex: (result.data.gender === 'male') ? '남':'여',
        //   birthday: new Date(result.data.birthday).format('yyyy-MM-dd'),
        //   email: user.services.facebook.email,
        //   mobile:"",
        //   joinRoute:"",
        //   introduction:result.data.first_name+result.data.last_name+"의 엔딩노트입니다.",
        //   declareDeath:[],
        //   agreement:{service:true,privateInfo:true,event:false},
        //   isPassAway:false,
        //   question:{
        //     qCode:(result.data.gender === 'male')?'TQ0006':'TQ0014',
        //     regDate:new Date().format('yyyy-MM-dd')
        //   }
        // }
        // user.profile = profileData;
        // user.auth = "user";
        // user.guide = [{complete:true,type:"guide01"}];
      }
      if(user.services.google){
        console.log(JSON.stringify(user.google.google));
        var usernameparam =user.services.google.email;
        user.username = usernameparam;
        // user.username = [{address: user.services.facebook.email}];
        user.profile = [{email: user.services.google.email}];
      }
      if(user.services.kakao){
        // var usernameparam =user.services.kakao.email;
        user.auth = "user";
        // user.username = usernameparam;
        // user.username = [{address: user.services.facebook.email}];
        // user.profile = [{email: user.services.google.email}];
      }


      return user;
  });
});

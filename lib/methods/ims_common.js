import {global} from '/imports/global/global_things.js';
import {collections as CLT} from '/imports/global/collections.js';

Meteor.methods({
  loginWithoutPass : function(){
    ///////////////////////////////  필요없으면 삭제 //////////////////////////
    // if(Meteor.isServer){
    //   var fmUser = Meteor.user();
    //   console.log(Meteor.user());
    //   if (fmUser.hasOwnProperty('services') && fmUser.services.hasOwnProperty('facebook')  ) {
    //
    //     HTTP.get( 'https://graph.facebook.com/v2.4/' + fmUser.services.facebook.id + '?access_token=' + fmUser.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends', { /* options */ }, function(err, res) {console.log(err);console.log(res);} );



          // var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + user.services.facebook.id + '?access_token=' + user.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');

          // console.log(result.data.first_name);
          // console.log(result.data.last_name);
          // console.log(result.data.birthday);
          // console.log(result.data.email);
          // console.log(result.data.gender);
          // console.log(result.data.location);
          // console.log(result.data.link);
          // console.log(result.data.friends);
    //     }
    // }
    /////////////////////////////// 필요없으면 삭제 둥 ///////////////////////
  },

  isAdmin : function(_userId){
    if(Meteor.isServer){
      var userInfo = Meteor.users.find({_id:_userId}).fetch()[0];
      if(userInfo && userInfo.auth === 'admin'){
        return true;
      } else {
        return false;
      }
    }
  },
  //sns 유져정보 가져오기 (소셜로그인)
  getSnsInfo : function(){
    var userService = Meteor.users.findOne({_id : Meteor.userId()},{fields:{services:1}});
    console.log(userService);
    var result = {};
    if(userService && userService.services){
      //facebook
      if(userService.services.facebook){
        var resParam = HTTP.call('GET', 'https://graph.facebook.com/v2.4/' + userService.services.facebook.id,
        {params :{access_token: userService.services.facebook.accessToken,
         fields:'first_name, last_name, birthday, email, gender'}}
       );
       result = {
         name: resParam.data.first_name+resParam.data.last_name,
         nickName: resParam.data.first_name+resParam.data.last_name,
         sex: (resParam.data.gender === 'male') ? '남':'여',
         birthday: new Date(resParam.data.birthday).format('yyyy-MM-dd'),
         email: resParam.data.email,
         mobile:"",
         joinRoute:"",
         introduction:resParam.data.first_name+resParam.data.last_name+"의 엔딩노트입니다.",
         declareDeath:[],
         agreement:{service:true,privateInfo:true,event:false},
         isPassAway:false,
         question:{
           qCode:(resParam.data.gender === 'male')?'TQ0006':'TQ0014',
           regDate:new Date().format('yyyy-MM-dd')
         }
       }
     }

     //kakao login 이용시
     if(userService.services.kakao){

       var resParam = HTTP.call('GET',"https://kapi.kakao.com/v2/user/me",
       {
         headers:{
           'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
           'Authorization': 'Bearer ' + userService.services.kakao.accessToken,
         }
       })

       result = {
         name: resParam.data.properties.nickname,
         nickName:resParam.data.properties.nickname,
         sex: (resParam.data.kakao_account.gender === 'male') ? '남':'여',
         // birthday: new Date().format('yyyy-MM-dd'),
         birthday: new Date('1991-01-01').format('yyyy-MM-dd'),
         email: resParam.data.kakao_account.email,
         mobile:"",
         joinRoute:"",
         introduction:resParam.data.properties.nickname+"의 엔딩노트입니다.",
         declareDeath:[],
         agreement:{service:true,privateInfo:true,event:false},
         isPassAway:false,
         question:{
           qCode:(resParam.data.kakao_account.gender === 'male')?'TQ0006':'TQ0014',
           regDate:new Date().format('yyyy-MM-dd')
         }
       }

     }

    }
    return result;
  },

  callSMSAuth : function(phoneNum, bypass){
    if(Meteor.isServer){
      //phone 있나 없나??
      var isThere = Meteor.users.findOne({"profile.mobile":phoneNum});
      //무조건 발송할시
      if(bypass){
        isThere = false;
      }
      // console.log(isThere);
      if(isThere){
        return "isThere";
      }
      var auth_key = "dZoFJgrwnW4dW41G4hpP";
      var secret_key = "cd988bf619dc48b9be27db64f3104cec";
      var authNum = "";
      for(var i=0 ; i < 6 ; i++){
        var inhCode = Math.floor(Math.random()*1000000)+"";
        var leng = inhCode.length;
        for(var j=0 ; j<6-leng ; j++ ){
          inhCode = "0"+inhCode;
        }
        authNum = inhCode;
      }
      // console.log("authNum  "+authNum);
      HTTP.call('POST',"https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:253361462155:ims_sms/messages",
      { data: {
        "type": "sms",
        "from": "0222827377",
        "to": [phoneNum],
        "content": " 인증번호는 [" + authNum + "] 입니다.  - it's my story -"
      },
      npmRequestOptions: {
        encoding: 'utf8'
      },
      headers:{
        'Content-Type': 'application/json',
        "X-NCP-auth-key": auth_key,
        "X-NCP-service-secret": secret_key
      }
    },
    function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        // console.log( response );
        if(response.statusCode === 202){

        }

      }
    });
    var resParam = {
      phoneNum :phoneNum,
      authNum : authNum
    }

    return resParam;
  }
},

callSMSMessage : function(userId, phoneNum, message){
  if(Meteor.isServer){
    //phone 있나 없나??
    // var phoneNum = Meteor.users.findOne({"_id":userId},{fields:{profile:1}}).profile.phone;
    var auth_key = "dZoFJgrwnW4dW41G4hpP";
    var secret_key = "cd988bf619dc48b9be27db64f3104cec";

    // console.log("authNum  "+authNum);
    HTTP.call('POST',"https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:253361462155:ims_sms/messages",
    { data: {
      "type": "lms",
      "from": "0222827377",
      "to": [phoneNum],
      "content": message
    },
    npmRequestOptions: {
      encoding: 'utf8'
    },
    headers:{
      'Content-Type': 'application/json',
      "X-NCP-auth-key": auth_key,
      "X-NCP-service-secret": secret_key
    }
  },
  function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      // console.log( response );
      if(response.statusCode === 202){

      }
      // console.log(response);
    }
  });

  // ret?urn resParam;
}
},

sendAllUserSMSMessage : function(){
  if(Meteor.isServer){
    //phone 있나 없나??
    // var phoneNum = Meteor.users.findOne({"_id":userId},{fields:{profile:1}}).profile.phone;
    var auth_key = "dZoFJgrwnW4dW41G4hpP";
    var secret_key = "cd988bf619dc48b9be27db64f3104cec";
    var phoneNum = [];
    var test = Meteor.users.find({},{fields:{"profile.mobile":1}}).fetch();
    var arrayPa = [];

    for(var i = 0 ; i < test.length ; i++){
      if(test[i] && test[i].profile && test[i].profile.mobile){
        // console.log(i);
        // console.log(test.length);
        // console.log(test.length-2);
        arrayPa.push(test[i].profile.mobile);
        if(arrayPa.length === 45 || i === test.length-2 ){
          arrayPa.push('01091321329');
          phoneNum.push(arrayPa)
          arrayPa = [];
        }
      }
    }

    // phoneNum.forEach(function(pa){
    //   console.log("test");
    //   console.log(pa);
    //   HTTP.call('POST',"https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:253361462155:ims_sms/messages",
    //   { data: {
    //     "type": "lms",
    //     "from": "0222827377",
    //     "to": pa,
    //     "content": "잇츠마이스토리 가족 여러분, 안녕하세요. \n정식 오픈한지 한달동안 성원해주신 가족분들의 의견을 반영하여, 서비스 가이드를 추가하고 기능을 일부 변경하였습니다. \n많이 이용하시고 의견 부탁드립니다. \n고맙습니다. \n\n앱다운로드:\nhttp://m.itsmystory.com/appDown"
    //   },
    //   npmRequestOptions: {
    //     encoding: 'utf8'
    //   },
    //   headers:{
    //     'Content-Type': 'application/json',
    //     "X-NCP-auth-key": auth_key,
    //     "X-NCP-service-secret": secret_key
    //   }
    // },
    // function( error, response ) {
    //   if ( error ) {
    //     console.log( error );
    //   } else {
    //     // console.log( response );
    //     if(response.statusCode === 202){
    //
    //     }
    //     // console.log(response);
    //   }
    // });
    // });
}
},

userPassChange:function(userId,newPass){
  if(Meteor.isServer){
    Accounts.setPassword(userId,newPass);
  }
},

getProfileData:function(_userId){
  var result = {};

  if(Meteor.isServer){
    result = global.fn_getUserCommonInfo(_userId);
  }
  return result;
},

getCodeOption: function() {
  if(Meteor.isServer){
    var res = CLT.ImsCodeOption.findOne({});
    Object.keys(res).map(function(key,index){
      global[key] = res[key];
    });
    return global;
  }
},
joinUserInfo: function(user){
  var isUsedId = Meteor.users.find({username:user}).fetch().length;
  return isUsedId;
  // Validate username, sending a specific error message on failure.
  // Accounts.validateNewUser((user) => {
  //   if (user && user.length >= 4 && user.length <=12) {
  //     console.log("check");
  //     return true;
  //   } else {
  //     throw new Meteor.Error(403, 'Username must have at least 3 characters');
  //   }
  // });
},
//회원가입유저 저장
registUserData : function(regData){
  console.log(regData);
  var creId = Accounts.createUser(regData);
  if(creId){

    regData.auth
    regData.profile

    Meteor.users.update(
      {_id:creId},
      {$set:{'profile':regData.profile,'auth':regData.auth}}
    );

    //친구컬랙셕 생성
    var regRelaData = {
      userId:creId,
      accept:[],
      request:[],
      receive:[],
      regData:global.fn_dateFormat().HMS
    };
    CLT.ImsUserRelation.insert(regRelaData);
    //상속컬랙션 생성
    var useridParam = creId;
    var constrObj =
    {
      userId : useridParam,
      acceptInh : [],
      sendInh : [],
      regDate : global.fn_dateFormat().HMS
    };
    CLT.Inh.insert(constrObj);
  }
  console.log(creId);
  return creId;
},


getCommentByContentId : function(_contentIds){
  var commentsData = CLT.ImsComment.find({'contentId': {$in:_contentIds}},{sort: {regDate: -1}}).fetch();

  _.map(commentsData, function(item){
    var userInfo = global.fn_getUserCommonInfo(item.userId);

    item.userId = userInfo.userId;
    item.userName = userInfo.name;
    item.nickName = userInfo.nickName;
    item.profileImg =  userInfo.profileImg;
    item.regDate = global.fn_getDateNewType(item.regDate);
  });

  return commentsData;
},
//코멘트 등록, 수정
upsertComment : function(_id, _obj){
  return CLT.ImsComment.upsert(
    {'_id': _id},
    {$set: _obj,
      $setOnInsert: {'regDate': global.fn_dateFormat().HMS}
    }
  );
},
//코멘트 삭제
removeComment : function(_commentId){
  CLT.ImsComment.remove({_id: _commentId});
},

//좋아요 데이터 수집
getLikeByContentId : function(_contentIds){
  if(typeof _contentIds === "string" ){
    _contentIds = [_contentIds];
  }
  return CLT.ImsLike.find({'contentId': {$in:_contentIds} }).fetch();
},
//좋아요 한 데이터 수집
getMyLikeContentList : function(_userId){
  return CLT.ImsLike.find({userId:_userId}).fetch();
},
//좋아요 등록
insertLike : function( _obj){
  CLT.ImsLike.insert(_obj);
},
//좋아요 삭제
removeLike : function(_obj){
  CLT.ImsLike.remove(
    {
      contentId:_obj.contentId,
      userId: _obj.userId
    }
  );
},
//test only 테스트용임 삭제할거임 (관계테이블 없는 사람 생성)
relationTableUpdate :function(){
  if(Meteor.isServer){
    var inserParam = [];
    var relTable = CLT.ImsUserRelation.find({}).fetch();
    var ninParam = [];
    relTable.forEach(function(val){
      ninParam.push(val.userId);
    });
    var userIds = Meteor.users.find({_id:{$nin:ninParam}},{fields:{_id:1}}).fetch();
    userIds.forEach(function(val){
      var regRelaData = {
        userId:val._id,
        accept:[],
        request:[],
        receive:[],
        regData:global.fn_dateFormat().HMS
      };
      CLT.ImsUserRelation.insert(regRelaData);
    });
  }

},
////////////////////////////////////////
//유져정보 가져오기 상태에 따라 true false
//options search target ex)"username", "name" , null
//userIds user's _id ex) [Fnlsf34jfn,FJDdslnfes43....]
findUserList : function(searchWord, option, userIds){
  if(Meteor.isServer){
    var findobj = {};
    var checkUsers = [];
    if(userIds && userIds.length){
      for(var i=0 ; i < userIds.length ; i++){
        checkUsers.push({$eq:["$_id",userIds[i]]});
      }
    }
    if(!searchWord){
      return [];
    }
    // if(option == "username"){
    // }
    findobj = {$and:[{$or:[
      {'username' :{$regex:".*"+ searchWord +".*"}},
      {'profile.name' :{$regex:".*"+ searchWord +".*"} }
    ]},
    {_id:{$ne:Meteor.userId()}}
  ]};

  var rawUsers = Meteor.users.rawCollection();
  var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
  var pipeline = [
    {$match: findobj},
    {$project: {
      username:1,
      profile:1,
      type:{
        $cond:{ if: {$or:checkUsers},then:true, else:false}
      }
    }
  },
];
var result = aggregateQuery(pipeline);

return result;
}

},
//그지같은 미티어구조때문에 들어간 소스
findFriendUserList : function(searchWord, option, userIds){
  if(Meteor.isServer){
    var fListObj = CLT.ImsUserRelation.find({userId:Meteor.userId()}).fetch()[0].accept;
    var fListArr = [];
    if(fListObj){
      fListObj.forEach(function(val){
        fListArr.push({$eq:["$_id",val.userId]});
      });
    }

    var fResListObj = CLT.ImsUserRelation.find({userId:Meteor.userId()}).fetch()[0].receive;
    var fResListArr = [];
    if(fResListObj){
      fResListObj.forEach(function(val){
        fResListArr.push({$eq:["$_id",val.userId]});
      });
    }


    var findobj = {};
    var checkUsers = [];
    if(userIds && userIds.length){
      for(var i=0 ; i < userIds.length ; i++){
        checkUsers.push({$eq:["$_id",userIds[i]]});
      }
    }
    if(!searchWord){
      return [];
    }
    // if(option == "username"){
    // }
    findobj = {$and:[{$or:[
        // {'username' :{$regex:".*"+ searchWord +".*"}},
        {'profile.name' :{$regex:".*"+ searchWord +".*"} },
        {'profile.nickName' :{$regex:".*"+ searchWord +".*"} }
      ]},
      {_id:{$ne:Meteor.userId()}}
    ]};

    var rawUsers = Meteor.users.rawCollection();
    var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
    var pipeline = [
      {$match: findobj},
      {$project: {
        username:1,
        profile:1,
        type:{
          $cond:{ if: {$or:checkUsers},then:true, else:false}
        },
        myFrien:{
          $cond:{ if: {$or:fListArr},then:true, else:false}
        },
        responMe:{
          $cond:{ if: {$or:fResListArr},then:true, else:false}
        }
      }
    },
  ];
  var result = aggregateQuery(pipeline);

  return result;
}

},
//검색을 통해서 내 친구정보만 가져옴(검색어 없으면 모든 친구 가져옴)
getSearchMyFriends:function(_userId, _searchString){
  var result = [];
  if(Meteor.isServer){

    var myFriendsIds = _.pluck(CLT.ImsUserRelation.find({userId:_userId}).fetch()[0].accept, 'userId');
    var searchOption = {
      $and:[
        {$or:[
          // {'username' :{$regex:".*"+ _searchString +".*"}},
          {'profile.name' :{$regex:".*"+ _searchString +".*"}},
          {'profile.nickName' :{$regex:".*"+ _searchString +".*"}}
        ]},
        {_id:{$in:myFriendsIds}}
      ]
    };

    result = Meteor.users.find(searchOption,{fields:{_id:1, username:1, 'profile.profileImg':1, 'profile.name':1, 'profile.nickName':1}}).fetch();
  }
  return result;
},
//유저정보들 _id 로 가져오기
getUserInfoByUid : function(_userIds){
  var userIds = _userIds;

  if(!_.isArray(_userIds)){
    userIds = [_userIds];
  }

  return Meteor.users.find(
    {_id:{$in:userIds}},
    {fields:{profile:1,username:1}}
  ).fetch();
},
//유져 정보 가져오기 kakao, facebook
getUserInfoByUidSocialData : function(_userId){
  if(Meteor.isServer){
    var socialData = {};
    socialData = Meteor.users.findOne(
      {_id:_userId},
      {fields:{profile:1,username:1}}
    );
    var servicesFrom = Meteor.users.findOne(
      {_id:_userId},
      {fields:{services:1}}
    );
    if(servicesFrom && (servicesFrom.services.kakao !== undefined || servicesFrom.services.facebook !== undefined)){
      socialData.isSocialServices = true;
    }else{
      socialData.isSocialServices = false;
    }
    return socialData;
  }
},

getUserInfoSenderRecib : function(receiver){
  var recievUser =
  Meteor.users.find(
    {_id:receiver},
    {fields:{profile:1,username:1}}
  ).fetch()[0];
  var sendUser =
  Meteor.users.find(
    {_id:Meteor.userId()},
    {fields:{profile:1,username:1}}
  ).fetch()[0];
  var resData = {
    toUser : recievUser,
    fromUser : sendUser
  }
  return resData;
},

//유져정보 수정 (개인)
// ex) [{프로필의 컬럼명 : value},{프로필의 컬럼명 : value},{password: value}]
editUserProfile : function(changeObj){
  if(Meteor.isServer){
    var userProfile = Meteor.users.findOne({_id:Meteor.userId()},{fields:{profile:1}}).profile;
    Object.keys(changeObj).forEach(function(key) {
      if(key === 'password'){
        Accounts.setPassword(Meteor.userId(),changeObj[key]);
      }else{
        userProfile[key] = changeObj[key];
      }

    });
    Meteor.users.update(
      {_id:Meteor.userId()},
      {$set:{'profile':userProfile}}
    );
  }
},

//친구요청 취소
delRelationReqFrien : function(frienId){
  if(Meteor.isServer){
    CLT.ImsUserRelation.update(
      {userId:Meteor.userId()},
      {$pull:{request:{userId:frienId}}}
    );
    CLT.ImsUserRelation.update(
      {userId:frienId},
      {$pull:{receive:{userId:Meteor.userId()}}}
    );
  }
},

//친구 요청
addRelationFrien : function(frienId){
  if(Meteor.isServer){
    var isTherereq = CLT.ImsUserRelation.findOne({$and:[{userId:Meteor.userId()},{'request.userId':frienId}]});
    if(!isTherereq){
      CLT.ImsUserRelation.update(
        {userId:Meteor.userId()},
        {$push:{request:{
          userId:frienId,
          regDate:global.fn_dateFormat().HMS
        }}}
      );
    }

    var isThereres = CLT.ImsUserRelation.findOne({$and:[{userId:frienId},{'receive.userId':Meteor.userId()}]});
    if(!isThereres){
      CLT.ImsUserRelation.update(
        {userId:frienId},
        {$push:{receive:{
          userId:Meteor.userId(),
          regDate:global.fn_dateFormat().HMS
        }}}
      );
    }
  }

},

//내가 요청한친구 검색
findRecFrienList : function(userId){
  if(Meteor.isServer){
    if(CLT.ImsUserRelation.findOne({userId:userId})){
      return CLT.ImsUserRelation.findOne({userId:userId}).request;
    }else{
      return [];
    }
  }

},

//승락한 친구 검색
getMyFriends : function(userId){
  if(Meteor.isServer){
    if(CLT.ImsUserRelation.findOne({userId:userId})){
      return CLT.ImsUserRelation.findOne({userId:userId}).accept;
    }
    return [];
  }
},

//내게 요청한 친구 검색
getReceiveFriends : function(userId){
  if(Meteor.isServer){
    if(CLT.ImsUserRelation.findOne({userId:userId})){
      return CLT.ImsUserRelation.findOne({userId:userId}).receive;
    }else{
      return [];
    }

  }
},

//친구승락
doAcceptFriend : function(frienId){
  if(Meteor.isServer){

    ///////////////중복코딩 todo //////////////////////
    if(Meteor.isServer){
      CLT.ImsUserRelation.update(
        {userId:Meteor.userId()},
        {$pull:{receive:{userId:frienId}}}
      );
      CLT.ImsUserRelation.update(
        {userId:frienId},
        {$pull:{request:{userId:Meteor.userId()}}}
      );
      //accept 추가
      CLT.ImsUserRelation.update(
        {userId:Meteor.userId()},
        {$push:{accept:{
          userId:frienId,
          regDate:global.fn_dateFormat().HMS
        }}}
      );
      CLT.ImsUserRelation.update(
        {userId:frienId},
        {$push:{accept:{
          userId:Meteor.userId(),
          regDate:global.fn_dateFormat().HMS
        }}}
      );
    }

  }
},

//승락된 친구 삭제
removeAcceptFriend : function(frienId){
  CLT.ImsUserRelation.update(
    {userId:Meteor.userId()},
    {$pull:{accept:{userId:frienId}}}
  );
  CLT.ImsUserRelation.update(
    {userId:frienId},
    {$pull:{accept:{userId:Meteor.userId()}}}
  );
},
//내 친구,요청중,받은요청 정보 가져오기
getRelation : function(_userId){
  return CLT.ImsUserRelation.find({userId:_userId}).fetch()[0];
},
//오늘의 질문 데이터 가져오기
getQeustionData: function(_userId){
  var result = {};

  if(Meteor.isServer){
    var quesitonData= {};

    //1. 사용자 정보 확인
    quesitonData = Meteor.users.find({_id:_userId},{fields:{'profile.birthday':1, 'profile.question':1, 'profile.sex':1}}).fetch()[0];
    var toDate = global.fn_dateFormat().YMD;
    var userAge = global.fn_getMyAge(quesitonData.profile.birthday, global.fn_dateFormat().YMD);

    //2.세대 확인
    var generation = 10;
    var genInfo = global.fn_getDigit(userAge);

    //3. 성별 확인
    var sex = quesitonData.profile.sex === '남' ? 'M' : 'F';

    if(genInfo.digit === 1){
      generation = 10;
    } else if (genInfo.digit === 2){
      generation = parseInt(genInfo.generation + '0');
    } else {
      generation = parseInt(genInfo.generation + '00');
    }

    if(generation > 60){
      generation = 60;
    }


    // console.log(generation + '대');
    // console.log(qHistory);

    var question = {};
    // 기존에 한번이라도 질문을 받은경우
    if(_.has(quesitonData.profile,'question')){
      // console.log('기존 사용자 받았음');
      //1. 마지막에 받은 질문 일자 확인
      var lastQregDate = global.fn_dateFormat(quesitonData.profile.question.regDate).YMD; //질문 등록 일자

      //2. 기존에 했던 질문 가져오기
      // - Cycle로 분석하여, 재사용가능한 질문들은 제외 시킨다. -1: 반복안함, 0: 계속반복, 1이상 : 일자만큼 주기
      //  1) -1인것 (dueDate : null)
      //  2) cycle일자만큼 지나지 않은것(현재일자 - 등록일자 > cycle)
      //    - 등록일자 < 현재일자 - cycle
      // cycle : 5
      // regDate : 2018-05-01
      // 오늘이 2018-05-06 일이야
      // 답 6일부터 사용가능해야함

      // 반복하지 않을 질문들 추출
      var qHistory = CLT.EnQuestionHistory.find({
        userId :_userId,
        $or : [
            {dueDate : {$eq:null}}, //반복하지 않는 질문
            {dueDate : {$gt:toDate}} // 반복주기가 지나지 않은 질문
          ]
      },{sort:{regDate:-1}}).fetch();

      // console.log(qHistory);

      var historyQcode = _.uniq(_.pluck(qHistory, 'qCode'));//기존 질문했던 코드리스트 []

      //오늘 질문 받았음
      if(toDate === lastQregDate){
        // console.log('오늘 질문 받았음' + quesitonData.profile.question.qCode);
        if(_.contains(historyQcode, quesitonData.profile.question.qCode)){
          // console.log('답변했음 :  숨김');
          result = null;
        } else { //오늘 답변 안했음
          //기존 질문 그대로 출력
          // console.log('답변안함 : 기존 질문 그대로 출력');
          result = CLT.EnQuestionList.find({qCode:quesitonData.profile.question.qCode}).fetch()[0];
        }
      }
      // 오늘 받지 않음
      else {
        // console.log('오늘 질문 받지 않았음');
        //답변하지 않은 코드 중 랜덤하게 질문을 가져오기

        //1. generation
        //2. sex
        //3. 기 등록된 것 제외
        result = _.sample(CLT.EnQuestionList.find({generation:generation, sex:sex, qCode : { $nin: historyQcode }}).fetch());
        if(result){
          question = {
            qCode : result.qCode,
            regDate : global.fn_dateFormat().YMD
          };

          //프로파일에 코드 갱신
          Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.question': question}});
        }
      }
    }
    // 기존에 응답이 없을 경우 (처음일경우)
    else {
      // console.log('신규 사용자');
      //오늘의 질문 코드 등록
      //1. generation
      //2. sex
      result = _.sample(CLT.EnQuestionList.find({generation:generation, sex:sex}).fetch());
      if(result){
        question = {
          qCode : result.qCode,
          regDate : global.fn_dateFormat().YMD
        };
        //오늘의 질문 고정 값 등록
        Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.question': question}});
      }
    }
  }

  return result;
},
setQuestionHistory : function(_obj){
  CLT.EnQuestionHistory.insert(_obj);
},
removeQuestion : function(_obj){
  CLT.EnQuestionHistory.remove({qCode : _obj.qCode, userId : _obj.userId});
},
getPointCount:function(_userId){
  return CLT.ImsPointHis.find({userId : _userId},{sort:{regDate:-1}}).count();
},

getPoint : function(_userId, count){
  var result = {};
  var pointData = CLT.ImsPointHis.find({userId : _userId},{sort:{regDate:-1},skip:count, limit:count+10}).fetch();
  //sum은 최초 한번만 가져=
  if(count === 0){
    var pointSumData = CLT.ImsPointHis.find({userId : _userId},{sort:{regDate:-1}}).fetch();
    var pointArr = _.pluck(pointSumData, 'point');
    var pointSum = _.reduce(pointArr, function(memo, num){return memo + (num ? num : 0) ; }, 0);
    result.pointSum = pointSum ? pointSum : 0;
  }
  _.map(pointData, function(item){
    item.regDate = global.fn_dateFormat(item.regDate).korYMD;
  });
  result.pointInfo = pointData;
  return result;
},
setPoint : function(_code, _userId, _getUse, _type ,_subType, _content){
  var codeInfo = _.findWhere(global.code.point, {code:_code});
  var point = codeInfo[_getUse];
  var obj = {
    userId : _userId,
    code : _code,
    name : codeInfo.name,
    type : _type,
    subType : _subType === 'DEFAULT' ? '' : _subType,
    getUse : _getUse,
    point : point,
    content : _content,
    regDate : global.fn_dateFormat().HMS,
  };

  return CLT.ImsPointHis.insert(obj);
},
// 1. 로그 사용여부확인
// if(global.writeLog){
//   //2. 로그 생성
//    Meteor.call('setLog', 'LG0001', Meteor.userId(),'CM', '');
// }
setLog : function(_code, _userId, _type, _content){
  // var codeInfo = _.findWhere(global.code.log, {code:_code});
  // var log = codeInfo[_getUse];
  if(Meteor.isServer){
    var obj = {
      code : _code,
      userId : _userId,
      type : _type,
      content : _content,
      regDate : global.fn_dateFormat().HMS,
    };
    CLT.ImsLog.insert(obj);
  }
},
//사용자 로그 쌓기 옵션 (_data: true/false)
useSetLog : function(_data){
  CLT.ImsCodeOption.update({},{$set:{writeLog:_data}});
},
uploadS3Image : function(_imgInfo){
  var result = '';
  if(Meteor.isServer){
    var imgsInfo = [];
    if(_.isArray(_imgInfo)){
      imgsInfo = _imgInfo;
    } else {
      imgsInfo.push(_imgInfo);
    }


    _.each(imgsInfo, function(imginfo){
      _.map(imginfo.data, function(item){
        var realPath = item.uri.substring(imginfo.data.indexOf("data"));

        var path = '';
        if(item.type){
          path = imginfo.folder + imginfo.fileName + item.type +'.' + imginfo.extension;
        } else {
          path = imginfo.folder + imginfo.fileName + '.' + imginfo.extension;
        }

        var s3Bucket = new AWS.S3();
        var Buffer = require('buffer').Buffer;
        var buf = new Buffer.from(realPath.replace(/^data:image\/\w+;base64,/, ""),'base64');
        // console.log(global.s3.bucketName);
        // console.log(path);
        var data = {
          Bucket: global.s3.bucketName,
          Key: path,
          Body: buf,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg'
        };
        //위에서 설정한 파일명과, 서버정보를 이용하여, DB에 데이터를 저장한다.
        s3Bucket.putObject(data, function(err, data){
          if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
          } else {
            // console.log('succesfully uploaded the image!',data);
          }
        });

      });

    });
  }
  return result;
},
deleteS3Img : function(_imgInfo){
  if(Meteor.isServer){
    var imgsInfo = [];
    if(_.isArray(_imgInfo)){
      imgsInfo = _imgInfo;
    } else {
      imgsInfo.push(_imgInfo);
    }
    _.map(imgsInfo, function(imgInfo){
      var s3Bucket = new AWS.S3();
      var imgData = [
        {
            Bucket: global.s3.bucketName,
            Key: imgInfo.folder + imgInfo.fileName + '_thumb.' + imgInfo.extension
        },
        {
            Bucket: global.s3.bucketName,
            Key: imgInfo.folder + imgInfo.fileName + '_origin.' + imgInfo.extension
        }

      ];

      _.each(imgData, function(item){
        // console.log(item);
        s3Bucket.deleteObject(item, function (err, data) {
          if (err) {
            console.log("Check if you have sufficient permissions : "+err);
          }
        });
      });
    });
  }
},
getLifeMap: function(_userId, _searchObj){
  var result = [];
  var searchOption = {};
  var lockObj = {};
  var typeObj = {};
  var subTypeObj = {};
  var startDateObj = {};
  var endDateObj = {};


  if(!_searchObj.lock){
    lockObj = {lock : _searchObj.lock};
  }
  if(!_.contains(_searchObj.type,'AL')){
    // if(_searchObj.type === 'BL'){
    //   typeObj = {type : {$in:['BL', 'BS']}};
    // } else {
      typeObj = {type : {$in:_searchObj.type}};
    // }
  }

  if(!_.contains(_searchObj.subType,'AL')){
    subTypeObj = {subType : {$in:_searchObj.subType}};
  }

  if(_searchObj.startDate){
    startDateObj = {mDate:{ $gte: _searchObj.startDate }};
  }

  if(_searchObj.endDate){
    endDateObj = {mDate:{ $lte: _searchObj.endDate }};
  }

  searchOption = {$and:[
    typeObj,
    subTypeObj,
    startDateObj,
    endDateObj,
    lockObj,
  ]};

  if(Meteor.isServer){
    // var mapData = CLT.ImsLifeMap.find({userId:_userId, batchDate:{$ne:''}},{sort:{mDate:1}}).fetch();
    // var tempData = CLT.ImsLifeMap.find({userId:_userId},{sort:{mDate:1, regDate:1}}).fetch();
    var tempData = CLT.ImsLifeMap.find({
      $and : [
        {userId:_userId},
        searchOption
      ]
    },{sort:{mDate:1, regDate:1}}).fetch();
    var mapData = [];


    if(tempData){
      //라인별 데이터 세팅 (3개씩 끊어서 체크하도록 함)
      var yearTemp = [];
      var monthTemp = [];

      //연도와 월을 넣기 위해 데이터를 수정함
      _.each(tempData, function(item, index){
        var dateData ={};
        //년도 확인
        var mYear = global.fn_getDatePart('year', item.mDate);

        //월 확인
        var mMonth = global.fn_getDatePart('month', item.mDate);

        item.mDate = global.fn_getDatePart('monthDate', item.mDate);
        // console.log(mYear + '-' + mMonth + ':'+item.mDate);
        //연도 컨텐츠 추가
        if(!_.contains(yearTemp, mYear)){
          yearTemp.push(mYear);

          dateData = {
            "keyword" : [],
            "images" : ["/images/bg/map/year_board.png"],
            "lineImage": [],
            "mDate" : mYear,
            "class" : 'year'
          };

          //월 초기화
          monthTemp = [];
          mapData.push(dateData);
        }

        //월 컨텐츠 추가
        if(!_.contains(monthTemp, mMonth)){
          monthTemp.push(mMonth);

          dateData = {
            "keyword" : [],
            // "images" : ["/images/bg/sign_borad.png"],
            "images" : ["/images/bg/map/month_board.png"],
            "lineImage": [],
            "mDate" : mMonth+"월",
            "class" : 'month'
          };
          mapData.push(dateData);
        }

        item.class = 'content';

        if(item.type === 'TC'){
          var my = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_나에게.png';
          var your = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_너에게.png';
          var myOpen = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_나에게오픈.png';
          var yourOpen = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_너에게오픈.png';


          var capsuleItem = CLT.EnStory.find({_id:item.contentId, type:'TC'}).fetch()[0];
          item.isOpened = capsuleItem.isOpened;
          var targetId = capsuleItem.targetId[0];
          if(capsuleItem.isOpened){ //개봉된 타임캡슐
            if(!targetId){ //나에게 쓴 타임캡슐
              item.images = [myOpen];
            } else {
              if(capsuleItem.capsuleId){ //친구에게 받은 타임캡슐
                item.images = [yourOpen];
              } else { //친구에게 보낸 타임캡슐
                item.images = [yourOpen];
              }
            }
          } else { //미개봉된 타임캡슐
            if(!targetId){ //나에게 쓴 타임캡슐
              item.images = [my];
            }  else {
              if(capsuleItem.capsuleId){ //친구에게 받은 타임캡슐
                item.images = [your];
              } else { //친구에게 보낸 타임캡슐
                item.images = [your];
              }
            }
          }
        }
        mapData.push(item);
      });

      //전체 라인개수 구하기
      var lineCnt = 0;
      lineCnt = parseInt(mapData.length/4);
      if(mapData.length%4 > 0){
        lineCnt += 1;
      }


      for(n=1; n<=lineCnt; n++){
        var row = [];

        //3개씩 결과어레이에 어레이형태로 등록
        for(i=(4*n-4); i < 4*n; i++){
          var item = {};



          if(n%2 > 0){
            //1. 홀수줄 (정방향)
            if(mapData[i] === undefined){
              item = {
                class:"",
                image: [],
                lineImage :[],
                keyword :[],
                mDate : '',
                rowspan : "1",
              };
            } else {
              item = {
                class: mapData[i].class + ' cursor-pointer',
                // class: "",
                image: _.sample(mapData[i].images),
                lineImage : _.sample(global.lifeMapLine),
                // keyword : _.sortBy(_.first(mapData[i].keyword,2),function(item){return item;}),
                keyword : _.first(mapData[i].keyword,2),
                mDate : mapData[i].mDate,
                rowspan : "1",
                contentId : mapData[i].contentId,
                type:mapData[i].type,
                isOpened : mapData[i].isOpened ? mapData[i].isOpened : false,
              };
            }

            row.push(item);

            //마지막데이터
            if(mapData.length === i+1){
              item = {
                // class:"mline-ro",
                class:"end-point",
                image:['/images/bg/map/blank.png'],
                lineImage:[],
                keyword:[],
                // mDate :'엔딩까지<br/>47년 8개월 6일',
                mDate : global.fn_dateFormat(_searchObj.endDate).YMDdot,
                rowspan : "1",
              };
              row.push(item);
            }

            //우측코너 설정
            //데이터가 남았고, i === 3n-1
            if(mapData.length > i+1 && i === 4*n-1){
              item = {
                // class:"",
                class:"mline-rc",
                image:[],
                // lineImage : ['/images/bg/map/map_side_right_1.png'],
                lineImage : [],
                keyword:[],
                mDate :'',
                rowspan : "2",
              };
              row.push(item);
            }

          } else {
            //2. 짝수줄 (역순으로 넣어야함)
            // console.log(mapData[i]);
            if(mapData[i] === undefined){
              item = {
                class:"",
                image: [],
                lineImage : [],
                keyword :[],
                mDate : '',
                rowspan : "1",
              };
            } else {
              item = {
                // class: mapData[i].class !== 'content' ? mapData[i].class : _.sample(global.lifeMapLine),
                class: mapData[i].class + ' cursor-pointer',
                image: _.sample(mapData[i].images),
                lineImage : _.sample(global.lifeMapLine),
                // keyword : _.sortBy(_.first(mapData[i].keyword,2),function(item){return item;}),
                keyword : _.first(mapData[i].keyword,2),
                mDate : mapData[i].mDate,
                rowspan : "1",
                contentId : mapData[i].contentId,
                type:mapData[i].type,
                isOpened : mapData[i].isOpened ? mapData[i].isOpened : false,
              };
            }

            row.unshift(item);

            //마지막데이터 4 i=3
            if(mapData.length === i+1){
              item = {
                // class:"mline-lo",
                class:"end-point",
                image:['/images/bg/map/blank.png'],
                // lineImage:[],
                lineImage:[],
                keyword:[],
                // mDate :'엔딩까지<br/>47년 8개월 6일',
                mDate : global.fn_dateFormat(_searchObj.endDate).YMDdot,
                rowspan : "1",
              };
              row.unshift(item);
            }

            //좌측코너 설정
            //데이터가 남았고, i === 3n-1
            if(mapData.length > i+1 && i === 4*n-1){
              item = {
                class:"mline-lc",
                image:[],
                // lineImage:['/images/bg/map/map_side_left_1.png'],
                lineImage : [],
                keyword:[],
                mDate :'',
                rowspan : "2",
              };
              row.unshift(item);
            }

          }
        }

        //시작점 설정
        if(n===1){
          //좌오픈 넣기
          var startPoint = {
            // class:"mline-lo",
            class:"end-point",
            image:['/images/bg/map/blank.png'],
            lineImage:[],
            keyword:[],
            mDate : global.fn_dateFormat(_searchObj.startDate).YMDdot,
            // mDate :'탄생<br/>1986.01.01',
            rowspan : "1",
          };
          row.unshift(startPoint);
        }

        result.push(row);
      }
    } else {
      result = null;
    }
    return result;
  }
},
getLifeMap2: function(_userId, _searchObj){
  var result = [];
  var lockObj = {};
  var searchOption = [];
  var searchFilter = [];
  var bySearch = false;

  if(_searchObj.text){
    searchOption.push({"title":{$regex:".*"+ _searchObj.text +".*"}});
    searchOption.push({"context":{$regex:".*"+ _searchObj.text +".*"}});
    searchOption.push({"mDate":{$regex:".*"+ _searchObj.text +".*"}});
    searchOption.push({"tagList":{$in:[_searchObj.text]}});
    bySearch = true;
  }
  else{
    searchOption.push({});
  }

  //주제 영역 필터
  if(_searchObj.type && _searchObj.type.length > 0 && _searchObj.type[0] !== 'AL'){
    searchFilter.push({"type":{$in:_searchObj.type}});
    searchFilter.push({"subType":{$in:_searchObj.subType}});
    bySearch = true;
  } else {
    searchFilter.push({});
  }

  //비밀글 포함 필터1(기본)
  if(!_searchObj.showLock){
    lockObj = {lock:false};
  }

  if(Meteor.isServer){
    var timelineData = CLT.EnStory.find({$and:[{'userId':_userId},{deleted:{$ne:true}},lockObj,{$or:searchOption},{$and:searchFilter}]},{fields:{_id:1}}).fetch();
    var targetIds = _.pluck(timelineData, '_id');
    searchOption = {contentId:{$in:targetIds}};

    var tempData = CLT.ImsLifeMap.find({
      $and : [
        searchOption
      ]
    },{sort:{mDate:1, regDate:1}}).fetch();
    var mapData = [];


    if(tempData){
      //라인별 데이터 세팅 (3개씩 끊어서 체크하도록 함)
      var yearTemp = [];
      var monthTemp = [];

      //연도와 월을 넣기 위해 데이터를 수정함
      _.each(tempData, function(item, index){
        var dateData ={};
        //년도 확인
        var mYear = global.fn_getDatePart('year', item.mDate);

        //월 확인
        var mMonth = global.fn_getDatePart('month', item.mDate);

        item.mDate = global.fn_getDatePart('monthDate', item.mDate);
        // console.log(mYear + '-' + mMonth + ':'+item.mDate);
        //연도 컨텐츠 추가
        if(!_.contains(yearTemp, mYear)){
          yearTemp.push(mYear);

          dateData = {
            "keyword" : [],
            "images" : ["/images/bg/map/year_board.png"],
            "lineImage": [],
            "mDate" : mYear,
            "class" : 'year'
          };

          //월 초기화
          monthTemp = [];
          mapData.push(dateData);
        }

        //월 컨텐츠 추가
        if(!_.contains(monthTemp, mMonth)){
          monthTemp.push(mMonth);

          dateData = {
            "keyword" : [],
            // "images" : ["/images/bg/sign_borad.png"],
            "images" : ["/images/bg/map/month_board.png"],
            "lineImage": [],
            "mDate" : mMonth+"월",
            "class" : 'month'
          };
          mapData.push(dateData);
        }

        item.class = 'content';

        if(item.type === 'TC'){
          var my = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_나에게.png';
          var your = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_너에게.png';
          var myOpen = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_나에게오픈.png';
          var yourOpen = global.s3.bucketPath + global.s3.folder.common + '/타임캡슐_너에게오픈.png';


          var capsuleItem = CLT.EnStory.find({_id:item.contentId, type:'TC'}).fetch()[0];
          item.isOpened = capsuleItem.isOpened;
          var targetId = capsuleItem.targetId[0];
          if(capsuleItem.isOpened){ //개봉된 타임캡슐
            if(!targetId){ //나에게 쓴 타임캡슐
              item.images = [myOpen];
            } else {
              if(capsuleItem.capsuleId){ //친구에게 받은 타임캡슐
                item.images = [yourOpen];
              } else { //친구에게 보낸 타임캡슐
                item.images = [yourOpen];
              }
            }
          } else { //미개봉된 타임캡슐
            if(!targetId){ //나에게 쓴 타임캡슐
              item.images = [my];
            }  else {
              if(capsuleItem.capsuleId){ //친구에게 받은 타임캡슐
                item.images = [your];
              } else { //친구에게 보낸 타임캡슐
                item.images = [your];
              }
            }
          }
        }
        mapData.push(item);
      });

      //전체 라인개수 구하기
      var lineCnt = 0;
      lineCnt = parseInt(mapData.length/4);
      if(mapData.length%4 > 0){
        lineCnt += 1;
      }


      for(n=1; n<=lineCnt; n++){
        var row = [];

        //3개씩 결과어레이에 어레이형태로 등록
        for(i=(4*n-4); i < 4*n; i++){
          var item = {};



          if(n%2 > 0){
            //1. 홀수줄 (정방향)
            if(mapData[i] === undefined){
              item = {
                class:"",
                image: [],
                lineImage :[],
                keyword :[],
                mDate : '',
                rowspan : "1",
              };
            } else {
              item = {
                class: mapData[i].class + ' cursor-pointer',
                // class: "",
                image: _.sample(mapData[i].images),
                lineImage : _.sample(global.lifeMapLine),
                // keyword : _.sortBy(_.first(mapData[i].keyword,2),function(item){return item;}),
                keyword : _.first(mapData[i].keyword,2),
                mDate : mapData[i].mDate,
                rowspan : "1",
                contentId : mapData[i].contentId,
                type:mapData[i].type,
                isOpened : mapData[i].isOpened ? mapData[i].isOpened : false,
              };
            }

            row.push(item);

            //마지막데이터
            if(mapData.length === i+1){
              item = {
                // class:"mline-ro",
                class:"end-point",
                image:['/images/bg/map/blank.png'],
                lineImage:[],
                keyword:[],
                // mDate :'엔딩까지<br/>47년 8개월 6일',
                mDate : global.fn_dateFormat(_searchObj.endDate).YMDdot,
                rowspan : "1",
              };
              row.push(item);
            }

            //우측코너 설정
            //데이터가 남았고, i === 3n-1
            if(mapData.length > i+1 && i === 4*n-1){
              item = {
                // class:"",
                class:"mline-rc",
                image:[],
                // lineImage : ['/images/bg/map/map_side_right_1.png'],
                lineImage : [],
                keyword:[],
                mDate :'',
                rowspan : "2",
              };
              row.push(item);
            }

          } else {
            //2. 짝수줄 (역순으로 넣어야함)
            // console.log(mapData[i]);
            if(mapData[i] === undefined){
              item = {
                class:"",
                image: [],
                lineImage : [],
                keyword :[],
                mDate : '',
                rowspan : "1",
              };
            } else {
              item = {
                // class: mapData[i].class !== 'content' ? mapData[i].class : _.sample(global.lifeMapLine),
                class: mapData[i].class + ' cursor-pointer',
                image: _.sample(mapData[i].images),
                lineImage : _.sample(global.lifeMapLine),
                // keyword : _.sortBy(_.first(mapData[i].keyword,2),function(item){return item;}),
                keyword : _.first(mapData[i].keyword,2),
                mDate : mapData[i].mDate,
                rowspan : "1",
                contentId : mapData[i].contentId,
                type:mapData[i].type,
                isOpened : mapData[i].isOpened ? mapData[i].isOpened : false,
              };
            }

            row.unshift(item);

            //마지막데이터 4 i=3
            if(mapData.length === i+1){
              item = {
                // class:"mline-lo",
                class:"end-point",
                image:['/images/bg/map/blank.png'],
                // lineImage:[],
                lineImage:[],
                keyword:[],
                // mDate :'엔딩까지<br/>47년 8개월 6일',
                mDate : global.fn_dateFormat(_searchObj.endDate).YMDdot,
                rowspan : "1",
              };
              row.unshift(item);
            }

            //좌측코너 설정
            //데이터가 남았고, i === 3n-1
            if(mapData.length > i+1 && i === 4*n-1){
              item = {
                class:"mline-lc",
                image:[],
                // lineImage:['/images/bg/map/map_side_left_1.png'],
                lineImage : [],
                keyword:[],
                mDate :'',
                rowspan : "2",
              };
              row.unshift(item);
            }

          }
        }

        //시작점 설정
        if(n===1){
          //좌오픈 넣기
          var startPoint = {
            // class:"mline-lo",
            class:"end-point",
            image:['/images/bg/map/blank.png'],
            lineImage:[],
            keyword:[],
            mDate : global.fn_dateFormat(_searchObj.startDate).YMDdot,
            // mDate :'탄생<br/>1986.01.01',
            rowspan : "1",
          };
          row.unshift(startPoint);
        }

        result.push(row);
      }
    } else {
      result = null;
    }
    return result;
  }
},
setLifeMap : function(_contentId, _obj){
  // CLT.ImsLifeMap.insert(_obj);
  CLT.ImsLifeMap.upsert(
    {'contentId': _contentId},
    {$set: _obj,
      $setOnInsert: {'regDate': global.fn_dateFormat().HMS}
    }
  );
},
setUpdateLifeMap : function(_contentId){
  CLT.ImsLifeMap.update({contentId:_contentId},{$set:{isUpdated:'true'}});
},
removeLifeMap : function(_contentId){
  CLT.ImsLifeMap.remove({contentId : _contentId});
},
checkUserNickDup : function(userNick){
  var resData = Meteor.users.find({"profile.nickName":userNick}).fetch();
  if(resData.length){
    //중복
    return true;
  }else{
    return false;
  }
},
// setLifeMapbulk: function(_data){
//   _.each(_data, function(itemObj){
//     CLT.ImsLifeMap.insert(itemObj);
//   });
// },
//전번 변경
editPhoneNumber : function(phoneNum){
  Meteor.users.update({_id:Meteor.userId()},{$set:{"profile.mobile":phoneNum}});
},
//인트로 변경
updateUserIntro : function(intro){
  Meteor.users.update({_id:Meteor.userId()},{$set:{"profile.introduction":intro}});
},
//닉네임 변경
updateUserNickName : function(nickName){
  var resData = Meteor.users.find({"profile.nickName":nickName}).fetch();
  if(resData.length){
    //중복
    return false;
  }else{
    Meteor.users.update({_id:Meteor.userId()},{$set:{"profile.nickName":nickName}});
    return true;
  }
},
//생년월일 변경
updateUserBirthDay : function(birthDay){
  Meteor.users.update({_id:Meteor.userId()},{$set:{"profile.birthday":birthDay}});
},
//이메일 변경
editEmailInfo : function(emailInfo){
  Meteor.users.update({_id:Meteor.userId()},{$set:{"profile.email":emailInfo}})
},
//아이디찾기 이름 휴폰 비교
findMyidCheck : function(name, phone){
  return Meteor.users.findOne(
    {$and:[{'profile.name':name},{'profile.mobile':phone}]},
    {fields:{'username':1}}
  );
},

checkIsThereId : function(username){
  if(Meteor.users.findOne({username:username})){
    return true;
  }else{
    return false;
  }
},
//사망여부 확인 메세지 return
checkIsPassAwayResMsg : function(userId){
  if(Meteor.isServer){
    // console.log(userId);
    var isPass = Meteor.users.findOne({_id:userId},{fields:{'profile.isPassAway':1}});
    var resMsg = CLT.Inh.findOne({userId:Meteor.userId()},{fields:{acceptInh:{$elemMatch:{sendingUserUId:userId} }}});
    var resData = {};
    if(isPass && isPass.profile){
      resData.isPassAway = isPass.profile.isPassAway;
    }else{
      return resData;
    }

    if(resMsg && resMsg.acceptInh[0]){
      resData.message = resMsg.acceptInh[0].message;
    }
    // console.log(resData);
    return resData;
  }
},
//유서 있는지 없는지
isThereTestament : function(userId){
  return CLT.EnStory.findOne({$and:[{userId:userId},{type:"TQ"},{subType:"TQ0012"}]});
},
getFamilyInfo: function(_userId, _familyIds){
  var result = [];
  if(Meteor.isServer){
    var familyData = Meteor.users.find({_id : _userId},{fields:{family:1}}).fetch()[0];
    // console.log(familyData);
    if(familyData.family){

      result = _.chain(_.filter(familyData.family, function(item){return _.contains(_familyIds,item._id);})).sortBy('name').reverse().value();
    }
  }

  return result;
},
getFamilyData: function(_userId, _type){
  var result = [];
  if(Meteor.isServer){
    var familyData = Meteor.users.find({_id : _userId},{fields:{family:1}}).fetch()[0];
    // console.log(familyData);
    if(familyData.family){
      result = _.chain(_.where(familyData.family, {relation : _type})).sortBy('name').reverse().value();
    }
    // console.log(result);
  }

  return result;
},
setFamilyData: function(_userId, _data){
  Meteor.users.update({_id : _userId},{$pull:{family:{_id:_data._id}}});
  Meteor.users.update({_id : _userId},{$push:{family:_data}});
},
removeFamilyData : function(_userId, _familyId){
  Meteor.users.update({_id : _userId},{$pull:{family:{_id:_familyId}}});
},
sendEmail: function (email) {
  check([email.to, email.from, email.subject, email.text], [String]);

  // Let other method calls from the same client start running,
  // without waiting for the email sending to complete.
  this.unblock();

  // console.log(email);
  if (Meteor.isServer) {
    Email.send({
      to: email.to,
      from: email.from,
      subject: email.subject,
      html: email.text
    });
  }
},
//fcm token set 부분
setFcmTokenId: function(data){
  if(Meteor.isServer){
    console.log('setFcmTockenMethod: ' + data.tokenId + ',' + data.userId);
    var userData = Meteor.users.findOne({_id:data.userId});
    if(userData && userData.fcmToken && Array.isArray(userData.fcmToken)){
      //fcmtoken 이 array
      Meteor.users.update({'fcmToken':data.tokenId},{$pull:{'fcmToken':data.tokenId}},{multi:true})
      Meteor.users.update({_id:data.userId},{$push:{"fcmToken":data.tokenId}});
    }else{
      // Meteor.users.update({'fcmToken':data.tokenId},{$set:{fcmToken:""}},{multi:true});
      Meteor.users.update({_id:data.userId},{$set:{"fcmToken":[data.tokenId]}});
    }
  }
},

//logout fcmToken 제거;
disconnectFcmToken : function(data){
  if(Meteor.isServer){
    // console.log(" server "+ data.tokenId);
    if(data.tokenId){
      // todo  string token 때문 임시 코드
      var userData = Meteor.users.findOne({'_id':data.userId});

      if(userData && userData.fcmToken && Array.isArray(userData.fcmToken)){
        Meteor.users.update({'fcmToken':data.tokenId},{$pull:{'fcmToken':data.tokenId}},{multi:true})
      }else{
        // todo string 인 fcm 방어코딩
        Meteor.users.update(
          {'_id':data.userId},
          {$set:{fcmToken:[]}}
        )
      }
    }
  }
},

//userId 로 fcm 토큰가져오기
getTokenIds: function(ids){
  // console.log(Meteor.users.find({_id:{ $in:ids}},{fields:{fcmToken:1,profile:1}}).fetch()[0]+"   token");
  return Meteor.users.find({_id:{ $in:ids}},{fields:{fcmToken:1,profile:1}}).fetch();
},

//fcm 중복 발송 방지 있는지 유무확인후 없는 id만 return
// 없는 id는 history 업뎃
// ids : array , code:string
checkUpdateFcmHistory : function(ids, code, content){
  var effectiveIds = [];
  ids.forEach(function(val){
    if(!CLT.FcmHistory.findOne({sender:Meteor.userId(), to:val, code:code, contentId:content})){
      //없으면 업뎃
      // console.log('insert');
      CLT.FcmHistory.insert({sender:Meteor.userId(), to:val, code:code, contentId:content});
      effectiveIds.push(val);
    }
  });
  // console.log(effectiveIds);
  return effectiveIds;
},
setProfileEtcData : function(_userId, _profileEtcCode, _value){

  var setObject = {};
  setObject["profile.etc."+ _profileEtcCode] = _value;

  Meteor.users.update({_id:_userId},{$set:setObject});
},
//공지/이벤트 정보 가져오기
getOfficialNoti : function(_today){
  result = {};
  if(Meteor.isServer){
    result = CLT.ImsOffNoti.find({activation : true, eDate:{$gte:_today}, sDate:{$lte:_today}},{sort:{order:1}}).fetch()[0];
  }
  return result;
},
//공지/이벤트 정보 가져오기
getOfficialNotiCount : function(_today){
  result = 0;
  if(Meteor.isServer){
    result = CLT.ImsOffNoti.find({activation : true, eDate:{$gte:_today}, sDate:{$lte:_today}}).count();
  }
  return result;
},
//코드정보 가져올 수 있는지 확인하기 위함
checkCodeOptionLoad : function(){
  if(Meteor.isServer){
    return CLT.ImsCodeOption.find({}).count();
  }
},
getLogList : function(_name, _sDate, _eDate){
  var result = [];
  var usersInfo = [];
  if(Meteor.isServer){
    // if(_name){
      usersInfo = Meteor.users.find({'profile.name' : {$regex:".*"+ _name +".*"}},{fields:{'profile':1, 'username':1}}).fetch();
      // var userIds = _.pluck(usersInfo, '_id');
      // console.log(_.pluck(usersInfo, '_id'));
    // }



   var subCodeList = global.fn_getCodeList('log');
   // console.log(subCodeList);
   var subCode = _.filter(subCodeList, function(code){ return _.has(code, 'pCode');});
   // console.log(subCode);


    var logData = CLT.ImsLog.find({
      $and : [
        {regDate : {$gte:_sDate}},
        {regDate:{$lte:_eDate}}
      ]},{sort:{regDate:-1}}).fetch();

    _.map(logData, function(item){
      var etcInfo = _.findWhere(subCode, {type : item.type, subType:item.content, pCode:item.code});
      if(_.contains(_.pluck(usersInfo, '_id'),item.userId) || !_name){

        var userInfo = Meteor.users.find({_id: item.userId},{fields:{'profile':1, 'username':1}}).fetch()[0];
        var temp = {
          name :userInfo ? userInfo.profile.name : '비회원',
          age :userInfo ? global.fn_getMyAge(userInfo.profile.birthday, global.fn_dateFormat().YMD) : '비회원',
          sex :userInfo ? userInfo.profile.sex : '비회원',
          codeName: global.fn_getCodeName('log', item.code),
          etc : etcInfo ? etcInfo.name : item.type +', '+ item.content,
          regDate:global.fn_dateFormat(item.regDate).HMS,
        };
        result.push(temp);
      } else {
        if(_name === "비회원"){
          var temp = {
            name :'비회원',
            age :'비회원',
            sex :'비회원',
            codeName: global.fn_getCodeName('log', item.code),
            regDate:global.fn_dateFormat(item.regDate).HMS,
          };
          result.push(temp);
        }
      }
    });
  }
  return result;
},
getUserList : function(_name, _sDate, _eDate){
  var result = [];
  var nameOption = {};
  if(_name){
    nameOption = {'profile.name' : {$regex:".*"+ _name +".*"}}
  }

  if(Meteor.isServer){
    var userList = Meteor.users.find({$or : [
      {$and : [
        {'profile.name' : {$regex:".*"+ _name +".*"}},
        {createdAt : { "$gte" : new Date(_sDate)}},
        {createdAt : { "$lte" : new Date(_eDate)}}]},
      ]},
      {fields:{createdAt:1, username:1, 'profile.name':1, 'profile.nickName':1, 'profile.birthday':1, 'profile.sex':1, 'profile.profileImg':1}}).fetch();
    _.map(userList, function(item){
      var temp = {
        userId :item.username,
        name :item.profile.name,
        nickName :item.profile.nickName,
        age : global.fn_getMyAge(item.profile.birthday, global.fn_dateFormat().YMD),
        sex : item.profile.sex,
        profileImg: item.profile.profileImg ? global.fn_makeImageSrc(item.profile.profileImg, '') : {},
        regDate: new Date(item.createdAt).toISOString(),
      };
      result.push(temp);
    });
  }
  return result;
},
getAppVersion : function(_os){
  if(Meteor.isServer){
    return CLT.ImsSysConf.find({os:_os},{fields:{_id:0,version:1, message:1}}).fetch()[0];
  }
},
//유져 프로필 업데이트
setUserProfileData : function(data){
  if(Meteor.isServer){
    console.log(data);
    Meteor.users.update(
      {_id:Meteor.userId()},
      {$set:data}
    );
  }
},
setUserProfileSNSData : function(data){
  var randomNum = {};
  var defRoot = 0;
  //////////////////// 데이터가 많아지면 루프안타게 무조건 잡아줘야함
  do{
    randomNum.random = function(n1, n2) {
        return parseInt(Math.random() * (n2 -n1 +1)) + n1;
    };
    randomNum.authNo= function(n) {
        var value = "";
        for(var i=0; i<n; i++){
            value += randomNum.random(0,9);
        }
        return value;
    };
    randomNum = randomNum.authNo(7);

  }
  //중복 제거
  while(Meteor.users.find({'username':"dreamMaker"+randomNum}).count() !== 0){
    defRoot++;
    // todo 데이터 싸이면 30번이 부족할수도... 추후 다른 조건으로 코드 생성필요
    if(defRoot > 80){
      randomNum = false;
      return;
    }
  }
  if(randomNum){
    data.username = "dreamMaker"+randomNum;
    if(Meteor.isServer){
      console.log(data);
      Meteor.users.update(
        {_id:Meteor.userId()},
        {$set:data}
      );
    }
  }
},
checkSNSUserProfile : function(){
  var resProfile = Meteor.users.findOne({_id:Meteor.userId()},{fields:{profile:1}});
    if(resProfile && resProfile.profile){
      return true;
    }else{
      return false;
    }
},
checkGuide : function(_type, _userId){
  if(Meteor.isServer){
    var userGuideInfo = Meteor.users.find({_id : _userId, 'guide' : {$elemMatch: {type : _type}}},{fields:{guide:1}}).fetch()[0];
    if(userGuideInfo){
      return userGuideInfo.guide[0].complete;
    } else {
      // var data = {
      //   complete : false,
      //   type : _type,
      // };
      // Meteor.users.update({_id : _userId},{$push:{guide:data}});
      return false;
    }
  }
},
setGuideComplete : function(_type, _userId){
  if(Meteor.isServer){
    var userGuideInfo = Meteor.users.find({_id : _userId, 'guide' : {$elemMatch: {type : _type}}},{fields:{guide:1}}).fetch()[0];
    if(!userGuideInfo){
    var data = {
        complete : true,
        type : _type,
      };
      Meteor.users.update({_id : _userId},{$push:{guide:data}});
    }
  }
},

});

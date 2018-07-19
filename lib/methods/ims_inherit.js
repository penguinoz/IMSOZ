import {global} from '/imports/global/global_things.js';
import {collections as CLT} from '/imports/global/collections.js';

Meteor.methods({
  //상속대상list _id get
  getSendInhIds:function(userId){
    if(Meteor.isServer){
      //todo 중복코딩 function 으로 묶기
      var inhReturn = CLT.Inh.findOne({userId:userId},{sendInh:1});
      var inheritUsers = [];
      if(inhReturn && inhReturn.sendInh){
        for(var i=0; i<inhReturn.sendInh.length ; i++){
          inheritUsers.push(inhReturn.sendInh[i].inheriterId);
        }
      }
      return inheritUsers;
      ///////////////////////////////
    }
  },
  //상속을준 대상 list _id get
  getAcceptInhIds:function(userId){
    if(Meteor.isServer){
      //todo 중복코딩 function 으로 묶기
      var inhReturn = CLT.Inh.findOne({userId:userId},{acceptInh:1});
      var inheritUsers = [];
      if(inhReturn && inhReturn.acceptInh){
        for(var i=0; i<inhReturn.acceptInh.length ; i++){
          inheritUsers.push(inhReturn.acceptInh[i].sendingUserUId);
        }
      }
      return inheritUsers;
      ///////////////////////////////
    }
  },

  //상속 대상 프로필 조회
  getSendInhList:function(_userId){
    // var result = [];
    if(Meteor.isServer){
      var inhReturn = CLT.Inh.findOne({userId:_userId},{sendInh:1});
      var inheritUsers = [];
      if(inhReturn && inhReturn.sendInh){
        for(var i=0; i<inhReturn.sendInh.length ; i++){
          inheritUsers.push(inhReturn.sendInh[i].inheriterId);
        }
        return Meteor.users.find({_id:{$in:inheritUsers}},{fields:{"username":1,"profile":1}}).fetch();
      }
    }
    // return result;
  },
  //상속대상 삭제
  pullInhUser : function(userId){
    if(Meteor.isServer){
      CLT.Inh.update(
        {userId:userId},
        {$pull:{acceptInh:{sendingUserUId:Meteor.userId()}}}
      );
      CLT.InhLastLetter.remove({inheritorId:userId, userId : Meteor.userId()});
      return CLT.Inh.update(
                      {userId:Meteor.userId()},
                      {$pull:{sendInh:{inheriterId:userId}}}
                    );
    }
  },
  //상속 승락 취소 or 삭제
  pullMyInhData : function(userId){
    CLT.Inh.update(
      {userId:Meteor.userId()},
      {$pull:{acceptInh:{sendingUserUId:userId}}}
    );
  },

  //상속대상 추가
  pushInheriterList : function(insertObj){

    ///////////////// todo  로그인시 생성하면 필요없어지는 코드 //////////////
    var isthere = CLT.Inh.findOne({userId:Meteor.userId()});
    if(!isthere){
      var useridParam = Meteor.userId();
      var constrObj =
      {
          userId : useridParam,
          acceptInh : [],
          sendInh : [],
          regDate : global.fn_dateFormat().HMS
      }
      CLT.Inh.insert(constrObj);
    }
    ////////////////////////////////////////////////////////////////

    /////////////////todo 코드 생성 중복코딩 있음 ///////////////////////////
    var inhFullCode = "";
    var defRoot = 0;
    do{
      for(var i=0 ; i < 4 ; i++){
        var inhCode = Math.floor(Math.random()*10000)+"";
        var leng = inhCode.length;
        for(var j=0 ; j<4-leng ; j++ ){
          inhCode = "0"+inhCode;
        }
        inhFullCode = inhFullCode+inhCode;
      }
    }
    //중복 제거
    while(CLT.Inh.find({'sendInh.inheritCode':inhFullCode}).count() !== 0){
      inhFullCode = "";
      for(var i=0 ; i < 4 ; i++){
        var inhCode = Math.floor(Math.random()*10000)+"";
        var leng = inhCode.length;
        for(var j=0 ; j<4-leng ; j++ ){
          inhCode = "0"+inhCode;
        }
        inhFullCode = inhFullCode+inhCode;
      }
      defRoot++;
      // todo 데이터 싸이면 30번이 부족할수도... 추후 다른 조건으로 코드 생성필요
      if(defRoot > 30)return;
    }
    ////////////////////////////////////////////////////////////////////

    insertObj.inheritCode = inhFullCode;
    CLT.Inh.update(
      {userId:Meteor.userId()},
      {$push:{sendInh:insertObj}
      }
    );
    return inhFullCode;
  },

  //nonUser 상속대상 추가
  nonUserAddInheriter : function(param){

    /////////////////todo 코드 생성 중복코딩 있음 ///////////////////////////
    var inhFullCode = "";
    var defRoot = 0;
    do{
      for(var i=0 ; i < 4 ; i++){
        var inhCode = Math.floor(Math.random()*10000)+"";
        var leng = inhCode.length;
        for(var j=0 ; j<4-leng ; j++ ){
          inhCode = "0"+inhCode;
        }
        inhFullCode = inhFullCode+inhCode;
      }
    }
    //중복 제거
    while(CLT.NonUserInh.find({'inheritCode':inhFullCode}).count() !== 0){
      inhFullCode = "";
      for(var i=0 ; i < 4 ; i++){
        var inhCode = Math.floor(Math.random()*10000)+"";
        var leng = inhCode.length;
        for(var j=0 ; j<4-leng ; j++ ){
          inhCode = "0"+inhCode;
        }
        inhFullCode = inhFullCode+inhCode;
      }
      defRoot++;
      // todo 데이터 싸이면 30번이 부족할수도... 추후 다른 조건으로 코드 생성필요
      if(defRoot > 30)return;
    }
    ////////////////////////////////////////////////////////////////////
    var insertObj = {
      inheriterId : Meteor.userId(),
      relation : param.relation,
      secret : param.secret,
      bookService : param.bookService,
      regDate : global.fn_dateFormat().HMS,
      inheritCode : inhFullCode,
      name : param.name,
      email : param.email,
      phone : param.phone
    }
    CLT.NonUserInh.insert(insertObj);
    return inhFullCode;
  },

  //유져 가이언 추가
  pushGuadianList : function(guardianId){
    if(Meteor.isServer){
      var isthere = CLT.InhGuardians.findOne({userId:Meteor.userId()});
      if(!isthere){
        var useridParam = Meteor.userId();
        var constrObj =
        {
            userId : useridParam,
            guardians:[],
            nonUserGuardians:[],
            regDate : global.fn_dateFormat().HMS
        }
        CLT.InhGuardians.insert(constrObj);
      }

      return CLT.InhGuardians.update(
        {userId:Meteor.userId()},
        {$push:{guardians:guardianId}
        }
      );
    }
  },

  //비유져 가이언 추가
  nonUserPushGuadianList : function(guardianData){
    if(Meteor.isServer){
      var isthere = CLT.InhGuardians.findOne({userId:Meteor.userId()});
      if(!isthere){
        var useridParam = Meteor.userId();
        var constrObj =
        {
            userId : useridParam,
            guardians:[],
            nonUserGuardians:[],
            regDate : global.fn_dateFormat().HMS
        }
        CLT.InhGuardians.insert(constrObj);
      }

      // 이메일 중복체크 안함
      // var findRes = CLT.InhGuardians.findOne({"nonUserGuardians.email":guardianData.email});
      // if(findRes){
      //   //등록된 비유져의 이메일이 이미 있으면 return
      //   return {overLap:true}
      // }
      return CLT.InhGuardians.update(
        {userId:Meteor.userId()},
        {$push:{nonUserGuardians:guardianData}}
      );
    }
  },

  //가디어 리스트 조회
  getGuardianList:function(userId){
    if(Meteor.isServer){
      var guardReturn = CLT.InhGuardians.findOne({userId:userId},{guardians:1});
      var guardianUsers = [];
      if(guardReturn && guardReturn.guardians){
        for(var i=0; i<guardReturn.guardians.length ; i++){
          guardianUsers.push(guardReturn.guardians[i].guardianId);
        }
        return Meteor.users.find({_id:{$in:guardianUsers}},{fields:{"username":1,"profile":1}}).fetch();
      }
    }
  },
  //nonUser 가디어 리스트
  getNonUserGuardian : function(userId){
    if(Meteor.isServer){
      var guardReturn = CLT.InhGuardians.findOne({userId:userId},{nonUserGuardians:1});
      var guardianUsers = [];
      if(guardReturn && guardReturn.nonUserGuardians){
        for(var i=0; i<guardReturn.nonUserGuardians.length ; i++){
          guardianUsers.push(guardReturn.nonUserGuardians[i]);
        }
        return guardianUsers;
      }
    }
  },

  //가디언 _id 만 가져오기 todo가디언 리스트 조회 소스 중복 수정필요
  getGuardianIds:function(userId){
    if(Meteor.isServer){
      //todo 중복코딩 function 으로 묶기
      var guardReturn = CLT.InhGuardians.findOne({userId:userId},{guardians:1});
      var guardianUsers = [];
      if(guardReturn && guardReturn.guardians){
        for(var i=0; i<guardReturn.guardians.length ; i++){
          guardianUsers.push(guardReturn.guardians[i].guardianId);
        }
      }
      return guardianUsers;
      ///////////////////////////////
    }
  },
  //가디언 삭제
  pullGuardianUser : function(userId){
    if(Meteor.isServer){
      return CLT.InhGuardians.update(
                      {userId:Meteor.userId()},
                      {$pull:{guardians:{guardianId:userId}}}
                    );
    }
  },
  nonUserPullGuardianUser : function(email){
    if(Meteor.isServer){
      return CLT.InhGuardians.update(
                      {userId:Meteor.userId()},
                      {$pull:{nonUserGuardians:{email:email}}}
                    );
    }
  },
  //상속받은 컨텐 코드입력시 (상속수락시)
  checkInhCodeInputMyinh : function(inhFullCode){
    if(Meteor.isServer){

      ///////////////// todo  로그인시 생성하면 필요없어지는 코드 //////////////
      var isthere = CLT.Inh.findOne({userId:Meteor.userId()});
      if(!isthere){
        var useridParam = Meteor.userId();
        var constrObj =
        {
            userId : useridParam,
            acceptInh : [],
            sendInh : [],
            regDate : global.fn_dateFormat().HMS
        };
        CLT.Inh.insert(constrObj);
      }
      ////////////////////////////////////////////////////////////////

      var inhUserUdi = CLT.Inh.findOne({'sendInh.inheritCode':inhFullCode});
      var sendData = _.find(inhUserUdi.sendInh, function(obj){ return obj.inheritCode == inhFullCode ;});
      if(sendData){
        sendData.sendingUserUId = inhUserUdi.userId;
        return CLT.Inh.update(
          {userId:Meteor.userId()},
          {$push:{acceptInh:sendData}
          }
        );
      }else{
        //없을시 에러
        return false;
      }

    }
  },
  getLetterId : function(_userId, _inhUserId){
    return  CLT.InhLastLetter.find({userId : _userId, inheritorId:_inhUserId},{fields:{_id:1}}).fetch()[0];
  },
  getLastLetter : function(_contentId){
    var result = [];
    if(Meteor.isServer){
      result =  CLT.InhLastLetter.find({_id:_contentId}).fetch()[0];
      result.context = result.context.replace(/<p>/g, "");
      result.context = result.context.replace(/<\/p>/g, "");
      result.context = result.context.replace(/<br>/g, "\n");
      result.context = result.context.replace(/&nbsp;/g, " ");

      var userInfo = global.fn_getUserCommonInfo(result.userId);

      // result.userId = userInfo.userId;
      result.name = userInfo.name;
      result.profileImg =  userInfo.profileImg;
    }
    return result;
  },
  getLastLetterUsers : function(_userId){
    var result = [];
    if(Meteor.isServer){
      result =  _.pluck(CLT.InhLastLetter.find({userId:_userId},{fields:{inheritorId:1}}).fetch(), 'inheritorId');
    }
    return result;
  },
  getLastLetterInheritors : function(_inheritorId){
    var result = [];
    if(Meteor.isServer){
      result =  _.pluck(CLT.InhLastLetter.find({inheritorId:_inheritorId},{fields:{userId:1}}).fetch(), 'userId');
    }
    return result;
  },
  setLastLetter : function(_contentData){
    var userId = _contentData.userId;
    var inheritorId = _contentData.inheritorId;
    CLT.InhLastLetter.upsert(
      {userId : userId, inheritorId : inheritorId},
      {$set:_contentData,
        $setOnInsert:{'regDate': global.fn_dateFormat().HMS}
      }
    );
  },
  //비유저 리스트 get
  getNonUserInhList : function(userId){
    return CLT.NonUserInh.find({inheriterId:userId}).fetch();
  },
  //비유져 삭제
  delNonUserInh : function(id){
    CLT.InhLastLetter.remove({inheritorId:id, userId : Meteor.userId()});
    return CLT.NonUserInh.remove({_id:id});
  }
});

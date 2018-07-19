import {global} from '/imports/global/global_things.js';
import {collections as CLT} from '/imports/global/collections.js';

Meteor.methods({
  insertStory: function(_data) {
    var _id = CLT.EnStory.insert(_data);

    var subjectInfo = global.fn_getSubjectInfo(_data.subType);
    var lifeMapObj = {
      contentId: _id,
      userId: _data.userId,
      keyword: subjectInfo.keyword,
      images: subjectInfo.images,
      mDate: _data.mDate,
      updateDate: global.fn_dateFormat().HMS,
      isUpdated: 'true',
      type : _data.type,
      subType : _data.subType,
      lock : _data.lock,
      batchDate: '',
    };
    Meteor.call('setLifeMap', '', lifeMapObj);

    Meteor.call('setPoint', 'PO0002', _data.userId, 'get', _data.type, _data.subType, _id);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0003', _data.userId, _data.type, _data.subType); //컨텐츠 작성
    }

    return _id;
  },
  storyUpsert: function(_id, _data) {
    var subjectInfo = global.fn_getSubjectInfo(_data.subType)
    var lifeMapObj = {
      // userId: _data.userId,
      keyword: subjectInfo.keyword,
      images: subjectInfo.images,
      mDate : _data.mDate,
      updateDate: global.fn_dateFormat().HMS,
      isUpdated: 'true',
      type : _data.type,
      subType : _data.subType,
      lock : _data.lock
    };
    Meteor.call('setLifeMap', _id, lifeMapObj);



    return CLT.EnStory.upsert(
      {'_id': _id},
      {$set: _data,
        $setOnInsert: {'_id':_id, 'regDate': global.fn_dateFormat().HMS}
      }
    );
  },
  removeStory : function(_contentId){
    if(Meteor.isServer){

      var story = CLT.EnStory.find({_id : _contentId},{fields:{images:1, type:1, subType:1, regDate:1, capsuleId:1, groupUsers:1,parentId:1}}).fetch()[0];


      // if(story && story.images.length> 0){
      //   //타임캡슐 삭제플레그 확인하여, false가 하나라도 있으면 삭제하니 않게 한다.
      //   if(story.type === 'TC' && story.subType==='TC0002'){
      //     // var friendCapsule = '';
      //     // if(story.capsuleId){
      //     //   //친구가 삭제할때 보낸사람 및 다른 친구꺼 삭제 확인
      //     //   friendCapsule = CLT.EnStory.find({_id: {$ne :_contentId}, $or:[{_id : story.capsuleId},{capsuleId : story.capsuleId}]}).count();
      //     // } else {
      //     //   //보낸사람이 삭제할때 친구꺼 삭제여부 확인
      //     //   friendCapsule = CLT.EnStory.find({capsuleId : story._id}).count();
      //     // }
      //     deleteCnt = CLT.EnStory.find({deleted: false, $or:[{_id : story.capsuleId},{capsuleId : story.capsuleId}]}).count();
      //
      //     //내꺼 포함해서 카운트가 1보다 크면 아직 삭제하지 않은 친구가 있다는것 즉 1보다 작거나 같으면 이미지 삭제
      //     if(deleteCnt <= 1){
      //       global.fn_deleteS3Img(story.images);
      //     }
      //   } else {
      //     global.fn_deleteS3Img(story.images);
      //   }
      // }








      if(story.type === 'TC' && story.subType==='TC0002'){
        var deleteCnt = 0;
        var id = _contentId;
        if(story.capsuleId){
          id = story.capsuleId;
        }
        var tempData = CLT.EnStory.find({$or:[{_id : id},{capsuleId : id}]},{fields:{_id:1,deleted:1,isSend:1}}).fetch();
        var contentIds = _.pluck(tempData, '_id');
        var senderContent = _.findWhere(tempData, {isSend:true});
        var deleteCnt = _.where(tempData, {deleted:false});

        //내꺼 포함해서 카운트가 1보다 크면 아직 삭제하지 않은 친구가 있다는것 즉 1보다 작거나 같으면 이미지 삭제
        if(deleteCnt.length <= 1){
          // console.log('타임캡슐 전체 삭제');
          //이미지, 글 모두 삭제


          //스토리삭제
          CLT.EnStory.remove({_id : {$in:contentIds}});
          //좋아요 삭제
          CLT.ImsLike.remove({contentId : {$in:contentIds}});
          //댓글 삭제
          CLT.ImsComment.remove({contentId : {$in:contentIds}});

          //이미지 있을경우 삭제
          if(story && story.images.length> 0){
            global.fn_deleteS3Img(story.images);
          }

        } else {
          // console.log('타임캡슐 삭제 플래그 표시');
          //해당 플래그 업데이트(deleted : true > false)
          CLT.EnStory.update({_id:_contentId},{$set:{deleted:true}});
        }
      } else if(story.groupUsers){
          var deleteCnt = 0;
          var id = _contentId;
          if(story.parentId){
            id = story.parentId;
          }
          var tempData = CLT.EnStory.find({$or:[{_id : id},{parentId : id}]},{fields:{_id:1,deleted:1,isSend:1}}).fetch();
          // console.log(tempData);
          var contentIds = _.pluck(tempData, '_id');
          var senderContent = _.findWhere(tempData, {isSend:true});
          var deleteCnt = _.where(tempData, {deleted:false});

          //내꺼 포함해서 카운트가 1보다 크면 아직 삭제하지 않은 친구가 있다는것 즉 1보다 작거나 같으면 이미지 삭제
          if(deleteCnt.length <= 1){
            // console.log('공유 전체 삭제');
            //이미지, 글 모두 삭제


            //스토리삭제
            CLT.EnStory.remove({_id : {$in:contentIds}});
            //좋아요 삭제
            CLT.ImsLike.remove({contentId : {$in:contentIds}});
            //댓글 삭제
            CLT.ImsComment.remove({contentId : {$in:contentIds}});

            //이미지 있을경우 삭제
            if(story && story.images.length> 0){
              global.fn_deleteS3Img(story.images);
            }

          } else {
            // console.log('공유 삭제 플래그 표시');
            // 해당 플래그 업데이트(deleted : true > false)
            CLT.EnStory.update({_id:_contentId},{$set:{deleted:true}});
          }
      } else{
        //일반주제 삭제
        if(story && story.images.length> 0){
          global.fn_deleteS3Img(story.images);
        }
        //스토리삭제
        CLT.EnStory.remove({_id : _contentId});
        //좋아요 삭제
        CLT.ImsLike.remove({contentId : _contentId});
        //댓글 삭제
        CLT.ImsComment.remove({contentId : _contentId});
      }

      //오늘의 질문 삭제
      var question = CLT.EnQuestionHistory.find({contentId : _contentId, userId: Meteor.userId()}).count();
      if(question > 0){
        CLT.EnQuestionHistory.remove({contentId : _contentId, userId: Meteor.userId()});

        if(global.fn_dateFormat(story.regDate).YMD === global.fn_dateFormat().YMD){
          Meteor.users.update({_id: Meteor.userId()},{$unset:{'profile.question': ""}});
        }
      }



    }
  },
  getEndingNoteData:function(_userId, _searchObj, _count, _dateArr){
    // console.log('server ON');
    var result = {};
    if(Meteor.isServer){
      var lockObj = {};
      var sharedObj = {};
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

      //공유글 포함 필터1(기본)
      if(!_searchObj.showShared){
        //공유받은글 제외
        sharedObj = {$or:[{isSend:{$ne:false}},{type:'TC'}]}; //공유받은글 제외
      }

      //비밀글 포함 필터2(친구방분, 상속인방문)
      if(Meteor.userId() !== _userId){

        //그럼 친구? 상속?
        var isPass = Meteor.users.findOne({_id:_userId},{fields:{'profile.isPassAway':1}}).profile.isPassAway;

        if(isPass === true){
          //사망유져
          var resMsg = CLT.Inh.findOne({userId:Meteor.userId()},{fields:{acceptInh:{$elemMatch:{sendingUserUId:_userId} }}});
          var lockTf = {};
          if(!resMsg.acceptInh[0].secret){
            lockObj={lock:false};
          }
        }else{
          //친구
          lockObj={lock:false};
          sharedObj = {$or:[{isSend:{$ne:false}},{type:'TC'}]}; //공유받은글 제외
        }
      }

      var limitNum = global.limit.endingNote;

      var bucketSearchOption = [];
      if(_searchObj.text){
        bucketSearchOption.push({"title":{$regex:".*"+ _searchObj.text +".*"}});
        bucketSearchOption.push({"pureContext":{$regex:".*"+ _searchObj.text +".*"}});
        bucketSearchOption.push({"mDate":{$regex:".*"+ _searchObj.text +".*"}});
        bucketSearchOption.push({"tagList":{$in:[_searchObj.text]}});
      }else{
        bucketSearchOption.push({});
      }

      if(_searchObj.type && _searchObj.type.length > 0 && _searchObj.type[0] !== 'AL'){
        bucketSearchOption.push({"type":{$in:_searchObj.type}});
        bucketSearchOption.push({"subType":{$in:_searchObj.subType}});
      }
      var bucketListData = CLT.EnBucketList.find({$or:bucketSearchOption}).fetch();
      var bucketListIds = _.pluck(bucketListData, '_id');
      if(bucketListIds.lenth > 0){
        searchOption.push({"bucketId":{$in:bucketListIds}});
      }


      var timelineData = CLT.EnStory.find({$and:[{'userId':_userId},{deleted:{$ne:true}},lockObj,sharedObj,{$or:searchOption},{$and:searchFilter}]},{sort:{mDate:-1, updateDate:-1},skip:_count, limit:limitNum}).fetch();

      _.map(timelineData, function(item){
        var dDayInfo = global.fn_diffDate(item.mDate, global.fn_dateFormat().YMD);

        //템플릿 정보 가져오기
        var tempDesign = global.fn_getTimelineTempInfo(item.type, item.subType);
        item.tempType = tempDesign.tempType;
        item.lineColor = tempDesign.lineColor;
        item.templateName = tempDesign.templateName;
        item.icon = tempDesign.icon;
        item.isShared = false;
        if(item.groupUsers){
          item.isShared = true;
        }

        var bucketDate = {};
        var subjectInfo = global.fn_getSubjectInfo(item.subType)
        switch(item.type){
          case "BL":
            bucketDate = CLT.EnBucketList.find({_id : item.bucketId}).fetch()[0];
            item.images = bucketDate.images ? bucketDate.images : [];
            item.title = bucketDate.title;
            item.category = bucketDate.category;
            item.tagList = bucketDate.tagList;
            break;
          case "BS":
            var storyBL = CLT.EnStory.find({bucketId : item.bucketId, type:'BL', userId:_userId},{sort:{regDate:-1}}).fetch()[0];
            bucketDate = CLT.EnBucketList.find({_id : item.bucketId},{sort:{regDate:-1}}).fetch()[0];
            item.bImage = bucketDate.images[0];
            item.bTitle = bucketDate.title;
            item.bIsCompleted = storyBL ? storyBL.isCompleted : false;
            item.category = bucketDate.category;
            item.tagList = bucketDate.tagList;
            break;
          case "TC":
            var targetId = item.targetId;
            var targetInfo = Meteor.users.find({_id:{$in:targetId}},{fields:{'profile.nickName':1}}).fetch();

            // console.log(targetInfo+", "+targetId.length);
            var targetNames = _.chain(targetInfo).pluck('profile').pluck('nickName').value();

            var nameTemp = {};
            var targetCnt = targetNames.length;
            if(targetNames.length > 1){
              nameTemp = global.chooseAndCnt(targetNames, 1);
              targetNames = nameTemp.arr + '님 외 ' + nameTemp.cnt+'명';
            } else {
              targetNames = targetNames + '님';
            }



            // console.log(targetCnt);
            item.senderId = '';
            if(item.capsuleId){
              var senderId = CLT.EnStory.find({_id : item.capsuleId},{fields:{userId:1}}).fetch()[0];
              item.senderId = item.targetId[0];
            }



            // console.log(item.senderId);
            var openDay = global.fn_dateFormat(item.mDate).korYMD;
            item.shareInfo = '';
            item.subTitle = '';
            item.sendDate = '';
            if(item.isOpened){ //개봉된 타임캡슐
              // item.context = 'OPEN';
              if(targetId.length === 0){ //나에게 쓴 타임캡슐
              //   item.capsuleImage = '/images/bg/timecapsule_me_open.svg';
              //   item.title = '<span class="to-me">타임캡슐</span>이 개봉되었습니다.';
                item.sendDate = global.fn_dateFormat(item.regDate).korYMD + '에 보냄';
                item.subTitle = '<span class="to-me">나</span>에게 보낸 타임캡슐입니다.';
              } else {
                if(item.capsuleId){ //친구에게 받은 타임캡슐
                  item.subTitle = '<span>' + targetNames + '</span>이 보낸 타임캡슐입니다.';
                  item.sendDate = global.fn_dateFormat(item.regDate).korYMD + '에 받음';
              //     item.capsuleImage = '/images/bg/timecapsule_friend_open.svg';
              //     item.title = '<span>' + targetNames + '님</span>이 보낸 타임캡슐을 개봉했습니다.';
                } else { //친구에게 보낸 타임캡슐
                  var opendCnt = CLT.EnStory.find({capsuleId : item._id, isOpened:true}).count();
                  item.shareInfo = '('+opendCnt + '/' + targetCnt + '명 개봉)';
                  item.subTitle = '<span>' + targetNames + '</span> 에게 보낸 타임캡슐입니다.';
                  item.sendDate = global.fn_dateFormat(item.regDate).korYMD + '에 보냄';
              //     item.capsuleImage = '/images/bg/timecapsule_friend_open.svg';
              //     item.title = '<span class="to-me">' + targetNames + '님</span>이 타임캡슐을 개봉했습니다.';
                }
              }
            } else { //미개봉된 타임캡슐
              item.context = 'D'+dDayInfo.flag + dDayInfo.diffDay;
              if(targetId.length === 0){ //나에게 쓴 타임캡슐
                item.capsuleImage = '/images/bg/timecapsule_me.svg';
                item.title = '<span class="to-me">' + openDay + '</span>에 개봉 할 수 있습니다.';
                item.subTitle = '<span class="to-me">나</span>에게 보낸 타임캡슐입니다.';
                item.sendDate = global.fn_dateFormat(item.regDate).korYMD + '에 보냄';

                //개봉일 또는 개봉일이 지났을때 처리
                if(dDayInfo.flag === '+'){
                  item.title = '<span class="to-me">개봉일</span>이 지났습니다. OPEN 해주세요';
                }
                if(dDayInfo.diffDay === 'day'){
                  item.title = '<span class="to-me">개봉일</span>입니다. OPEN 해주세요';
                }
              }  else {
                if(item.capsuleId){ //친구에게 받은 타임캡슐
                  item.capsuleImage = '/images/bg/timecapsule_friend.svg';
                  item.title = '<span>' + openDay + '</span>에 개봉하실 수 있습니다.';
                  item.sendDate = global.fn_dateFormat(item.regDate).korYMD + '에 받음';


                  //개봉일 또는 개봉일이 지났을때 처리
                  if(dDayInfo.flag === '+'){
                    item.title = '개봉일이 지났습니다. OPEN 해주세요';
                  }
                  if(dDayInfo.diffDay === 'day'){
                    item.title = '개봉일입니다. OPEN 해주세요';
                  }
                } else { //친구에게 보낸 타임캡슐
                  item.capsuleImage = '/images/bg/timecapsule_friend.svg';
                  item.title = '<span>' + targetNames + '</span>에게 보낸 타임캡슐입니다.';
                  var opendCnt = CLT.EnStory.find({capsuleId : item._id, isOpened:true}).count();
                  item.sendDate = global.fn_dateFormat(item.regDate).korYMD + '에 보냄';
                  item.shareInfo = '('+opendCnt + '/' + targetCnt + '명 개봉)';
                }
              }
            }
          break;
          // default:
          //   item.tempType = 'temp1';
          //   item.lineColor = 'red';
          //   item.templateName = "timelineTemplate01";
          //   item.icon = tempDesign.icon ? tempDesign.icon : "icon-im";
        }

        if(_.contains(_dateArr, item.mDate)){
          item.date = null;
        } else {
          var date = global.fn_getDatePart("yearMonthDateDay", item.mDate);
          item.date = date;
          item.dateStyle = '';
          if(dDayInfo.flag==='-' && dDayInfo.diffDay !== 'day'){
            // 미래일경우
            item.dateStyle = 'future';
          } else if (dDayInfo.diffDay === 'day'){
            item.dateStyle = 'today';
            item.date = '오늘';
          }
          _dateArr.push(item.mDate);
        }

        //대표이미지 선정
        if(item.images.length > 0){
          item.image = item.images[0];
        }
      });

      result = {
        timelineInfo : timelineData,
        isDataExist : timelineData.length > 0 || _count > 0 ? true : false,
        bySearch : bySearch,
        //조회 텍스트 확인용
        searchObj : _searchObj,
        // check : searchOption,
        // check2 : bucketSearchOption,
        // check3 : searchFilter,
        //final데이터 인지 확인
        isFinalData : timelineData.length < 5 ? true : false,
        dateArr : _dateArr
      };
    }

    return result;
  },
  getContentCount : function(_userId, _lock){
    if(Meteor.isServer){
      var lockObj = {};
      if(_lock){
        lockObj ={
          lock : false
        };
      }
      return CLT.EnStory.find({$and:[{userId:_userId}, lockObj]}).count();
    }
  },
  getExpectAge : function(_userId){
    var result = {};
    if(Meteor.isServer){
      var myBirthDay = Meteor.users.find({_id:_userId}).fetch()[0].profile.birthday;
      var myAge = global.fn_getMyAge(myBirthDay, global.fn_dateFormat().YMD);

      var today = new Date();
      var leftLiveAge = "50";
      if(CLT.ImsExplifeAvg.findOne({'currentAge':myAge})){
        leftLiveAge = CLT.ImsExplifeAvg.findOne({'currentAge':myAge}).expLife;
      }

      if(Meteor.users.find({_id:_userId}).fetch()[0].profile.expLife){
        leftLiveAge = Meteor.users.find({_id:_userId}).fetch()[0].profile.expLife - myAge;
      }

      var expYear = today.getFullYear() + leftLiveAge;
      dDate = Math.floor(expYear) + '-12-31'; //기대수명이 다하는 날짜;

      var dateArray = dDate.split("-");
      var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);
      var betweenDay = (dateObj.getTime() -today.getTime())/1000/60/60/24;

      var expDays = betweenDay;
      var expYears = Math.floor(expDays / 365);
      var expMonth = Math.floor(expDays % 365 / 30);
      var expDay = Math.floor(expDays % 365 % 30);

      if(expYears === 0){
        expYears='';
      } else {
        expYears = expYears + '년 ';
      }

      if(expMonth === 0){
        expMonth = '';
      } else {
        expMonth = expMonth + '개월 ';
      }

      if(expDay === 0){
        expDay = '';
      } else {
        expDay = expDay + '일 ';
      }

      result = {
        dDate : dDate, //기대수명 종료일
        date : expYears + expMonth + expDay, // 남은 일수
        age : Math.round(leftLiveAge + myAge), //기대수명
        birth : global.fn_dateFormat(myBirthDay).korYMD, //내 생일
        birthDate : myBirthDay
      };
    }

    return result;
  },
  setExpectLife:function(_userUid, _expAge){
    return Meteor.users.update(
      {_id:_userUid},
      {$set:{'profile.expLife':_expAge}}
    );
  },
  getStoryById : function(_contentId, _limit){
    var result = {};
    if(Meteor.isServer){
      result = CLT.EnStory.find({_id:_contentId}).fetch()[0];

      //댓글, 좋아요를 가져오기위한 _id 설정
      result.groupId = [_contentId];
      result.fcmInfo = [{_id:result._id, userId:result.userId}];
      result.isShared = false;
      //타임캡슐일경우 좋아요, 댓글을 _id들로 가져와야하기때문에 GroupId를 설정함
      var tempData = []
      if(result.subType === 'TC0002'){
        if(result.isSend){
          tempData = CLT.EnStory.find({$or : [{_id:_contentId},{capsuleId:_contentId}], deleted:{$ne:true}, isOpened:true},{fields:{_id:1, userId:1}}).fetch();
          //[{_id:'aaaaaaaaa', userId:'efwefsf'},{_id:'eeefefaefwef', userId:'wdf,wdfwd'}]
          result.fcmInfo = tempData;
          result.groupId = _.pluck(tempData, '_id');

        } else {
          tempData = CLT.EnStory.find({$or : [{_id:result.capsuleId},{capsuleId:result.capsuleId}], deleted:{$ne:true}, isOpened:true},{fields:{_id:1, userId:1}}).fetch();
          result.fcmInfo = tempData;
          result.groupId = _.pluck(tempData, '_id');
        }
      } else if (result.groupUsers) {
        result.isShared = true;
        if(result.isSend){
          tempData = CLT.EnStory.find({$or : [{_id:_contentId},{parentId:_contentId}], deleted:{$ne:true}},{fields:{_id:1, userId:1}}).fetch();
          result.fcmInfo = tempData;
          result.groupId = _.pluck(tempData, '_id');
        } else {
          tempData = CLT.EnStory.find({$or : [{_id:result.parentId},{parentId:result.parentId}], deleted:{$ne:true}},{fields:{_id:1, userId:1}}).fetch();
          result.fcmInfo = tempData;
          result.groupId = _.pluck(tempData, '_id');
        }
      }

      if(result.type === 'BS'){
        result.bucketTitle = '';
        var bucketData = CLT.EnBucketList.find({_id:result.bucketId},{fields:{_id:1, title:1}}).fetch()[0];
        if(bucketData){
          result.bucketTitle = bucketData.title;
        }

      }

      if(!result){
        return;
      }
      if( result.images && result.images.length > 0){
        result.titleImage = result.images[0];
        result.images.splice(0,1);
      }

      var userInfo = global.fn_getUserCommonInfo(result.userId);
      // console.log(userInfo);
      result.userId = userInfo.userId;
      result.name = userInfo.name;
      result.nickName = userInfo.nickName;
      result.profileImg =  userInfo.profileImg;
    }
    return result;
  },
  getEditStoryById : function(_contentId, _limit){
    var result = {};
    if(Meteor.isServer){
      result = CLT.EnStory.find({_id:_contentId}).fetch()[0];
      if(result){
        result.context = result.context.replace(/<p>/g, "");
        result.context = result.context.replace(/<\/p>/g, "");
        result.context = result.context.replace(/<br>/g, "\n");
        result.context = result.context.replace(/&nbsp;/g, " ");
      }
    }
    return result;
  },
  setTimeCapsuleOpen: function(_contentId, _capsuleId, _userId){
    if(Meteor.isServer){
      CLT.EnStory.update({_id:_contentId},{$set:{isOpened:true}});
      CLT.ImsLifeMap.update({contentId:_contentId},{$set:{isOpened:true}});
      // var capsuleData = CLT.EnStory.find({_id:_contentId}).fetch()[0];
      // if(capsuleData.capsuleId){
      //   //내가 받은 사람일때
      //
      //   // 1. 나이외에 같은 타임캡슐을 받은 사람중 개봉되지 않은 캡슐이 있는지 확인
      //   var closedCapsuleCount = CLT.EnStory.find({capsuleId:_capsuleId, isOpened:false, _id:{$ne:_contentId}}).count();
      //   if(closedCapsuleCount > 0){
      //     // 2. 있다면 내꺼만 개봉
      //     CLT.EnStory.update({_id:_contentId},{$set:{isOpened:true}});
      //
      //   } else {
      //     // 2. 없다면 내꺼와 보낸사람 타임캡슐 모두 오개봉 설정
      //     CLT.EnStory.update({$or:[{_id:_contentId, userId:_userId},{_id:_capsuleId}]},{$set:{isOpened:true}},{multi:true});
      //   }
      //
      // } else {
      //   //내가 보낸사람일때 (나에게 보낸 타임캡슐 개봉)
      //   CLT.EnStory.update({_id:_contentId},{$set:{isOpened:true}});
      // }
    }
  },
  getCapsuleFriends: function(_capsuleId){
    var result = {};
    var isSender = false;
    var senderName = '';
    var regDate =  '';
    var userArr = [];
    var sender = {};
    if(Meteor.isServer){
      //전체 유처 ID 찾기
      var capsuleGroupdata = CLT.EnStory.find({$or:[{_id: _capsuleId},{capsuleId:_capsuleId}]},{fields:{userId:1, isOpened:1, isSend:1}}).fetch();

      _.map(capsuleGroupdata, function(item){
        var data = {};
        var userInfo = Meteor.users.find({_id:item.userId},{fields:{'profile.profileImg' : 1, 'profile.name':1, 'profile.nickName':1}}).fetch()[0];
        data = {
          userId : item.userId,
          isOpened : item.isOpened,
          profileImg : userInfo.profile.profileImg,
          name : userInfo.profile.name,
          nickName : userInfo.profile.nickName
        }
        if(item.isSend){
          sender = {
            userId : item.userId,
            isOpened : item.isOpened,
            profileImg : userInfo.profile.profileImg,
            name : userInfo.profile.name,
            nickName : userInfo.profile.nickName
          }
        }
        userArr.push(data);
      });

      result = {
        senderData :sender,
        friendsData : userArr,
      }

      // 타임캡슐 변경 전
      // var senderData = CLT.EnStory.find({_id: _capsuleId, userId: Meteor.userId()}).fetch();
      // var friednsCapsule = [];
      // if(senderData.length > 0){
      //   isSender = true;
      //   regDate = senderData[0].regDate;
      //   friednsCapsule = CLT.EnStory.find({$or:[{capsuleId : _capsuleId}]},{fields:{isOpened:1, userId:1}}).fetch();
      //   var tempSender = Meteor.users.find({_id:Meteor.userId()},{fields:{'profile.name':1}}).fetch()[0];
      //   senderName = tempSender.profile.name;
      //
      //   _.map(friednsCapsule, function(item){
      //     var data = {};
      //     var userInfo = Meteor.users.find({_id:item.userId},{fields:{'profile.profileImg' : 1, 'profile.name':1}}).fetch()[0];
      //     data = {
      //       userId : item.userId,
      //       isOpened : item.isOpened,
      //       profileImg : userInfo.profile.profileImg,
      //       name : userInfo.profile.name,
      //     }
      //     userArr.push(data);
      //   });
      //
      // } else {
      //   //받은사람
      //   isSender = false;
      //   friednsCapsule = CLT.EnStory.find({_id : _capsuleId},{fields:{isOpened:1, userId:1, regDate:1}}).fetch();
      //   regDate = friednsCapsule[0].regDate;
      //
      //   var data = {};
      //   var userInfo = Meteor.users.find({_id:friednsCapsule[0].userId},{fields:{'profile.profileImg' : 1, 'profile.name':1}}).fetch()[0];
      //
      //   senderName = userInfo.profile.name;
      //   data = {
      //     userId : friednsCapsule[0].userId,
      //     isOpened : friednsCapsule[0].isOpened,
      //     profileImg : userInfo.profile.profileImg,
      //     name : userInfo.profile.name,
      //   }
      //   userArr.push(data)
      // }
      //
      // result = {
      //   senderName : senderName,
      //   isSender : isSender,
      //   regDate : regDate,
      //   friendsData : userArr,
      // }
    }

    return result;
  },
  getSharedFriends: function(_contentId){
    var result = {};
    var isSender = false;
    var senderName = '';
    var regDate =  '';
    var userArr = [];
    var sender = {};
    if(Meteor.isServer){
      //전체 유처 ID 찾기
      var groupdata = CLT.EnStory.find({$or:[{_id: _contentId},{parentId:_contentId}]},{fields:{userId:1, isSend:1}}).fetch();

      _.map(groupdata, function(item){
        var data = {};
        var userInfo = Meteor.users.find({_id:item.userId},{fields:{'profile.profileImg' : 1, 'profile.name':1, 'profile.nickName':1}}).fetch()[0];
        data = {
          _id : item.userId,
          profileImg : userInfo.profile.profileImg,
          name : userInfo.profile.name,
          nickName : userInfo.profile.nickName,
        };
        if(item.isSend){
          sender = {
            _id : item.userId,
            profileImg : userInfo.profile.profileImg,
            name : userInfo.profile.name,
            nickName : userInfo.profile.nickName,
          };
        }
        userArr.push(data);
      });

      result = {
        senderData :sender,
        friendsData : userArr,
      };
    }

    return result;
  },
  getLikeComCount : function(buckId){
    if(Meteor.isServer){
      var storyIds = CLT.EnStory.find({bucketId:buckId},{fields:{_id:1}}).fetch();
      storyIds = _.pluck(storyIds,"_id");
      var rawUsers = CLT.ImsComment.rawCollection();
      var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
      var pipeline = [
      		// Stage 1
      		{
      			$match: {contentId:{$in:storyIds}}
      		},
      		// Stage 2
      		{
      			$group: {
      				_id:"$contentId",
              comcount:"$contentId", comcount:{$sum:1}
      			}
      		},
      	]
      var commentCount = aggregateQuery(pipeline);

      rawUsers = CLT.ImsLike.rawCollection();
      aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
      pipeline = [
      		// Stage 1
      		{
      			$match: {contentId:{$in:storyIds}}
      		},
      		// Stage 2
      		{
      			$group: {
      				_id:"$contentId",
              likeCount:"$contentId", likeCount:{$sum:1}
      			}
      		},
      	]
      var likeCount = aggregateQuery(pipeline);

      return {commentCount,likeCount};
    }
  },
  getContentData : function(_contentId){
    if(Meteor.isServer){
      return CLT.EnStory.find({_id:_contentId},{fields:{_id:0}}).fetch()[0];
    }
  },
  updateSharedData : function(_updateData, _contentId){
    if(Meteor.isServer){
      CLT.EnStory.update({_id:_contentId},{$set:_updateData});
    }
  },
  getSharedData : function(_contentId, _userIds){
    if(Meteor.isServer){
      var tempData = CLT.EnStory.find({parentId:_contentId, userId:{$in:_userIds}},{fields:{_id:1}}).fetch();
      return _.pluck(tempData, '_id');
    }
  },
  removeSharedData : function(_contentIds){
    if(Meteor.isServer){
      CLT.EnStory.remove({_id:{$in:_contentIds}});
      CLT.ImsLifeMap.remove({contentId:{$in:_contentIds}});
    }
  },
  setSharedDatas : function(_sharedData){
    var result = [];
    if(Meteor.isServer){

      _.map(_sharedData, function(_data){
        var _id = CLT.EnStory.insert(_data);
        result.push({_id : _id, userId:_data.userId})

        var subjectInfo = global.fn_getSubjectInfo(_data.subType);
        var lifeMapObj = {
          contentId: _id,
          userId: _data.userId,
          keyword: subjectInfo.keyword,
          images: subjectInfo.images,
          mDate: _data.mDate,
          updateDate: global.fn_dateFormat().HMS,
          isUpdated: 'true',
          type : _data.type,
          subType : _data.subType,
          lock : _data.lock,
          batchDate: '',
        };
        Meteor.call('setLifeMap', '', lifeMapObj);

        Meteor.call('setPoint', 'PO0002', _data.userId, 'get', _data.type, _data.subType, _id);

        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
          Meteor.call('setLog', 'LG0003', _data.userId, _data.type, _data.subType); //컨텐츠 작성
        }

      });
    }
    return result;
  },
  getReceiversContents : function(_contentId, _type){
    var result = [];
    if(Meteor.isServer){
      if(_type=== 'TC'){
        result = CLT.EnStory.find({capsuleId:_contentId}).fetch();
      } else {
        result = CLT.EnStory.find({parentId:_contentId}).fetch();
      }
    }
    return result;
  }
});

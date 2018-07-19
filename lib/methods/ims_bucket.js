import {global} from '/imports/global/global_things.js';
import {collections as CLT} from '/imports/global/collections.js';

Meteor.methods({
  //버킷리스트 전체
  getAllBucketList:function(_userId, _count, _searchObj){
    if(!_count) _count = 0;
    if(!_searchObj) {
      _searchObj = {
        text:"",
        type:['BL0001'],
      };
    }
    // console.log(_userId, _filter, _count, _searchObj);
    var result = {
      bucketData : [],
      isFinalData : false,
      isDataExist : true
    };

    if(Meteor.isServer){
      // var result = CLT.EnStory.find({'userId':userId},{sort:{regDate:-1}}).fetch();

      //관리자 인지 여부 확인
      var tempSaveObj = {};
      var userInfo = Meteor.users.find({_id:_userId}).fetch()[0];

      if(userInfo && userInfo.auth === 'admin'){
        tempSaveObj = {};
      } else {
        tempSaveObj = {
          tempSave : false
        };
      }

      var searchOption = [];
      // console.log("searchWord  "+_searchObj);
      if(_searchObj.text){
        searchOption.push({"title":{$regex:".*"+ _searchObj.text +".*"}});
        // searchOption.push({"context":{$regex:".*"+ _searchObj.text +".*"}});
        searchOption.push({"pureContext":{$regex:".*"+ _searchObj.text +".*"}});
        searchOption.push({"tagList":{$in:[_searchObj.text]}});
      }else{
        searchOption.push({});
      }

      var searchFilter = [];
      //카테코리 영역 필터
      if(_searchObj.type && _searchObj.type.length > 0 && _searchObj.type[0] !== 'BL0001'){
        searchFilter.push({"category":{$in:_searchObj.type}});
        bySearch = true;
      } else {
        searchFilter.push({});
      }

      var limitNum = global.limit.bucket;


      //전체 버킷에 좋아요, 따라하기 카운트를 더한 전체 집합 추가
      // 그안에서 limit걸어서 타깃 서정



      var allBL;
      var bucketCnt = 0;
      // if(_filter === 'BL0001') {
      //   allBL = CLT.EnBucketList.find({$and:[
      //             {$or:searchOption},
      //             tempSaveObj,
      //             {lock:false}
      //   ]},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
      //   bucketCnt = CLT.EnBucketList.find(tempSaveObj,{lock:false}).count();
      //   // allBL = CLT.EnBucketList.find({},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
      // } else {
        allBL = CLT.EnBucketList.find({$and:[{$and:searchFilter},{$or:searchOption},tempSaveObj,{lock:false}]},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
        bucketCnt = CLT.EnBucketList.find({$and : [{$and:searchFilter},{$or:searchOption}, tempSaveObj,{lock:false}]}).count();
      // }

      var completeBlId;
      //로그인 한경우
      if(_userId){
        //내 버킷리스트 에서 완료된것만 가져오기
        var myBucketList = CLT.EnStory.find({userId:_userId, type:'BL', isCompleted : true},{fields:{'bucketId' : 1}}).fetch();
        completeBlId = _.pluck(myBucketList, 'bucketId');
      }

      var bucketData = [];
      //전체 버킷리스트 가져오기
      _.each(allBL, function(item){

        var isCompleted = false;

        //완료여부 체크하기
        if(_.contains(completeBlId, item._id)){
          isCompleted = true;
        }
        // console.log(item.title);
        //데이터 입력
        var bucketInfo = {
          _id : item._id,
          isCompleted : isCompleted,
          category : item.category,
          title : item.title,
          image : item.images[0],
          likeCnt : CLT.ImsLike.find({contentId: item._id}).count(),
          followCnt : CLT.EnStory.find({bucketId:item._id, type:'BL', isCompleted:false}).count(),
          storyCnt : CLT.EnStory.find({bucketId:item._id, type:'BS'}).count(),
          tempSave : item.tempSave,

        };

        bucketData.push(bucketInfo);
      });

      result.bySearch = _searchObj.text.trim().length > 0 ? true : false;
      result.bucketData = bucketData;
      result.searchObj = _searchObj;
      result.isDataExist = bucketData.length > 0 || _count > 0 ? true : false;
      result.isFinalData = bucketData.length < limitNum ? true : false;
      result.bucketCnt = bucketCnt;
      result.category = _searchObj.type.length > 1 ? '검색' : (_searchObj.type[0] === 'AL' ? '전체' : global.fn_getCodeName('bucket', _searchObj.type[0]));
    }


    return result;
  },
  //내가따라한 버킷리스트만
  getMyBucketList:function(_userId, _count, _searchObj){

    if(!_count) _count = 0;
    if(!_searchObj) {
      _searchObj = {
        text:"",
        type:['BL0001'],
      };
    }





    // console.log(_userId, _filter, _count, _searchStr);
    var result = {
      bucketData : [],
      isFinalData : false,
      isDataExist : true
    };

    if(Meteor.isServer){
      // var result = CLT.EnStory.find({'userId':userId},{sort:{regDate:-1}}).fetch();

      //관리자게정인지 확인
      var tempSaveObj = {};
      var userInfo = Meteor.users.find({_id:_userId}).fetch()[0];

      if(userInfo && userInfo.auth === 'admin'){
        tempSaveObj = {};
      } else {
        tempSaveObj = {
          tempSave : false
        };
      }


      var searchOption = [];
      // console.log("searchWord  "+_searchObj.text);
      if(_searchObj.text){
        searchOption.push({"title":{$regex:".*"+ _searchObj.text +".*"}});
        searchOption.push({"context":{$regex:".*"+ _searchObj.text +".*"}});
        searchOption.push({"tagList":{$in:[_searchObj.text]}});
      }else{
        searchOption.push({});
      }

      var searchFilter = [];
      //카테코리 영역 필터
      if(_searchObj.type && _searchObj.type.length > 0 && _searchObj.type[0] !== 'BL0001'){
        searchFilter.push({"category":{$in:_searchObj.type}});
        bySearch = true;
      } else {
        searchFilter.push({});
      }

      var limitNum = global.limit.bucket;

      //내 버킷리스트를 가져온다(등록일 순으로)
      var myBucketList = CLT.EnStory.find({userId:_userId, type:'BL', isCompleted:false},{fields:{'bucketId' : 1, 'isCompleted':1, 'regDate':1}, sort:{regDate:-1}, skip:_count, limit:limitNum}).fetch();
      var bucketId = _.pluck(myBucketList, 'bucketId');

      //완료된 버킷리스트 확인
      var completeBlId;
      // var completeBl = _.where(myBucketList, {isCompleted : true});
      var completeBl = CLT.EnStory.find({userId:_userId, type:'BL', isCompleted:true, bucketId:{$in:bucketId}},{fields:{bucketId:1}}).fetch();
      if(completeBl && completeBl.length>0){
        completeBlId = _.pluck(completeBl, 'bucketId');
      }


      var mybucketIds = _.pluck(CLT.EnStory.find({userId:_userId, type:'BL', isCompleted:false},{fields:{bucketId:1}}).fetch(), 'bucketId');
      var myCompletedBucketIds =  _.pluck(CLT.EnStory.find({userId:_userId, type:'BL', isCompleted:true},{fields:{bucketId:1}}).fetch(), 'bucketId');

      var allBL;
      var myBucketCnt = 0;
      var myCompletedCnt = 0;
      // if(_filter === 'AL') {
      //
      //   allBL = CLT.EnBucketList.find({$and:[{_id:{$in:bucketId}},{$or:searchOption},tempSaveObj]}).fetch();
      //   myBucketCnt = CLT.EnBucketList.find({$and:[{_id:{$in:mybucketIds}},tempSaveObj]}).count();
      //   myCompletedCnt = CLT.EnBucketList.find({$and:[{_id:{$in:myCompletedBucketIds}},tempSaveObj]}).count();
      //   // allBL = CLT.EnBucketList.find({$or:searchOption},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
      //   // allBL = CLT.EnBucketList.find({},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
      // } else {
        allBL = CLT.EnBucketList.find({$and:[{_id : {$in:bucketId}}, {$and:searchFilter}, {$or:searchOption}, tempSaveObj]},{sort:{regDate:-1}}).fetch();
        myBucketCnt = CLT.EnBucketList.find({$and:[{$and:searchFilter}, {_id:{$in:mybucketIds}}, tempSaveObj]}).count();
        myCompletedCnt = CLT.EnBucketList.find({$and:[{$and:searchFilter},{_id:{$in:myCompletedBucketIds}},tempSaveObj]}).count();
        // allBL = CLT.EnBucketList.find({$and:[{category:_filter},{$or:searchOption}]},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
        // allBL = CLT.EnBucketList.find({category:_filter},{sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
      // }

      var bucketData = [];
      //전체 버킷리스트 가져오기
      _.each(allBL, function(item){

        var regDate = item.regDate;

        _.each(myBucketList, function(data){
          if(item._id === data.bucketId){
            regDate = data.regDate;
          }
        });

        var isCompleted = false;

        //완료여부 체크하기
        if(_.contains(completeBlId, item._id)){
          isCompleted = true;
        }
        // console.log(item.title);
        //데이터 입력
        var bucketInfo = {
          _id : item._id,
          isCompleted : isCompleted,
          category : item.category,
          title : item.title,
          image : item.images[0],
          likeCnt : CLT.ImsLike.find({contentId: item._id}).count(),
          followCnt : CLT.EnStory.find({bucketId:item._id, type:'BL', isCompleted:false}).count(),
          storyCnt : CLT.EnStory.find({bucketId:item._id, type:'BS'}).count(),
          tempSave : item.tempSave,
          regDate : regDate,
        };

        bucketData.push(bucketInfo);
      });



      result.bySearch = _searchObj.text.trim().length > 0 ? true : false;
      result.bucketData = _.chain(bucketData).sortBy('regDate').reverse().value();
      result.searchObj = _searchObj;
      result.isDataExist = bucketData.length > 0 || _count > 0 ? true : false;
      result.isFinalData = bucketData.length < limitNum ? true : false;
      result.myBucketCnt = myBucketCnt;
      result.myCompletedCnt = myCompletedCnt;
    }

    return result;
  },
  //따라하기 등록
  setFollowBucket:function(_contentId, _userId){
    if(Meteor.isServer){
      var date = global.fn_dateFormat().HMS;
      var insertObj ={
        bucketId : _contentId,
        type : 'BL',
        subType : 'BL0001',
        userId : _userId,
        regDate : date,
        updateDate : date,
        mDate : global.fn_dateFormat(date).YMD,
        isCompleted : false,
        images : [],
        tagList : [],
        lock : false,
        context : '',
        title : ''
      };

      return CLT.EnStory.insert(insertObj);
    }
  },
  setBucketComplete: function(_contentId, _userId){
    // console.log(_contentId, _userId);
    if(Meteor.isServer){
      // return CLT.EnStory.update(
      //   {userId : _userId, bucketId : _contentId, type:'BL'},
      //   {$set : {isCompleted:true}}
      // );

      //따라하기 시작 시작을 체크하기 위함
      var completeCount  = CLT.EnStory.find({userId : _userId, type:'BL', isCompleted:true}).count();
      var followBucketInfo = CLT.EnStory.find({userId : _userId, bucketId:_contentId, type:'BL', isCompleted:false},{fields:{mDate:1}}).fetch()[0];

      var date = global.fn_dateFormat().HMS;
      var insertObj ={
        bucketId : _contentId,
        type : 'BL',
        subType : 'BL0002',
        userId : _userId,
        regDate : date,
        updateDate : date,
        mDate : global.fn_dateFormat(date).YMD,
        followDate : followBucketInfo.mDate,
        isCompleted : true,
        completeOrder : completeCount + 1,
        images : [],
        tagList : [],
        lock : false,
        context : '',
        title : ''
      };

      return CLT.EnStory.insert(insertObj);
    }
  },

  //해당 리스트의 전체 버키스토리
  getAllBuckyStory:function(_bucketListId, count){
    if(Meteor.isServer){
    // var result = CLT.EnStory.find(
    //   {'bucketId':_bucketListId,'lock':false},
    //   {sort:{regDate:-1},skip:count, limit:count+5}).fetch();
    // return result;
    // console.log(_bucketListId);
    var _userId = Meteor.userId();
    var limCount = 0;
    if(!count){
      limCount = 1;
    }else{
      limCount = count;
    }
    var rawUsers = CLT.EnStory.rawCollection();
    var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
    var pipeline = [
      {$match: {
        $and : [
          {$or : [
            {userId: _userId},
            {userId:{$ne:_userId}, lock:false}]
          },
          {bucketId:_bucketListId},
          {type:"BS"},
          {parentId:{$eq:null}}
        ]
      }},
      // Stage 2
      {$lookup:{
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users_docs"
      }},
      { $sort :
        {
          regDate :-1,
          mDate: -1
        }
      },
      // Stage 3
      {
        $skip: count
      },
      // Stage 4
      {
        $limit: limCount * global.limit.bucketStory
      },
      {$project: {
          "userId":1,
          "type":1,
          "subType":1,
          "mDate":1,
          "lock":1,
          "title":1,
          "context":1,
          "images":1,
          "tagList":1,
          "regDate":1,
          "users_docs._id" : 1,
          "users_docs.username" : 1,
          "users_docs.profile.name" : 1,
          "users_docs.profile.nickName" : 1,
          "users_docs.profile.profileImg" : 1,
      }},
      {$unwind:{
          path : "$users_docs",
          preserveNullAndEmptyArrays : false // optional
      }}
    ];
    var result = aggregateQuery(pipeline);
    return result;
  }
  },
  //내 버키스토리
  getMYBuckyStory:function(_bucketListId, _userId, count){
    if(Meteor.isServer){
      var limCount = 0
      if(!count){
        limCount = 1
      }else{
        limCount = count
      }
    var rawUsers = CLT.EnStory.rawCollection();
    var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
    var pipeline = [
      {$match: {
        bucketId:_bucketListId,
        userId:_userId,
        type:"BS",
        parentId:{$eq:null}
      }},
      // Stage 2
      {$lookup:{
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users_docs"
      }},
      { $sort :
        {
          regDate :-1,
          mDate: -1
        }
      },
      // Stage 3
      {
        $skip: count
      },
      // Stage 4
      {
        $limit: limCount * 5
      },
      {$project: {
          "userId":1,
          "type":1,
          "subType":1,
          "mDate":1,
          "lock":1,
          "title":1,
          "context":1,
          "images":1,
          "tagList":1,
          "regDate":1,
          "users_docs._id" : 1,
          "users_docs.username" : 1,
          "users_docs.profile.name" : 1,
          "users_docs.profile.nickName" : 1,
          "users_docs.profile.profileImg" : 1,
      }},
      {$unwind:{
          path : "$users_docs",
          preserveNullAndEmptyArrays : false // optional
      }}
    ];
    var result = aggregateQuery(pipeline);
    return result;
    }
  },

  //친구 버키스토리
  // getMYFrienBuckyStory:function(_bucketListId, _userId, count){
  //   if(Meteor.isServer){
  //     var limCount = 0
  //     if(!count){
  //       limCount = 1
  //     }else{
  //       limCount = count
  //     }
  //   var rawUsers = CLT.EnStory.rawCollection();
  //   var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
  //   var pipeline = [
  //     {$match: {
  //       bucketId:_bucketListId,
  //       userId:_userId,
  //       type:"BS"
  //     }},
  //     // Stage 2
  //     {$lookup:{
  //         from: "users",
  //         localField: "userId",
  //         foreignField: "_id",
  //         as: "users_docs"
  //     }},
  //     { $sort :
  //       {
  //         regDate :-1,
  //         mDate: -1
  //       }
  //     },
  //     // Stage 3
  //     {
  //       $skip: count
  //     },
  //     // Stage 4
  //     {
  //       $limit: limCount * 5
  //     },
  //     {$project: {
  //         "userId":1,
  //         "type":1,
  //         "subType":1,
  //         "mDate":1,
  //         "lock":1,
  //         "title":1,
  //         "context":1,
  //         "images":1,
  //         "tagList":1,
  //         "regDate":1,
  //         "users_docs._id" : 1,
  //         "users_docs.username" : 1,
  //         "users_docs.profile.name" : 1,
  //         "users_docs.profile.nickName" : 1,
  //         "users_docs.profile.profileImg" : 1,
  //     }},
  //     {$unwind:{
  //         path : "$users_docs",
  //         preserveNullAndEmptyArrays : false // optional
  //     }}
  //   ];
  //   var result = aggregateQuery(pipeline);
  //   return result;
  //   }
  // },
  //버키스토리 모아보기
  getAllDicBuckyStory:function(_count, _searchObj, _searchDateTime){
    var result = {};
    if(!_count) _count = 0;
    if(!_searchObj) {
      _searchObj = {
        text:"",
        type:['BL0001'],
      };
    }

    if(Meteor.isServer){
      var limitNum = global.limit.bucket;
      var searchOption = [];
      // console.log("searchWord  "+_searchObj);
      if(_searchObj.text){
        searchOption.push({"title":{$regex:".*"+ _searchObj.text +".*"}});
        searchOption.push({"context":{$regex:".*"+ _searchObj.text +".*"}});
        searchOption.push({"tagList":{$in:[_searchObj.text]}});
      }else{
        searchOption.push({});
      }

      var searchFilter = [];
      var filteredBucket = [];
      var bucketIdOption = {};
      //카테코리 영역 필터
      if(_searchObj.type && _searchObj.type.length > 0 && _searchObj.type[0] !== 'BL0001'){
        //카테고리 필터가 있을경우
        searchFilter.push({"category":{$in:_searchObj.type}});
        filteredBucket = CLT.EnBucketList.find({$and:searchFilter},{fields:{_id:1}}).fetch();
        var ids = _.pluck(filteredBucket, '_id');
        bucketIdOption = {bucketId:{$in:ids}};
        // result = CLT.EnStory.find({
        //   $and:[
        //     {$or:searchOption},
        //     {type:'BS'},
        //     {bucketId:{$in:ids}},
        //     {$or:[
        //       {isSend:{$eq:true}},
        //       {isSend:{$ne:false}}
        //     ]},
        //     {regDate : {$lte:_searchDateTime}}
        //   ]},
        //   {sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();

      }
      // else {
      //   //카테고리 필터가 없을 경우
      //   searchFilter.push({});
      //   result = CLT.EnStory.find({
      //     $and:[
      //       {$or:searchOption},
      //       {type:'BS'},
      //       {$or:[
      //         {isSend:{$eq:true}},
      //         {isSend:{$ne:false}}
      //       ]},
      //       {regDate : {$lte:_searchDateTime}}
      //     ]},
      //     {sort:{regDate:-1, updateDate:-1}, skip:_count, limit:limitNum}).fetch();
      // }














      var rawUsers = CLT.EnStory.rawCollection();
      var aggregateQuery = Meteor.wrapAsync(rawUsers.aggregate, rawUsers);
      var pipeline = [
        {$match: {
          $and:[
            {lock:false},
            {$or:searchOption},
            {type:'BS'},
            {$or:[
              {isSend:{$eq:true}},
              {isSend:{$ne:false}}
            ]},
            {regDate : {$lte:_searchDateTime}},
            bucketIdOption
          ]
        }},
        // Stage 2
        {$lookup:{
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "users_docs"
        }},
        {$lookup:{
            from: "imsLike",
            localField: "_id",
            foreignField: "contentId",
            as: "like"
        }},
        {$lookup:{
            from: "imsComment",
            localField: "_id",
            foreignField: "contentId",
            as: "comment"
        }},

        { $sort :
          {
            regDate :-1,
            mDate: -1
          }
        },
        // Stage 3
        {
          $skip: _count
        },
        // Stage 4
        {
          $limit: limitNum
        },
        {$project: {
            "userId":1,
            "type":1,
            "subType":1,
            "mDate":1,
            "lock":1,
            "title":1,
            "context":1,
            "images":1,
            "tagList":1,
            "regDate":1,
            "comment":1,
            "like":1,
            "users_docs._id" : 1,
            "users_docs.username" : 1,
            "users_docs.profile.name" : 1,
            "users_docs.profile.nickName" : 1,
            "users_docs.profile.profileImg" : 1,
        }},
        {$unwind:{
            path : "$users_docs",
            preserveNullAndEmptyArrays : false // optional
        }}
      ];
      result.buckyStoryData = aggregateQuery(pipeline);


      var option = {$and:[
        {lock:false},
        {$or:searchOption},
        {type:'BS'},
        {$or:[
          {isSend:{$eq:true}},
          {isSend:{$ne:false}}
        ]},
        {regDate : {$lte:_searchDateTime}},
        bucketIdOption
      ]};
      result.buckyStoryFullCnt = CLT.EnStory.find(option).count();
      result.searchObj = _searchObj;
    }

    return result;

  },
  // //버킷 카테고리별 get
  // getBucketDicData : function(categoryParam){
  //   if(Meteor.isServer){
  //     //관리자게정인지 확인
  //     var tempSaveObj = {};
  //     var userInfo = Meteor.users.find({_id:Meteor.userId()}).fetch()[0];
  //
  //     if(userInfo.auth === 'admin'){
  //       tempSaveObj = {};
  //     } else {
  //       tempSaveObj = {
  //         tempSave : false
  //       };
  //     }
  //
  //     var findObj = {};
  //     if(categoryParam){
  //       findObj = {$and:[{category:categoryParam}, tempSaveObj]};
  //     }
  //     return CLT.EnBucketList.find(findObj).fetch();
  //
  //   }
  // },
  //버킷리스트 id로 가져오기
  getBucketFromId : function(_contentId, _userId){
    var result = {};

    // console.log(_contentId);
    if(Meteor.isServer){

      //관리자게정인지 확인
      var tempSaveObj = {};
      var userInfo = Meteor.users.find({_id:_userId}).fetch()[0];

      if(userInfo && userInfo.auth === 'admin'){
        tempSaveObj = {};
      } else {
        tempSaveObj = {
          tempSave : false
        };
      }

      result = CLT.EnBucketList.find({$and:[{_id:_contentId},tempSaveObj]}).fetch()[0];
      // console.log(result);
      result.isCompleted = false;
      // result.isMyBucket = false;
      result.isUserBucket = result.userId ? true : false;

      if(!result){
        return;
      }
      if( result.images && result.images.length > 0){
        result.titleImage = result.images[0];
        result.images.splice(0,1);
      }

      var followCnt = 0;
      followCnt = CLT.EnStory.find({bucketId : _contentId, type:'BL', isCompleted:false}).count();
      result.followCnt = followCnt;
      if(_userId){
        var myBucket = CLT.EnStory.find({userId: _userId, bucketId : _contentId, type:'BL'},{fields:{isCompleted:1, _id:1, regDate:1}, sort:{regDate:-1}}).fetch()[0];
        // console.log(_userId, _contentId, myBucket);
        if(myBucket){
          result.myBucketId = myBucket._id;
          // result.isMyBucket = true;
          result.isCompleted = myBucket.isCompleted;
        }
      }
    }
    return result;
  },
  //버킷리스트 id로 가져오기
  getBucketById : function(_contentId){
    var result = {};

    // console.log(_contentId);
    if(Meteor.isServer){
      result = CLT.EnBucketList.find({$and:[{_id:_contentId}]}).fetch()[0];
    }
    return result;
  },
  //버킷 딕 스토리 카운트 함수
  getStoryCount : function(conId, userId){
    var resData = {};
    resData.all = CLT.EnStory.find({$and:[{bucketId:conId},{type:"BS"},{lock:false}]}).count();
    resData.my = CLT.EnStory.find({$and:[{bucketId:conId},{userId:userId},{type:"BS"}]}).count();
    return resData;
  },
  getOtherStoryCount : function(_contentId, _userId){
    var result = 0;
    if(Meteor.isServer){
       result = CLT.EnStory.find({
        $and:[
          {bucketId:_contentId},
          {userId:{$ne:_userId}},
          {type:{$in:["BS","BL"]}},
          {lock:false},
          {parentId:{$eq:null}}
        ]}).count();
    }
    return result;
  },
  getMyBucketCount : function(_userId){
    var result = {};
    if(Meteor.isServer){
      result.myBucketCnt = CLT.EnStory.find({userId:_userId, type:'BL'}).count();
      result.myCompletedCnt = CLT.EnStory.find({userId:_userId, type:'BL', isCompleted:true}).count();
    }
    return result;
  },



  //테스트서버용 임시 함수
  // onlyTestGetList : function(){
  //   if(Meteor.isServer){
  //     var resData = CLT.EnBucketList.findOne({'category':"되고싶은"});
  //     var commentsDatas = CLT.ImsComment.find({'postId':resData._id}).fetch();
  //     if(resData){
  //       resData.userId = "ponys.travel";
  //       resData.profileImg = "/images/common/icon_avata_img.png";
  //       resData.comments = commentsDatas;
  //     }
  //     return resData;
  //   }
  // },
  // createNewSampleBucketLs:function(){
  //   var bucketListData = [
  //     {
  //       // _id:'1231231231',
  //       isCompleted : true,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0002_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231232',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0014_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231233',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0020_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231234',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0032_thumb.jpg"
  //     },
  //
  //     {
  //       // _id:'1231231235',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0136_thumb.jpg"
  //     },
  //
  //     {
  //       // _id:'1231231236',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0278_thumb.jpg"
  //     },
  //
  //     {
  //       // _id:'1231231237',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0354_thumb.jpg"
  //     },
  //
  //     {
  //       // _id:'1231231238',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0553_thumb.jpg"
  //     },
  //
  //     {
  //       // _id:'1231231239',
  //       isCompleted : true,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0582_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231230',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0627_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231212',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0687_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231213',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0716_thumb.jpg"
  //     },
  //     {
  //       // _id:'1231231214',
  //       isCompleted : false,
  //       category : '',
  //       title : "결혼 진심으로 축하한다 앞으로도 좋은 일만 가득하길 바래~",
  //       image : "http://images.hwlife.hscdn.com//library/i0757_thumb.jpg"
  //     },
  //   ];
  //
  //   if(!CLT.EnBucketList.find().count() ){
  //     _.each(bucketListData, function(data){
  //       CLT.EnBucketList.insert(data);
  //     });
  //   }
  // },
  setBucketList :function(_id, _data){
    if(Meteor.isServer){

      return CLT.EnBucketList.upsert(
        {'_id': _id},
        {$set: _data,
          $setOnInsert: {'regDate': global.fn_dateFormat().HMS}
        }
      );
    }
  },
  removeBucketList : function(_contentId, _type){
    if(Meteor.isServer){

      if(Meteor.userId()){

        if(_type==="delete"){
          //내 버킷리스트 삭제
          CLT.EnBucketList.remove({_id : _contentId});
        }
        //타임라인 버팃리스트 제거
        CLT.EnStory.remove({type:'BL', userId:Meteor.userId(), bucketId:_contentId});
        //라이프맵 버킷리스트 제거
        CLT.ImsLifeMap.remove({contentId:_contentId, type:'BL', userId:Meteor.userId()});
        //버킷리스트 좋아요 제거
        CLT.ImsLike.remove({contentId : _contentId});

        //버킷리스트 아이디가 _contentId
        var myBs = CLT.EnStory.find({type:'BS', userId:Meteor.userId(), bucketId:_contentId, isSend:{$ne:false}}).fetch(); //해당 버키스토리

        _.each(myBs, function(item){
          if(item.isSend){
            //공유된 글의 _id 가져오기
            var bstoryTemp = CLT.EnStory.find({$or:[
              {_id:item._id},
              {parentId:item._id}
            ]},{fields:{_id:1}}).fetch();

            var bsIds= _.pluck(bstoryTemp, '_id');

            //공유자의 버키스토리라면 공유된 버키스토리도 일반스토리로 변경
            CLT.EnStory.update({$or:[
              {_id:item._id},
              {parentId:item._id}
            ]},{$set:{type:'IM', subType:'IM0001', lock:false}, $unset:{bucketId:1}},{multi:true});

            //라이프맵 버키스토리 타입 업데이트
            CLT.ImsLifeMap.update({contentId:{$in:bsIds}},{$set:{type:'IM', subType:'IM0001', lock:false}},{multi:true});

          } else {
            //공유자가 아니라면 해당 버키스토리만 업데이트
            CLT.EnStory.update({_id:item._id},{$set:{type:'IM', subType:'IM0001', lock:false}, $unset:{bucketId:1}});

            //라이프맵 버키스토리 타입 업데이트
            CLT.ImsLifeMap.update({contentId:item._id},{$set:{type:'IM', subType:'IM0001', lock:false}});
          }
        })








        //버키스토리 공유여부 확인












      //
      //
      //   var storyTemp = CLT.EnStory.find({bucketId:_contentId, userId:Meteor.userId(), $or:[{type:'BS'}, {type:'BL'}]},{fields:{_id:1, images:1}}).fetch();
      //   // console.log(storyTemp);
      //   _.each(storyTemp, function(item){
      //     if(item.images && item.images.length>0){
      //       global.fn_deleteS3Img(item.images);
      //       // console.log('버키스토리 이미지 삭제');
      //     }
      //
      //     //좋아요 삭제
      //     CLT.ImsLike.remove({contentId : item._id});
      //     //댓글 삭제
      //     CLT.ImsComment.remove({contentId :item._id});
      //     //버키스토리 삭제
      //     // console.log('버키스토리 삭제');
      //     CLT.EnStory.remove({_id:item._id});
      //   });
      //
      //
      //
      //     //버킷리스트 이미지 삭제
      //     var bucketTemp = CLT.EnBucketList.find({_id : _contentId}).fetch()[0];
      //     // console.log(bucketTemp);
      //     if(bucketTemp && bucketTemp.contextImage.length> 0){
      //       // console.log('버킷리스트 이미지 삭제');
      //       global.fn_deleteS3Img(bucketTemp.contextImage);
      //     }
      //
      //     //좋아요 삭제
      //     CLT.ImsLike.remove({contentId : _contentId});
      //     //버킷리스트 삭제
      //     // console.log('버킷리스트 삭제');
      //     CLT.EnBucketList.remove({_id : _contentId});
        }
      }
  },
  checkIsBlLock :function(_bucketId){
    if(Meteor.isServer){
      var bucketData = CLT.EnBucketList.find({_id:_bucketId},{fields:{lock:1, userId:1}}).fetch()[0];
      return bucketData;
    }
  },

});

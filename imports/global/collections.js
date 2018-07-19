var collections = {};
//로컬
collections.LocalCollection = new Mongo.Collection(null);
collections.LcInhContentsList = new Mongo.Collection(null);

//엔딩노트
collections.EnBucketList = new Mongo.Collection('endingNoteBucketList');
collections.EnQuestionList = new Mongo.Collection('endingNoteQuestionList');
collections.EnQuestionHistory = new Mongo.Collection('endingNoteQuestionHistory');
collections.EnStory = new Mongo.Collection('endingNoteStory');

//상속
collections.Inh = new Mongo.Collection('inheritance');
collections.InhGuardians = new Mongo.Collection('inheritanceGuardians');
collections.InhLastLetter = new Mongo.Collection('inheritanceLastLetter');
collections.NonUserInh = new Mongo.Collection('nonUserInheritance');

//IMS
collections.ImsUserRelation = new Mongo.Collection("imsUserRelation");
collections.ImsComment = new Mongo.Collection('imsComment');
collections.ImsLike = new Mongo.Collection('imsLike');
collections.ImsLog = new Mongo.Collection("imsLog");
collections.ImsCodeOption = new Mongo.Collection('imsCodeOption');
collections.ImsExplifeAvg = new Mongo.Collection('imsExpectLife');
collections.ImsPointHis = new Mongo.Collection('imsPointHistory');
collections.ImsLifeMap = new Mongo.Collection('imsLifeMap');
collections.ImsOffNoti = new Mongo.Collection('imsOfficailNoti');

collections.FcmHistory = new Mongo.Collection('fcmHistory');
collections.ImsSysConf = new Mongo.Collection('imsSystemConfig');
export {collections};

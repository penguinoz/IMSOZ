import {global} from '/imports/global/global_things.js';
//#####################################################################################
// 글로벌 헬퍼
//#####################################################################################
UI.registerHelper('g_isLogined', function() {
  return Meteor.userId();
});

//target이 source보다 크면 true
UI.registerHelper('g_isGreaterThan', function(target, source) {
  return global.fn_isGreaterThan(target, source);
});
//target이 source보다 작으면 true
UI.registerHelper('g_isLessThan', function(target, source) {
  return global.fn_isLessThan(target, source);
});

//2개값 덧셈
UI.registerHelper('g_sumation', function(param1, param2) {
  return global.fn_sumation(param1, param2);
});
//2개값 뺄셈
UI.registerHelper('g_subtraction', function(param1, param2) {
  return global.fn_subtraction(param1, param2);
});

UI.registerHelper('g_getTodate', function() {
  return global.fn_dateFormat().YMD;
});

UI.registerHelper('g_isEqual', function(item, targetItem){
  var result = false;
  if(_.isEqual(item, targetItem)){
    result = true;
  }
  return result;
});

UI.registerHelper('g_isExist', function(item){
  return global.fn_isExist(item);
});

UI.registerHelper('g_makeImageSrc', function(_imageInfo, _type){
  return global.fn_makeImageSrc(_imageInfo, _type);
});


UI.registerHelper('g_getArrayItemByKey', function(_arrayList, _returnKey){
  return _arrayList[0][_returnKey];
});

UI.registerHelper('g_getThumbUri', function(_imagesData){

  if(_imagesData){
    var thumbItem = _.findWhere(_imagesData, {type:'_thumb'});
    return thumbItem.uri;
  } else {
    return false;
  }
});
//코드 이름 가져오기 type:"bucetk" or "main", "subject"
UI.registerHelper('g_getCodeName', function(_type, _code ){
  return global.fn_getCodeName(_type, _code);
});

UI.registerHelper('g_getSubjectList', function(_code ){
  return global.fn_getSubjectList(_code);
});
UI.registerHelper('g_getAllSubjectList', function(){
  return global.fn_getAllSubjectList();
});

UI.registerHelper('g_getLifeMapSubject', function(){
  return global.fn_getLifeMapSubject();
});


UI.registerHelper('g_getSubjectChild', function(_gCode ){
  return global.fn_getSubjectChild(_gCode);
});

UI.registerHelper('g_getLifeMapSubjectChild', function(_gCode ){
  return global.fn_getLifeMapSubjectChild(_gCode);
});



UI.registerHelper('g_getCodeList', function(_type){
  return global.fn_getCodeList(_type);
});

UI.registerHelper('g_dateFormChange', function(date, type) {
  var result = null;
  switch(type){
    case 'default' :
      result = global.fn_dateFormat(date).HMS;
    break;
    case 'HMS' :
      result = global.fn_dateFormat(date).HMS;
    break;
    case 'YMD' :
      result = global.fn_dateFormat(date).YMD;
    break;
    case 'kor' :
      result = global.fn_dateFormat(date).kor;
    break;
    case 'korYMD' :
      result = global.fn_dateFormat(date).korYMD;
    break;
    case 'hm' :
      result = global.fn_dateFormat(date).hm;
    break;
    case 'korYMDH' :
      result = global.fn_dateFormat(date).korYMDH;
    break;

  }
  return result;
});

UI.registerHelper('g_getDateNewType', function(_date){
  return global.fn_getDateNewType(_date);
});

UI.registerHelper('g_getDateRange', function(_sDate, _eDate){
  return global.fn_getDateRange(_sDate, _eDate);
});
UI.registerHelper('g_getAge', function(_date){
  return global.fn_getAge(_date);
});

UI.registerHelper('g_confrim', function(){
  return Session.get('confrim_center');
});

UI.registerHelper('g_makeCodeFormate', function(_code){
  return global.fn_makeCodeFormate(_code);
});

UI.registerHelper("and", function() {
  return Array.prototype.slice.call(arguments, 0, -1).filter(arg => arg == true).length == arguments.length - 1;
});

UI.registerHelper("or", function() {
  return Array.prototype.slice.call(arguments, 0, -1).filter(arg => arg == true).length > 0;
});

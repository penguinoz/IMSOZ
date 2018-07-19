import {global} from '/imports/global/global_things.js';

Template.searchBox.onCreated(function(){
  var instance = this;
  instance.searhData = ReactiveVar();
  instance.searhData.set(this.data);
  instance.templateName = new ReactiveVar(this.data.templateName);
  instance.placeHolder = this.data.placeHolder;

  instance.fullType = [];
  instance.fullSubType = [];

  instance.typeCode = new ReactiveVar();
  instance.subTypeCode = new ReactiveVar();
  instance.selectedTypeList = new ReactiveVar();
  instance.selectedSubTypeList = new ReactiveVar();
  instance.searchText = new ReactiveVar();
  instance.showLock = new ReactiveVar(true);
  instance.showShared = new ReactiveVar(true);
  instance.isPageOwner = new ReactiveVar(this.data.isPageOwner);

  var defaultCode = ['AL'];
  var searchCode = [];

  if(this.data.templateName === 'bucketList'){
    //버킷리스트 검색일경우
    instance.templateName.set('bucketList');
    searchCode = global.fn_getSearchCode('bucket');
    searchCode = _.reject(searchCode, function(item){return item.code === 'BL0001'});
    // instance.typeCode.set(searchCode);
    if(Session.get('searchObj')){
      // instance.selectedTypeList.set(Session.get('searchObj').type);
      instance.searchText.set(Session.get('searchObj').text);
    }else{
      // instance.selectedTypeList.set(defaultCode);
    }
  } else {
    //타임라인 검색일경우
    searchCode = global.fn_getSearchCode('searchCode');
    instance.fullType = _.where(searchCode, {group : 'g0001'});
    instance.fullSubType  = _.where (searchCode, {group : 'g0100'});
    instance.typeCode.set(instance.fullType);
    instance.subTypeCode.set(instance.fullSubType);

    if(Session.get('searchObj')){
      instance.selectedTypeList.set(Session.get('searchObj').type);
      instance.selectedSubTypeList.set(Session.get('searchObj').subType);
      instance.searchText.set(Session.get('searchObj').text);
      instance.showLock.set(Session.get('searchObj').showLock);
      instance.showShared.set(Session.get('searchObj').showShared);
    } else{
      instance.selectedTypeList.set(defaultCode);
      instance.selectedSubTypeList.set(defaultCode);
    }
  }





  $("html").addClass('scroll-hidden');
});

Template.searchBox.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  $('.prevent.over-pop').slideDown(500);
  setTimeout(function(){
    $('#searchField').focus();
  }, 500);
});

// Template.searchBox.helpers({
//   hpSearchData: function(){
//     return Template.instance().searhData.get();
//   }
// });


Template.searchBox.events({
  // "click #btnSearch": function(e, t){
  //   e.preventDefault();
  //   $("html").removeClass('scroll-hidden');
  //   var searchStr = $('#searchField').val();
  //   Session.set('searchBox', false);
  //   Template[t.templateName].__helpers.get('hpSearchCallBack')(searchStr);
  // },
  "click #blackPage": function(e, t){
    $("html").removeClass('scroll-hidden');
    Session.set('searchBox', false);
  },
  "mousedown #btnSearch": function(e,t){
    e.preventDefault();
    $("html").removeClass('scroll-hidden');
    var searchObj;
    var templateName = t.templateName.get();
    if(templateName === 'bucketList'){

      templateName = Session.get("bucketList_Template").templateName;
      searchObj = {
        text : $('#searchField').val(),
        // type : t.selectedTypeList.get(),
      };
    } else {
      searchObj = {
        text: $('#searchField').val(),
        type : t.selectedTypeList.get(),
        subType: t.selectedSubTypeList.get(),
        // showLock : $("#isSecret")[0].checked,
      };
      if(t.isPageOwner.get()){
        searchObj.showLock = $("#isSecret")[0].checked;
        searchObj.showShared = $("#isShared")[0].checked;
      }
    }
    Session.set('searchBox', false);
    Session.set('searchObj', searchObj);
    Template[templateName].__helpers.get('hpSearchCallBack')(searchObj);
  },
  // "focusout #searchField": function(e, t){
  //   // console.log('focusout');
  //   $("html").removeClass('scroll-hidden');
  //   Session.set('searchBox', false);
  // },
  'keypress': function (e,t) {
    // e.preventDefault();
    if (e.which === 13) {
      $("html").removeClass('scroll-hidden');
      var searchObj;
      var templateName = t.templateName.get();
      if(templateName === 'bucketList'){
        templateName = Session.get("bucketList_Template").templateName;
        searchObj = {
          text : $('#searchField').val(),
          // type : t.selectedTypeList.get(),
        };
      } else {
        searchObj = {
          text: $('#searchField').val(),
          type : t.selectedTypeList.get(),
          subType: t.selectedSubTypeList.get(),
          // showLock : $("#isSecret")[0].checked,
        };
        if(t.isPageOwner.get()){
          searchObj.showLock = $("#isSecret")[0].checked;
          searchObj.showShared = $("#isShared")[0].checked;
        }
      }
      Session.set('searchBox', false);
      Session.set('searchObj', searchObj);
      // Template[templateName].__helpers.get('hpSearchCallBack')(searchObj);
      Template[templateName].__helpers.get('hpSearchCallBack')(searchObj);
    }
  },
  //주제 선택
  "click .type-area span":function(e, t){
    e.preventDefault();

    var selectedCode = this.code;
    var temp = [];
    var subTemp = [];
    // var subTypes = [];
    if( e.currentTarget.id === 'AL'){
      // 전체 선택
      // 1) 영역을 모두 표시
      // subTypes = t.fullSubType;
      temp.push('AL');
      subTemp.push('AL');
    } else {
      //다른 주제 선택
      // 1) 전체 선택 해제
      temp = t.selectedTypeList.get();
      temp = global.fn_removeInArr(temp, 'AL');
      // 2) 선택된 주제 표시
      if(_.contains(temp, selectedCode)){
        // 선택 해제
        if(selectedCode === 'BL'){
          temp = global.fn_removeInArr(temp, 'BS');
        }

        if(temp.length === 1){
          temp = [];
          subTemp = [];
          // alert('항목이 한 개 이상은 선택되어야 합니다.');
          // subTypes = t.fullSubType;
          temp.push('AL');
          subTemp.push('AL');
          t.selectedTypeList.set(temp);
          //영역 표시 및 활성화
          // t.subTypeCode.set(subTypes);
          t.selectedSubTypeList.set(subTemp);
          return;
        }

        temp = global.fn_removeInArr(temp, selectedCode);

        //영역이 사라지게 하는 소스 //임시로 막아놓음
        // // 주제에 해당하는 영역 표시 (선택된 주제에 따른 영역 제외시키기)
        // subTypes = t.subTypeCode.get(); //기존 선택 영역
        // subTypes = global.fn_getDifferenceData(subTypes, _.where(t.fullSubType, {pCode : selectedCode}));//기존영역 - 선택 주제 영역

        //영역 해제
        var prevTemp = [];
        prevTemp = t.selectedSubTypeList.get(); //기존선택 영역

        // selectedCode에 해당하는 영역들을 prevTemp에서 제거
        subTemp = _.where(t.fullSubType, {pCode : selectedCode});
        subTemp = _.pluck(subTemp, 'code'); //코드만 array로 도출
        if(selectedCode === 'BL'){
          subTemp.push('BS0001');
        }
        subTemp = _.difference(prevTemp, subTemp);
      } else {
        // 추가 선택
        if(selectedCode === 'BL'){
          temp.push('BS');
        }
        temp.push(selectedCode);

        //영역이 사라지게 하는 소스 //임시로 막아놓음
        // var preType = t.selectedTypeList.get();
        // if(preType && preType[0] === 'AL'){
        //   subTypes = [];
        // } else {
        //   subTypes = t.subTypeCode.get(); // 기존 영역
        // }
        // // 주제에 해당하는 영역 표시
        // subTypes = _.union(subTypes, _.where(t.fullSubType, {pCode : selectedCode})); //기존영역 + 추가된 영역

        // 영역 선택
        var prevTemp = [];
        prevTemp = t.selectedSubTypeList.get(); //기존선택 영역
        prevTemp = global.fn_removeInArr(prevTemp, 'AL'); //전체 항목 제거
        subTemp = _.where(t.fullSubType, {pCode : selectedCode}); //추가된 영역

        subTemp = _.pluck(subTemp, 'code'); //코드만 array로 도출
        subTemp = _.union(prevTemp, subTemp);// 기존, 추가 결합
        if(selectedCode === 'BL'){
          subTemp.push('BS0001');
        }

      }
    }
    //주제 선택 활성화
    t.selectedTypeList.set(temp);
    //영역 표시 및 활성화
    // t.subTypeCode.set(subTypes);
    t.selectedSubTypeList.set(subTemp);
  },
  //영역 선택
  "click .sub-type-area span":function(e, t){
    e.preventDefault();

    var selectedCode = this.code;
    var temp = [];
    var subTemp = [];
    if( e.currentTarget.id === 'AL'){
      temp.push('AL');
      subTemp.push('AL');
      t.selectedTypeList.set(temp);
    } else {
      //영역코드 설정
      subTemp = t.selectedSubTypeList.get();
      subTemp = global.fn_removeInArr(subTemp, 'AL');
      if(_.contains(subTemp, selectedCode)){
        //제거
        if(subTemp.length === 1){

          temp = [];
          subTemp = [];
          // alert('항목이 한 개 이상은 선택되어야 합니다.');
          temp.push('AL');
          subTemp.push('AL');
          t.selectedTypeList.set(temp);
          t.selectedSubTypeList.set(subTemp);
          return;
        }

        //영역코드 제거
        subTemp = global.fn_removeInArr(subTemp, selectedCode);

        //부모코드를 갖고 있는 '영역'들이 하나도 없으면 부모코드를 비활성화한다.
        var subCode = _.pluck(_.where(t.fullSubType, {pCode : this.pCode}), 'code');

        if(this.pCode === "BL"){
          subCode.push('BS0001');
        } else if(this.pCode === "BS"){
          subCode.push('BL0001');
          subCode.push('BL0002');
        }

        // subCode와 prevSubType에 일치하는게 없으면 해당 주제 비활성
        if(!_.find(subTemp, function(item){return _.contains(subCode, item)})){
          temp = t.selectedTypeList.get();

          temp = global.fn_removeInArr(temp, this.pCode);
          if(this.pCode === "BL" || this.pCode === "BS"){
            temp = global.fn_removeInArr(temp, 'BL');
            temp = global.fn_removeInArr(temp, 'BS');
          }
          t.selectedTypeList.set(temp);
        }
      } else {
        //추가
        //1. 영역에 해당하는 주제 활성화 판단
        if(!_.contains(t.selectedTypeList.get(), this.pCode)){
          //주제가 활성화 되어 있지 않으면 활성화
          var preType = t.selectedTypeList.get();
          if(preType && preType[0] === 'AL'){
            temp = [];
          } else {
            temp = t.selectedTypeList.get();
          }

          if(selectedCode === "BS0001"){
            temp.push('BL');
          }

          temp.push(this.pCode);
          t.selectedTypeList.set(temp);
        }
        subTemp.push(selectedCode);
      }
    }
    t.selectedSubTypeList.set(subTemp);

  }
});

Template.searchBox.helpers({
  hpFilterType: function(){
    if(Template.instance().templateName.get()=== 'bucketList'){
      return 'BL';
    } else {
      return 'IM';
    }
  },
  hpPlaceHolder: function(){
    return Template.instance().placeHolder;
  },
  hpTypeData : function(){
    return _.sortBy(Template.instance().typeCode.get());
  },
  hpSubTypeData : function(){
    return _.sortBy(Template.instance().subTypeCode.get(),'order');
  },
  hpSelectedTypes : function(_code){
    if(_.contains(Template.instance().selectedTypeList.get(), _code)){
      return 'selected';
    } else {
      return '';
    }
  },
  hpSeletedSubType : function(_code){
    if(_.contains(Template.instance().selectedSubTypeList.get(), _code)){
      return 'selected';
    } else {
      return '';
    }
  },
  hpSearchText : function(){
    return Template.instance().searchText.get();
  },
  hpLockChecked : function(){
    if(Template.instance().showLock.get()){
      return 'checked';
    } else {

      return '';
    }
  },
  hpSharedChecked : function(){
    if(Template.instance().showShared.get()){
      return 'checked';
    } else {

      return '';
    }
  },
  hpIsPageOwner : function(){
    return Template.instance().isPageOwner.get();
  },
});

Template.searchBox.onDestroyed(function(){
  $("html").removeClass('scroll-hidden');
});

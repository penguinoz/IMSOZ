import {global} from '/imports/global/global_things.js';

Template.floatButtonList.onCreated(function(){
  var instance = this;
  instance.blink = this.data.blink ? 'blink' : '';
  instance.buttonInfo = new ReactiveVar();

  instance.categoryData = new ReactiveVar();
  instance.isSelected = new ReactiveVar(false);
  // var mainSubject = global.fn_getSubjectList();
  var mainSubject = [
    {code:"IM", subType:"IM0001", class:"row-1", dateTitle:"DT0001", icon:"im.svg", name:"스토리", order:1},
    {code:"TC", subType:"TC0001", class:"row-2", dateTitle:"DT0011", icon:"timecapsule1.svg", name:"타임캡슐(나에게)", order:2},
    {code:"TC", subType:"TC0002", class:"row-2", dateTitle:"DT0011", icon:"timecapsule2.svg", name:"타임캡슐(친구에게)", order:3},
    {code:"BD", subType:"BD0001", class:"row-3", dateTitle:"DT0001", icon:"child.svg", name:"육아일기", order:4},
    {code:"BD", subType:"BD0002", class:"row-3", dateTitle:"DT0001", icon:"pat.svg", name:"반려동물일기", order:5},
    {code:"EN", subType:"EN0001", class:"row-4", dateTitle:"DT0001", icon:"graveston.svg", name:"미리써보는유서", order:6},
  ];
  var buttonInfo = {};
  buttonInfo.blink = instance.blink;
  instance.buttonInfo.set(buttonInfo);
  instance.categoryData.set(mainSubject);
});

Template.floatButtonList.helpers({
  hpCategoryData: function(){
    return Template.instance().categoryData.get();
  },
  hpIsSelected: function(){
    return Template.instance().isSelected.get();
  }
});

Template.floatButtonList.events({
  "click .float-button-list a": function(e, t){
    e.preventDefault();
    // Session.set('categoryMenuPopup', true);
    if(t.isSelected.get()){
      //숨기기
      t.isSelected.set(false);
      $('.black-over.menu').addClass('display-none');
    } else {
      //리스트 표시
      t.isSelected.set(true);
      $('.black-over.menu').removeClass('display-none');

      if(global.writeLog){
        //로그 생성
        Meteor.call('setLog', 'LG0040', Meteor.userId(), '', '');
      }
    }
  },
  "click .write": function(e, t){
    e.preventDefault();

    var navData = {};
    if(Meteor.userId()){
      if(global.writeLog){
        navData ={
          editorTitle : this.name,
          type : this.code,
          subType : this.subType,
          dateTitle : this.dateTitle,
          prevTemplate : "endingNote",
          hint : {
            type : "P",
            text : "이야기를 작성해보세요",
          },
        };

        var logCode = 'LG0042';
        //로그 생성
        switch(this.code){
          case 'IM':
            logCode = 'LG0042';
          break;
          // case 'SC':
          //   logCode = 'LG0043';
          // break;
          // case 'CR':
          // logCode = 'LG0044';
          // break;
          // case 'DR':
          // logCode = 'LG0045';
          // break;
          case 'BD':
          logCode = 'LG0046';
          break;
          case 'TC':
          logCode = 'LG0047';
          break;
          case 'EN':
          navData.hint.type = "V";
          navData.hint.text = "예시)\nㅇ 삶을 뒤돌아보니...\n  -\n\nㅇ희망 묘비명\n  - \n\nㅇ상속\n  -\n\nㅇ 기부\n  -\n\nㅇ장기기증\n  -\n\nㅇ유언 집행자\n  -\n";
          logCode = 'LG0048';
          break;
        }
        Meteor.call('setLog', logCode, Meteor.userId(), '', this.subType); //스토리 선택
      }




      Session.set('navData', navData);

      Router.go("writeStory",{},{replaceState: false});
      Session.set('editor_addUserList', null);
      Session.set('categoryMenuPopup', false);
    } else {
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNote',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
    }


  }
});

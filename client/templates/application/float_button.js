Template.floatButton.onCreated(function(){
  var instance = this;
  instance.buttonInfo = new ReactiveVar();
  instance.routeInfo = new ReactiveVar();
  instance.prevTemplate = new ReactiveVar();
  instance.prevMenuInfo="";
  instance.blink = this.data.blink ? 'blink' : '';
  instance.type = this.data ? this.data.type : 'writeStory';
  // console.log('floatButton', instance.data.type);

  var buttonInfo = {};
  var className;
  var routeName;
  var writeStory = 'icon-search';
  var myBucket = 'icon-my';
  var inherit = '상속';

  // console.log(Session.get('navData'));


  if(!Session.get('navData'))
  {
    var navData ={
      contentId : null,
      type : "IM",
      category:"writeStory",
      prevTemplate : "endingNote"
    };

    Session.set('navData', navData);
  }



  switch(instance.type){
    case 'writeStory': //글쓰기 화면
      buttonInfo.iconName = 'icon-pen';
      routeName = null;
    break;
    case 'writeBuckyStory':
      buttonInfo.iconName = 'icon-pen';
      routeName = null;
    break;
    case 'myBucket': //내 버킷리스트보기 버튼
      buttonInfo.iconName = 'icon-my-bucket';
      routeName = null;
    break;
    case 'allBucket': //전체 리스트보기 버튼
      buttonInfo.iconName = 'icon-all-bucket';
      routeName = null;
    break;
    case 'addInheritor': //상속인 추가버튼
      // buttonInfo.iconName = 'icon-inheritance';
      // routeName = 'addInheritor';
      buttonInfo.iconName = 'icon-inheritance';
      routeName = null;
    break;
    case 'addGuardian': //가디언 추가버튼
      buttonInfo.iconName = 'icon-pen gurdian';
      routeName = 'addGuardian';
    break;
    case 'insertIhCode': //상속인 코드 입력 버튼
      buttonInfo.iconName = 'icon-document';
      routeName = null;
    break;
    default:
      buttonInfo.iconName = 'icon-pen';
      routeName = 'writeStory';
  }
  buttonInfo.type = 'flt-' + buttonInfo.iconName;
  buttonInfo.blink = instance.blink;
  instance.buttonInfo.set(buttonInfo);
  instance.routeInfo.set(routeName);
});

Template.floatButton.helpers({
  hpButtonInfo: function(){
    return Template.instance().buttonInfo.get();
  }
});

Template.floatButton.events({
  "click .float-button a": function(e, t){
    e.preventDefault();

    if(t.routeInfo.get()){
      if(Meteor.userId()){
        Router.go(t.routeInfo.get(),{},{replaceState: false});
      } else {
        // alert('로그인 후에 사용가능합니다.');
        var confrimData = {
          title : '로그인 후에 사용가능합니다.',
          context : '',
          templateName : 'endingNoteProfile',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        return;
        // Router.go('login',{},{replaceState: false});
      }
    }

  }
});

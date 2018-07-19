// var templateName = 'myPoint';
var instance;
Template.myPoint.onCreated(function(){
  instance = this;
  instance.pointData = ReactiveVar();
  instance.selectedUser = ReactiveVar();
  instance.dataCount = ReactiveVar();
  instance.limitDataSync = false;
  // instance.isClickedNext = ReactiveVar(false);
  //
  // var pointInfo = [
  //   {
  //     category:'스토리',
  //     type:'BS',
  //     title:'연료도 싸고 성능도 좋은 전기차 국가지원금을 통해서 ',
  //     image : '/images/common/icon_avata_img.png',
  //     date : '2018.04.12',
  //     point : '100'
  //   },
  //   {
  //     category:'스토리',
  //     type:'BS',
  //     title:'연료도 싸고 성능도 좋은 전기차 국가지원금을 통해서 ',
  //     image : '/images/common/icon_avata_img.png',
  //     date : '2018.04.12',
  //     point : '100'
  //   },
  //   {
  //     category:'스토리',
  //     type:'BS',
  //     title:'연료도 싸고 성능도 좋은 전기차 국가지원금을 통해서 ',
  //     image : '/images/common/icon_avata_img.png',
  //     date : '2018.04.12',
  //     point : '100'
  //   },
  //   {
  //     category:'추억',
  //     type:'IM',
  //     title:'연료도 싸고 성능도 좋은 전기차 국가지원금을 통해서 ',
  //     image : '/images/common/icon_avata_img.png',
  //     date : '2018.04.12',
  //     point : '100'
  //   },
  //   {
  //     category:'추억',
  //     type:'IM',
  //     title:'연료도 싸고 성능도 좋은 전기차 국가지원금을 통해서 ',
  //     image : '/images/common/icon_avata_img.png',
  //     date : '2018.04.12',
  //     point : '100'
  //   },
  //   {
  //     category:'버킷',
  //     type:'BL',
  //     title:'연료도 싸고 성능도 좋은 전기차 국가지원금을 통해서 ',
  //     image : '/images/common/icon_avata_img.png',
  //     date : '2018.04.12',
  //     point : '100'
  //   },
  // ];

  Meteor.call('getPoint', Meteor.userId(), 0, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.pointData.set(result);
    }
  });
  Meteor.call('getPointCount', Meteor.userId(),  0, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.dataCount.set(result);
    }
  });


});

Template.myPoint.onRendered(function(){
  // $(".addUser").height($(window).height());
  //무한스크롤
  $(window).scroll(function() {
    //limit cancle
    if(instance.dataCount.get() <= instance.pointData.get().pointInfo.length || instance.limitDataSync ){
      return;
    }
    //연속로딩 방지코딩
    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
    if (calc > 70) {
      instance.limitDataSync = true;
    //기존 데이터 가져오기
    var datacount = instance.pointData.get().pointInfo.length;
    Meteor.call('getPoint', Meteor.userId(), datacount, function(error, result){
      if(error){
        console.log(error);
      } else {
        var pointDatas = instance.pointData.get();
        pointDatas.pointInfo =  pointDatas.pointInfo.concat(result.pointInfo);
        // pointDatas.pointSum =  pointDatas.pointSum + result.pointSum;
        instance.pointData.set(pointDatas);
      }
      instance.limitDataSync = false;
    });

   }
  });
});


Template.myPoint.events({
});


Template.myPoint.helpers({
  hpSelectedUserInfo: function(){
    return Template.instance().selectedUser.get();
  },
  hpPointData: function(){
    return Template.instance().pointData.get();
  },
  hpSelect: function(_index){
    var result = false;
    var index = parseInt(Template.instance().selectedIndex.get());
    if(index === _index){
      result = true;
    }
    // console.log(Template.instance().selectedIndex.get(), ", "+_index, result);
    return result;
  },
  hpcategoryColor: function(_type){
    var result;
    switch(_type){
      case 'IM': case 'BD': case 'SC': case 'CA': case 'TQ': case 'TC': case 'NU': case 'MY':
        result = 'color-red border-color-red';
        break;
      case 'BS': case 'BL':
        result = 'color-green border-color-green';
        break;
      case 'IH':
        result = 'color-yellow border-color-yellow edit-position';
        break;
      case 'DR':
        result = 'color-red border-color-red edit-position';
        break;
      default :
        result = 'color-red border-color-red';
    }
    return result;
  },
  hpCategoryIcon : function(_type){
    var result;
    switch(_type){
      case 'IM': case 'BD': case 'SC': case 'CA': case 'TQ': case 'TC': case 'NU': case 'MY':
        result = 'icon-book border-color-red';
        break;
      case 'BS': case 'BL':
        result = 'icon-airplane ';
        break;
      case 'IH':
        result = 'icon-graveston ';
        break;
      case 'DR':
        result = 'icon-star border-color-red  ';
        break;
      default :
        result = 'icon-book border-color-red';
    }
    return result;
  }
});

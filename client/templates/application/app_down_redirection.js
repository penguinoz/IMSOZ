Template.appDownRedirection.onCreated(function(){
  var url = "";


  var mobile = (/iphone|ipad|ipod|android|diordna/i.test(navigator.userAgent.toLowerCase()));
  // alert('3 :' + navigator.userAgent.toLowerCase());
  if (mobile) {
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.search("diordna") > -1 || userAgent.search("android") > -1) {
          /* android */
          // alert('android');
          url = "https://play.google.com/store/apps/details?id=com.itsmystory";
      } else {
        // alert('ios');
        url = "https://itunes.apple.com/us/app/its-my-story-%EA%BF%88%EA%BE%B8%EB%8A%94-%EB%82%B4%EC%9D%BC%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0/id1386647750";
      }
  } else {
    url = "https://play.google.com/store/apps/details?id=com.itsmystory";
  }

  // if(window.webkit){
  //   // alert('애플')
  //   url = "https://itunes.apple.com/us/app/its-my-story-%EA%BF%88%EA%BE%B8%EB%8A%94-%EB%82%B4%EC%9D%BC%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0/id1386647750";
  // } else {
  //   // alert('안드로이드');
  //   url = "https://play.google.com/store/apps/details?id=com.itsmystory";
  // }

  location.href=url;
});

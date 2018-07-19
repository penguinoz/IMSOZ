Meteor.startup(function () {
  if(Meteor.isClient){
    WebFontConfig = {
      google: { families: [ 'Roboto'] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
      // console.log("async fonts loaded", WebFontConfig);
    })();


    var config = {
      apiKey: "AIzaSyDo9bkygUNT9yY9Anu22IXl7aDd3cb9zDM",
      messagingSenderId: "622121302375",
    };
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
    // messaging.requestPermission().then(function() {
    //   console.log('Notification permission granted.');
    //   // TODO(developer): Retrieve an Instance ID token for use with FCM.
    //   // ...
    // }).catch(function(err) {
    //   console.log('Unable to get permission to notify.', err);
    // });

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      // console.log('Service Worker and Push is supported');
      navigator.serviceWorker.register('/sw.js')
      .then(function(swReg) {
        messaging.useServiceWorker(swReg);
        // console.log('Service Worker is registered', swReg);
        // swRegistration = swReg;
        messaging.requestPermission().then(function(){
            // console.log('token '+messaging.getToken());
            return messaging.getToken();
          }
        ).catch(function(err){
          // console.log("error");
        })
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
    } else {
      console.warn('Push messaging is not supported');
      pushButton.textContent = 'Push Not Supported';
    }


    // messaging.getToken().then(function(currentToken) {
    //   if (currentToken) {
    //     sendTokenToServer(currentToken);
    //     updateUIForPushEnabled(currentToken);
    //   } else {
    //     // Show permission request.
    //     console.log('No Instance ID token available. Request permission to generate one.');
    //     // Show permission UI.
    //     updateUIForPushPermissionRequired();
    //     setTokenSentToServer(false);
    //   }
    // }).catch(function(err) {
    //   console.log('An error occurred while retrieving token. ', err);
    //   showToken('Error retrieving Instance ID token. ', err);
    //   setTokenSentToServer(false);
    // });
    messaging.onTokenRefresh(function() {
      messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        // resetUI();
        // [END_EXCLUDE]
      }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
      });
    });
    Session.set('colsedNoti', false);
  }
});

window.fbAsyncInit = function() {
    FB.init({
      appId      : '193999104654034',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.0'
    });
      
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    }); 
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  function statusChangeCallback(response){
    if(response.status === 'connected'){
      console.log("Log In Successful");
      showHide(true); //Shows App
      getFaceBookName();   
    } else{
      showHide(false);
      console.log("Failed to Log In");
    }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function showHide(isLoggedIn){
  if(isLoggedIn){
    document.getElementById('chat-app').style.display = 'block';
    document.getElementById('head').style.display = 'none';
  }else{
    document.getElementById('chat-app').style.display = 'none';
    document.getElementById('head').style.display = 'block';
  }
}

function getFaceBookName(){
  FB.api('/me?fields=name', function(response){
      if(response && !response.error){
          buildUserName(response);
      }
  })
}
function buildUserName(user){
  handle = document.getElementById('handle'),
  handle.placeholder=user.name;
}

function logout(){
  FB.logout(function(response){
    showHide(false);
  });
}
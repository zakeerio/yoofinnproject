var db = firebase.firestore();


$("#signupButton").on("click", function (e) {

    var errors = "";
    $('#error-message').html("");
    $('input[type=text], input[type=email]').removeClass('error');

    var email = $("#email").val();
    var password = $("#password").val();

    if (email == "") {
        $("#email").addClass('error');
        // alert('Please enter an email address.');
        errors += "<li>Please enter value in email field</li>";
    }

    if (password.length < 6 || password == "") {
        $("#password").addClass('error');
        errors += "<li>Please enter a password</li>";
    }

    if (errors != "") {
        errors = "<h4>Errors!</h4>" + errors;
        $('#error-message').html(errors).removeClass("hide");
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        localStorage.setItem('userdata', JSON.stringify(user));

        console.log(user);
        userId = user.uid;
        var email = user.email;
        var displayname = "John";
        if(user.displayName != null){
            displayname = user.displayName;
        } else {
            displayname = fname+" "+lname;
        }

        $("#user_name").text(displayname);

        // if (fname != "" && lname != "") {
            // var userdata = writeNewPost(userId, fname, lname, email, ckb_status);
            // if (userdata) {
            //     window.location.href('/welcome');
            // }
        // }

    })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#errors").html(errorMessage)
        });
})

$("#Login_button").on('click', function (e) {
    e.preventDefault();

    $("#error-message").html("");

    var useremail = $("#email").val();
    var userpassword = $("#password").val();

    console.log(useremail);
    console.log(userpassword);

    if (useremail == "") {
        $("#email").addClass('error');
        // alert('Please enter an email address.');
        errors += "<li>Please enter value in email field</li>";
    }

    if (userpassword.length < 8 || userpassword == "") {
        $("#password").addClass('error');
        errors += "<li>Please enter a password</li>";
    }

    //Sign In User with Email and Password
    firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#error-message").html(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
    });

})


$('#Loginwithgoogle').on('click', function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    toggleSignIn(provider);
})


/**
 * Function called when clicking the Login/Logout button.
 */
function toggleSignIn(provider) {
    $(".error-message").html("");
    if (!firebase.auth().currentUser) {

        // provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            $('#quickstart-oauthtoken').text(token);

            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            console.log(user);


        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            console.log(errorCode+" "+errorMessage);
            $(".error-message").html(errorMessage);
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
        });
    } else {
        firebase.auth().signOut();
    }
//   $('#Loginwithfacebook').attr('disabled', true);
}

$("#logoutButton").on("click", function(){
    signOut();
})

function signOut() {
    firebase.auth().signOut();
      // Sign-out successful.
      localStorage.removeItem('userdata');
      console.log("User signed out");
      window.location.href="/";
  }

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            localStorage.setItem('userdata', JSON.stringify(user));
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(email);
            if (email) {
                // var userdata = writeNewPost(uid, displayName, email);
                // console.log(userdata);
                // if (userdata) {
                //     console.log("here");
                //     $(".registration").addClass('hide');
                
                    // window.location.href="/welcome";
                // }
            }
            

        } else {
            localStorage.removeItem('userdata');
            // User is signed out.
            console.log('user logged out!');
            
        }
    })

    // $('#Loginwithfacebook').on('click', function(){
    //     var provider = new firebase.auth.FacebookAuthProvider();
    //     toggleSignIn(provider);
    // })

    $('#Loginwithgoogle').on('click', function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        toggleSignIn(provider);
    })
}

window.onload = function() {
    initApp();
};


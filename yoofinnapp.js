
var db = firebase.firestore();

$(document).ready(function () {
    setTimeout(function () {
        $("#reg-step1").removeClass("hide");
    }, 2500);
    
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

            // if (email) {
            //     var userdata = writeNewPost(uid, displayName, email);
            //     if (userdata) {
            //         $(".registration").addClass('hide');
            //         // window.location.href="/registration";
            //     }
            // }


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
                var userdata = writeNewPost(uid, displayName, email);
                console.log(userdata);
                if (userdata) {
                    console.log("here");
                    $(".registration").addClass('hide');
                    window.location.href="/registration";
                }
            }
            

        } else {
            localStorage.removeItem('userdata');
            localStorage.removeItem('userfbdata');
            // User is signed out.
            console.log('user logged out!');
            
        }
    });

    $('#Loginwithfacebook').on('click', function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        toggleSignIn(provider);
    })

    $('#Loginwithgoogle').on('click', function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        toggleSignIn(provider);
    })
}

// Firebase add data
async function writeNewPost(uid, fname, email) {
    // A post entry.
    // Get a key for a new Post.
    // console.log(uid);
    // var newKey = db.collection('Users').doc(uid);

    var termsconditionstatus = "Y";

    var userData = {
        ID: uid,
        Email: email,
        Fname: fname,
        Lname: "",
        TermsConditions: termsconditionstatus
    };
    if(termsconditionstatus ==  "Y"){
        var currentdate = new Date(); 
        var datetime = 
                currentdate.getFullYear() + ":"  
                + (currentdate.getMonth()+1)  + ":" 
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        userData["TermsConditionTime"] =  datetime;
        userData["SchoolId"] =  "";
    }

    localStorage.setItem('userfbdata', JSON.stringify(userData));

    // console.log(userData);
    await db.collection("Users").doc(uid).set(userData).then(() => {
        console.log("users data updated successfully");
        return true;
    })

}

window.onload = function() {
    initApp();
};



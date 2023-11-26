var db = firebase.firestore();

window.onload = function() {
    initApp();
};

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

    signInOrSignUp(email, password);

    // firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     localStorage.setItem('userdata', JSON.stringify(user));

    //     console.log(user);
    //     userId = user.uid;
    //     var email = user.email;
    //     var displayname = "John";
    //     if(user.displayName != null){
    //         displayname = user.displayName;
    //     } else {
    //         displayname = fname+" "+lname;
    //     }

    //     $("#user_name").text(displayname);

    //     // if (fname != "" && lname != "") {
    //         // var userdata = writeNewPost(userId, fname, lname, email, ckb_status);
    //         // if (userdata) {
    //         //     window.location.href('/welcome');
    //         // }
    //     // }

    // })
    //     .catch((error) => {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         $("#errors").html(errorMessage)
    //     });
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

    signInOrSignUp(useremail, userpassword);

    //Sign In User with Email and Password
    // firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     $("#error-message").html(errorMessage);
    //     console.log(errorCode);
    //     console.log(errorMessage);
    // });

})

// Sign In User with Email and Password or Sign Up if the user does not exist
function signInOrSignUp(useremail, userpassword) {
    firebase.auth().signInWithEmailAndPassword(useremail, userpassword)
        .then((userCredential) => {
            // User signed in successfully
            var user = userCredential.user;
            localStorage.setItem('userdata', JSON.stringify(user));
            console.log("User signed in successfully");
            window.location.href="/welcome";

        })
        .catch(function (error) {
            // If user does not exist, create a new account
            signUpWithEmailAndPassword(useremail, userpassword);

            // if (error.code === "auth/user-not-found") {
            // } else {
            //     // Handle other sign-in errors
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            //     $("#error-message").html(errorMessage);
            //     console.log("Sign In Error Code: ", errorCode);
            //     console.log("Sign In Error Message: ", errorMessage);
            // }
        });
}

// Sign Up User with Email and Password
function signUpWithEmailAndPassword(useremail, userpassword) {
    firebase.auth().createUserWithEmailAndPassword(useremail, userpassword)
        .then((userCredential) => {
            // User signed up successfully
            var user = userCredential.user;
            localStorage.setItem('userdata', JSON.stringify(user));
            console.log("User signed up successfully");
            window.location.href="/welcome";

        })
        .catch(function (error) {
            // Handle sign-up errors
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#error-message").html(errorMessage);
            console.log("Sign Up Error Code: ", errorCode);
            console.log("Sign Up Error Message: ", errorMessage);
        });
}


$('#Loginwithgoogle').on('click', function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    toggleSignIn(provider);
})


/**
 * Function called when clicking the Login/Logout button.
 */
function toggleSignIn(provider) {
    $("#error-message").html("");
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
            window.location.href="/welcome";

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            console.log(errorCode+" "+errorMessage);
            // $("#error-message").html(errorMessage);
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                $("#error-message").html(errorMessage);

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
      localStorage.removeItem('dataAdded');
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
            // User is not logged in, redirect to homepage
            console.log("User is not logged in. Redirecting to homepage...");
            window.location.href = "/"; // Replace "/" with the URL of your homepage
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


  $('#checkoutbutton').click(function (e) {
    e.preventDefault();
    var priceId = $(this).attr('productid');
    var quantity = $("#quantity").val();
    var userinfo = localStorage.getItem("userdata");
    if(quantity ==""){
        alert("Quantity should be added");
    }
    if (userinfo != null || userinfo != "undefined") {
      userinfo = JSON.parse(userinfo);
      var emailaddress = userinfo.email;
    }

    var domainname = window.location.hostname;
    //   console.log('Here');
    var formdata = {
      "Authorization": "key__8c0d8aa13bf726012e1314e8ad8b4175665b6777513accd79ccb7c63d19706a5111",
      'priceId': priceId,
      'domain': domainname,
      'emailaddress': emailaddress,
      'quantity'  :quantity
    };
    var settings = {
      "url": "https://stripeapi.pixeltechnosol.com/stripeapivagonio/charge.php",
      "type": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(formdata)
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      if (response.id) {

        stripe.redirectToCheckout({
          sessionId: response.id
        });
      } else {
        console.log(response);
      }
    });
  });
$(document).ready(function(){
    if($("#iframebox").length > 0 ) {
        alert($("#iframebox").length);
        // alert("TEST");
        var customer = localStorage.getItem('userdata');
        if(customer) {
            customer = JSON.parse(customer);
            console.log(customer);
            const customerIdToMatch = customer.uid;
            console.log(customerIdToMatch);
            // Reference to the "subscriptionData" collection
            const subscriptionDataCollection = db.collection('subscriptionData');
            // Query the collection where 'customerId' matches
            subscriptionDataCollection.where('customerId', '==', customerIdToMatch).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    // console.log(userdata);
                    // db.collection("subscriptionData").doc().set(dataArray).then(() => {
                    //     localStorage.setItem('dataAdded', true);
                    //     console.log("users data updated successfully");
                    //     return true;
                    // })

                    // var datacheck = addSubscriptionData(dataArray)
                    // if(datacheck){
                    //     alert("data added successfully");
                    // }
                    
                }

                // Loop through the matching documents
                snapshot.forEach(doc => {
                    console.log(doc);
                    console.log('Document ID:', doc.id, 'Data:', doc.data());

                    // db.collection("subscriptionData").doc(doc.id).set(dataArray).then(() => {
                    //     localStorage.setItem('dataAdded', true);
                    //     console.log("users data updated successfully");
                    //     return true;
                    // })

                });
            })
            .catch(err => {
                console.error('Error getting documents:', err);
            });
            
        }
    }
})
  
  // Firebase add data
function writeNewPost(customerId, email, quantity) {
    // A post entry.
    var data_added = localStorage.getItem('dataAdded');

    
    if(data_added == null && data_added != 'true'){

        var customer = localStorage.getItem('userdata');
        customer = JSON.parse(customer);
        var userId = customer.uid;
        
        console.log(data_added); 
        
        var currentdate = new Date(); 
        var datetime = 
                currentdate.getFullYear() + ":"  
                + (currentdate.getMonth()+1)  + ":" 
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        var dataArray = {
            customerId: customerId,
            userId: userId,
            emailaddress: email,
            quantity: quantity,
            currentDate : datetime,
            mailContent : '<iframe id="vagonFrame" allow="microphone *; clipboard-read *; clipboard-write *; encrypted-media *;" src="https://streams.vagon.io/streams/db0792d9-ba0e-4c17-bb4f-4b2030964cb1 "/>',
        }; 

        console.log(dataArray);

        const customerIdToMatch = customerId;
        // Reference to the "subscriptionData" collection
        const subscriptionDataCollection = db.collection('subscriptionData');
        // Query the collection where 'customerId' matches
        subscriptionDataCollection.where('customerId', '==', customerIdToMatch).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                // console.log(userData);
                // db.collection("subscriptionData").doc().set(dataArray).then(() => {
                //     localStorage.setItem('dataAdded', true);
                //     console.log("users data updated successfully");
                //     return true;
                // })

                var datacheck = addSubscriptionData(dataArray)
                if(datacheck){
                    alert("data added successfully");
                }
                
            }

            // Loop through the matching documents
            snapshot.forEach(doc => {
                console.log('Document ID:', doc.id, 'Data:', doc.data());

                db.collection("subscriptionData").doc(doc.id).set(dataArray).then(() => {
                    localStorage.setItem('dataAdded', true);
                    console.log("users data updated successfully");
                    return true;
                })

            });
        })
        .catch(err => {
            console.error('Error getting documents:', err);
        });        
    }
}

async function addSubscriptionData(dataArray) {
    try {
        await db.collection("subscriptionData").doc().set(dataArray);
        localStorage.setItem('dataAdded', true);
        console.log("User data added successfully");
        return true;
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}
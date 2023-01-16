
var db = firebase.firestore();

$(init);

function init() {
    $(".droppable-area1, .droppable-area2").sortable({
        connectWith: ".connected-sortable",
        stack: '.connected-sortable',
        revert: true,
        stop: function(){
            console.log("Dropped");
        },
    }).disableSelection();

    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            let school_id = '';

            db.collection("Users").doc(uid).get().then((querySnapshot) => {
                var userfbdata = querySnapshot.data();

                localStorage.setItem('userfbdata', JSON.stringify(userfbdata));


                var school_id = (userfbdata.schoolid) ? userfbdata.schoolid : false;

                if (school_id != false) {
                    console.log(school_id);

                    db.collection("Schools").doc(school_id).get()
                    // db.collection("Schools").where("id", "==", school_id).get()
                    .then((snapshot) => {  //DocSnapshot
                        if (snapshot) {
                            let dataval = snapshot.data();
                            $("#selected-school-name").html(dataval.schoolname);
                            console.log(dataval);
                        } else {
                            // snapshot.data() will be undefined in this case
                            console.log("No such document!");
                        }  
                  })
                                     
                }
            });

            localStorage.setItem('userdata', JSON.stringify(user));

            $(".registration").addClass('hide')
            setTimeout(function () {
                $("#reg-step2").removeClass("hide");
            }, 2500);

        } else {
            setTimeout(function () {
                $("#reg-step1").removeClass("hide");
            }, 2500);
            // User is signed out.
            console.log('user logged out!');

        }
    });
}
$("#declineterms").on("click", function () {
    $("#termsconditions").addClass("hide");
    $("#terms").attr("data-accept", false);
    $(".checkbox-field").trigger("click", function () { return false; })
    $("#agreecontinue").addClass('disabled');
})
$("#acceptterms").on("click", function () {
    $("#termsconditions").addClass("hide");
    $("#terms").attr("data-accept", true);
    $("#agreecontinue").removeClass('disabled');
})
$(document).ready(function () {

    $('.date-picker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'mm/yy',
        onClose: function (dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    })
})

$("#agreecontinue").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) { return false; }

    var errors = "";
    $('#errors').html("");
    $('input[type=text], input[type=email]').removeClass('error');

    var email = $("#email").val();
    var confirmemail = $("#Confirm-Email").val();
    var password = $("#password").val();
    var fname = $("#name").val();
    var lname = $("#Last-Name").val();
    var ckb_status = $("#terms").prop('checked');
    $("#email").removeClass('error');


    if (fname == "") {
        $("#name").addClass('error')
        errors += "<li>Please enter First name</li>";
    }
    if (lname == "") {
        $("#Last-Name").addClass('error')
        errors += "<li>Please enter Last name</li>";
    }

    if (email == "") {
        $("#email").addClass('error');
        // alert('Please enter an email address.');
        errors += "<li>Please enter value in email field</li>";
    }

    if (confirmemail == "") {
        $("#Confirm-Email").addClass('error');
        // alert('Please enter an email address.');
        errors += "<li>Please enter value in confirm email field</li>";
    }
    if (password.length < 4 || password == "") {
        $("#password").addClass('error');
        errors += "<li>Please enter a password</li>";
    }

    if ((email != "" && confirmemail != "") && email != confirmemail) {
        $("#email").addClass("error");
        $("#Confirm-Email").addClass("error");
        errors += "<li>Email field doesn't match</li>";
    }

    if (ckb_status) {
        // alert(" Thanks for Registration..........."); 
        // errors += "<li>Email field doesn't match</li>";

    }
    else {
        errors += "<li>You must agree to terms and conditions before submit the form</li>";
    }

    if (errors != "") {
        errors = "<h4>Errors!</h4>" + errors;
        $('#errors').html(errors).removeClass("hide");
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        localStorage.setItem('userdata', JSON.stringify(user));

        console.log(user);
        userId = user.uid;
        var email = user.email;

        if (fname != "" && lname != "") {
            var userdata = writeNewPost(userId, fname, lname, email, ckb_status);
            if (userdata) {
                $(".registration").addClass('hide')
                $("#reg-step2").removeClass('hide');
                // window.location.href('/user-registratoin-process');
            }
        }

    })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#errors").html(errorMessage)
        });
})

// Firebase add data
function writeNewPost(uid, fname, lname, email, ckb_status) {
    // A post entry.
    // Get a key for a new Post.
    console.log(uid);
    var termsconditionstatus = (ckb_status == true) ? "Y" : "N";
    // var newKey = db.collection('Users').doc(uid);
    var userData = {
        id: uid,
        email: email,
        fname: fname,
        lname: lname,
        terms_conditions: termsconditionstatus
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
        userData.terms_condition_time =  datetime;
    }
    console.log(userData);
    db.collection("Users").doc(uid).set(userData).then(() => {
        $(".registration").addClass("hide");
        $("#reg-step2").removeClass("hide");
        console.log("users data added successfully");
        return true;
    })
}



$("#terms").on("change", function () {
    var checkedval = $(this).is(":checked");
    if (checkedval == true) {
        $("#termsconditions").removeClass("hide");
    } else {
        $("#termsconditions").addClass("hide");
        $("#terms").attr("data-accept", false);
        $("#agreecontinue").addClass('disabled');
    }
})

$(".add-school").click(function () {
    
    var userdata = localStorage.getItem('userfbdata');
    userdata = JSON.parse(userdata);
    console.log(typeof(userdata.schoolid));
    if(typeof(userdata.schoolid) === "undefined") {
        console.log(userdata.schoolid);
        $(".addschool_field").removeClass('hide');
    }
})

$("#step-back-2").on("click", function () {
    $(".registration").addClass("hide");
    $("#reg-step1").removeClass("hide");
})

$("#step-back-3").on("click", function () {
    $(".registration").addClass("hide");
    $("#reg-step2").removeClass("hide");
})

$("#step-back-4").on("click", function () {
    $(".registration").addClass("hide");
    $("#reg-step3").removeClass("hide");
})



// var concerns =  [
// { key: "concern", value : "Lonely/ Not being able to make friends" },
// { key: "concern", value : "Failing/ Getting bad grades" },
// { key: "concern", value : "Not having fun" },
// { key: "concern", value : "The college I choose doesn’t meet my needs" },
// { key: "concern", value : "Financial Burden" },
// { key: "concern", value : "Being away from home" },
// { key: "concern", value : "Disappointing my parents/family" },
// ];



// $.each(states, function( index, value ) {
//     var key = value.key;
//     var values = value.value;

//     // var id = db.collection("Concerns").doc();

//     var concerndata = value;

//     console.log(concerndata);

//     db.collection("States").doc().set(concerndata).then(() => {
//         console.log('tested');
//     })
// });


// db.collection("Schools")
//     .get()
//     .then((querySnapshot) => {
//     // db.collection("Schools").where("schoolname", "==", request.term).limit(10).get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         statedata = doc.data();
//         // console.log(doc.id, " => ", doc.data());
//         var str  = statedata.schoolname;
//         var schoolkeywordsval = str.split(" "); 


//         db.collection("Schools").doc(doc.id).update( { schoolkeywords : schoolkeywordsval } ).then(() => {
//             console.log(doc.id+" school successfully updated!");
//         })
//     });
// })





$("#addschool").on('click', function () {
    var userdata = localStorage.getItem('userfbdata');
    userdata = JSON.parse(userdata);
    console.log(userdata.schoolid);
    if(typeof(userdata.schoolid) === "undefined") {
        $(".addschool_field").removeClass('hide');
    }

})


$(".closebutton").click(function () {
    $("#wf-form-Add-School")[0].reset();
    $("#addschoolbox").addClass('hide');
})

$(".login-link").on('click', function () {
    $("#login-form").removeClass('hide');
})

$(".closebutton.loginclose").click(function () {
    // $("#wf-form-Add-School")[0].reset();
    $("#login-form").addClass('hide');
})




var states = "";
db.collection("States").orderBy("name").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        statedata = doc.data();
        // console.log(doc.id, " => ", doc.data());
        states += "<option value='" + statedata.postalAbreviation + "'>" + statedata.name + "</option>";
    });

    $("#states").html(states);
});

$("#addschoolbtn").on('click', function () {
    {

        var userdata = localStorage.getItem('userdata');
        userdata = JSON.parse(userdata);
        db.collection("Users").doc(userdata.uid).get().then((querySnapshot) => {
            var userfbdata = querySnapshot.data();

            if (userfbdata.schoolid) {
                console.log(userfbdata.schoolid);
                return false;
            } else {

                $("#school-errors").html("");

                console.log("Not found!");

                var errs = '';
                $("#wf-form-Add-School #schoolname").each(function () {
                    var field = $(this).val();
                    if (field == "") {
                        errs += "Please fill School Name field\n";
                    }
                });
                $("#wf-form-Add-School #city").each(function () {
                    var field = $(this).val();
                    if (field == "") {
                        errs += "Please fill " + $(this).attr('data-name') + " field\n";
                    }
                });
                if ($("#states").val() == "") {
                    errs += "Please fill " + $("#states").attr('data-name') + " field\n";
                }

                if (errs != "") {
                    $("#school-errors").html(errs);
                    return false;
                }

                var str = $('input[name=schoolname]').val();
                var schoolarr = str.split(" ");



                var schooldata = {
                    city: $('input[name=city]').val(),
                    schoolname: $('input[name=schoolname]').val(),
                    state: $('select[name=state]').val(),
                    zip: $('input[name=zipcode]').val(),
                    schoolkeywords: schoolarr,
                    school_manually_entered : "Y",
                }

                var schoolid = db.collection("Schools").doc();

                schoolid.set(schooldata).then(() => {

                    userschool = { schoolid: schoolid.id };
                    // console.log(schoolid.id);

                    db.collection("Users").doc(userdata.uid).update(userschool).then(() => {
                        console.log("user successfully updated!");
                        $("#selected-school-name").html(schoolname);
                    })

                })
            }

        })

    }
})


$(function () {

    $(".input_addschool_field").autocomplete({

        source: function (request, response) {
            console.log(request.term);

            var array_schools = [];

            var strschool = request.term;
            var schoolkeywordsval = strschool.split(" ");

            db.collection("Schools").where("schoolkeywords", "array-contains-any", schoolkeywordsval).limit(15).get().then((querySnapshot) => {

                console.log(querySnapshot.size);
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach((doc) => {
                        statedata = doc.data();
                        // console.log(doc.id, " => ", doc.data());
                        var school_item = { id: doc.id, value: doc.data().schoolname };

                        array_schools.push(school_item);

                    });
                } else {
                    school_item = { value: "", label: "Not Found" };
                    array_schools.push(school_item);

                }
                console.log(array_schools);
                response(array_schools);
            }).catch((error) => {
                // The document probably doesn't exist.
                console.error("No results found: ", error);
            });

        },
        minLength: 2,
        select: function (event, ui) {

            if (ui.item.value == "Not Found") {
                $(this).removeAttr('data-id');
            } else {
                $(this).attr('data-id', ui.item.id);
                $("#selected-school-name").html(ui.item.value);
                console.log(ui.item);
            }

        },
        error: function (data) {
            $('.input_addschool_field"').removeClass('ui-autocomplete-loading');
        }
    });
});


$("#Login_button").on('click', function (e) {
    e.preventDefault();

    var useremail = $("#useremail").val();
    var userpassword = $("#userpassword").val();

    console.log(useremail);
    console.log(userpassword);

    if (useremail == "") {
        $("#useremail").addClass('error');
        // alert('Please enter an email address.');
        errors += "<li>Please enter value in email field</li>";
    }

    if (userpassword.length < 8 || userpassword == "") {
        $("#userpassword").addClass('error');
        errors += "<li>Please enter a password</li>";
    }

    //Sign In User with Email and Password
    firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });

})

$('#submit-step2').on('click', function (e) {
    e.preventDefault();
    var schoolid = $(".input_addschool_field").attr("data-id");
    var start_date = $("#start_date").val();
    var sibling_attend = $("input[name='sibling_attend']").val();

    console.log(schoolid);
    console.log(start_date);
    console.log(sibling_attend);

    var data = {
        start_date: start_date,
        sibling_attend: sibling_attend,
    };

    if(schoolid){
        data.schoolid = schoolid;
        data.school_manually_entered = "N";
    }

    var userdata = localStorage.getItem('userdata');
    userdata = JSON.parse(userdata);
    db.collection("Users").doc(userdata.uid).update(data).then(() => {
        console.log("user step3 data successfully updated!");

        $(".registration").addClass("hide");
        $("#reg-step3").removeClass("hide");

    });
});

$('#submit-step3').on('click', function (e) {
    e.preventDefault();

    var data = {};

    var sat = $("#sat:checked").val();
    if(sat =="on"){ data['sat'] = sat; }
    var test_date = $('#test_date').val();
    if(test_date !=""){ data['test_date'] = test_date; }
    var composite_score = $('#composite_score').val();
    if(composite_score !=""){ data['composite_score'] = composite_score; }
    var verbal_score = $('#verbal_score').val();
    if(verbal_score !=""){ data['verbal_score'] = verbal_score; }
    var act = $('#act:checked').val();
    if(act =="on"){ data['act'] = act; }
    var act_test_date = $('#act_test_date').val();
    if(act_test_date !=""){ data['act_test_date'] = act_test_date; }
    var act_math_score = $('#act_math_score').val();
    if(act_math_score !=""){ data['act_math_score'] = act_math_score; }
    var act_english_score = $('#act_english_score').val();
    if(act_english_score !=""){ data['act_english_score'] = act_english_score; }
    var act_composite_score = $('#act_composite_score').val();
    if(act_composite_score !=""){ data['act_composite_score'] = act_composite_score; }
    var test_checkbox = $('#test_checkbox:checked').val();
    if(test_checkbox =="on"){ data['tests_taken'] = test_checkbox; }
   
    var userdata = localStorage.getItem('userdata');
    userdata = JSON.parse(userdata);
    db.collection("Users").doc(userdata.uid).update(data).then(() => {
        console.log("user step4 data successfully updated!");

        $(".registration").addClass("hide");
        $("#reg-step4").removeClass("hide");

    })

    // console.log(sat + " sat " + test_date + " test_date " + composite_score + " composite_score " + verbal_score + " verbal_score " + act + " act " + act_test_date + " act_test_date " + act_math_score + " act_math_score " + act_english_score + " act_english_score " + act_composite_score + " act_composite_score " + test_checkbox);
});

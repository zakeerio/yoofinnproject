
var db = firebase.firestore();

$(init);

let classes = ['first','second','third','forth','fifth','sixth','seventh', 'eighth', 'ninth', 'tenth'];

function init() {
    $(".droppable-area1, .droppable-area2").sortable({
        connectWith: ".connected-sortable",
        stack: '.connected-sortable',
        revert: true,
        stop: function(){
            console.log("Dropped");
            addNumbersDynamicallyUniCon();
        },
        update: function(){
            UpdateNumbersDynamicallyUniCon();
        }
    }).disableSelection();

    var classeslist = [];
    var usedclasses = [];

    function addNumbersDynamicallyUniCon(){
        console.log("Add box");
        var universityconcerns = [];

        // $(".droppable-area1.connected-sortable .ui-sortable-handle").removeClass('dropped')
        var classcounter = 0;
        $(".droppable-area1.connected-sortable .ui-sortable-handle").each(function(){

            universityconcerns.push($(this).find('.heading-text').text());

            if($.inArray("dropeditem"+classcounter, classeslist) == -1) {
                classeslist.push("dropeditem"+classcounter);
                $('head').append('<style>.dropeditem'+classcounter+':before{ content: "'+(classcounter+1)+'";}</style>');
            }

            for (var i = 0, l = $(".droppable-area1.connected-sortable .ui-sortable-handle").length; i < l; i++) {
                var obj = "dropeditem"+i;
                if($(this).hasClass(obj)) {
                    $(this).removeClass(obj);
                }
            }
            

            $(this).addClass('dropped');
            // $(this).addClass(classes[classcounter]);
            $(this).addClass('dropeditem'+classcounter);
            classcounter++;
        })
        $('#univrsityconcerns').val(universityconcerns.join(','));

        console.log(classeslist);
    }

    
    

    function UpdateNumbersDynamicallyUniCon(){
        console.log("update box");
        var universityconcerns = [];
        
        for (var i = 0, l = $(".droppable-area1.connected-sortable .ui-sortable-handle").length; i < l; i++) {
            var obj = "dropeditem"+i;
            if($(this).hasClass(obj)) {
                $(this).removeClass(obj);
            }
        }

        var classcounter = 0;
        $(".droppable-area1.connected-sortable .ui-sortable-handle").each(function(){
            universityconcerns.push($(this).find('.heading-text').text());

            $(this).addClass('dropped');
            if(!$(this).hasClass('dropeditem'+classcounter)){
                $(this).addClass('dropeditem'+classcounter)
            }

            classcounter++;
        })
        $('#univrsityconcerns').val(universityconcerns.join(','));

    }

    $(".droppable-area-hope, .droppable-area-hope2").sortable({
        connectWith: ".connected-sortable",
        stack: '.connected-sortable',
        revert: true,
        stop: function(){
            console.log("Dropped");
            addNumbersDynamicallyExcites();
        },
        update: function(){
            UpdateNumbersDynamicallyExcites();
        }
    }).disableSelection();

    function addNumbersDynamicallyExcites(){
        console.log("Add box");

        // $(".droppable-area1.connected-sortable .ui-sortable-handle").removeClass('dropped')
        var classcounter = 0;
        var univrsityexcites = [];
        $(".droppable-area-hope.connected-sortable .ui-sortable-handle").each(function(){

            univrsityexcites.push($(this).find('.heading-text').text());

            if($.inArray("dropeditem"+classcounter, classeslist) == -1) {
                classeslist.push("dropeditem"+classcounter);
                $('head').append('<style>.dropeditem'+classcounter+':before{ content: "'+(classcounter+1)+'";}</style>');
            }

            for (var i = 0, l = $(".droppable-area-hope.connected-sortable .ui-sortable-handle").length; i < l; i++) {
                var obj = "dropeditem"+i;
                if($(this).hasClass(obj)) {
                    $(this).removeClass(obj);
                }
            }

            $(this).addClass('dropped');
            $(this).addClass('dropeditem'+classcounter);

            classcounter++;
        })

        $('#univrsityexcites').val(univrsityexcites.join(','));
        
    }

    function UpdateNumbersDynamicallyExcites(){
        var excitesval = [];

        console.log("update box");
        for (var i = 0, l = classes.length; i < l; i++) {
            var obj = classes[i];
            if($(".droppable-area-hope.connected-sortable .ui-sortable-handle").hasClass(obj)) { 
                $(".droppable-area-hope.connected-sortable .ui-sortable-handle").removeClass(obj);
            }
        }

        var classcounter = 0;
        $(".droppable-area-hope.connected-sortable .ui-sortable-handle").each(function(){
            excitesval.push($(this).find('.heading-text').text());

            $(this).addClass('dropped');
            $(this).addClass(classes[classcounter]);
            classcounter++;
        })
        $('#universityconcerns').val(excitesval.join(','));

    }

    $(document).ready(function(){
        loadconcerns();
        loadhopes();
    })

    function loadconcerns(){
        $(".droppable-area2.connected-sortable1").html("");

        db.collection("Concerns").get().then((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                userfbdata = doc.data();

                console.log(userfbdata);
                
                var sample_university_concern = $("#sample-university-concern");
                $(sample_university_concern).find('.heading-text').text(userfbdata.value);
                $(".droppable-area2.connected-sortable1").append(sample_university_concern.html());

            });

            $(".droppable-area1, .droppable-area2").draggable({
                cancel: "button", // these elements won't initiate dragging
                revert: "invalid", // when not dropped, the item will revert back to its initial position
                containment: "document",
                helper: "clone",
                cursor: "move"
            }).disableSelection();
            
        });

        
    }

    function loadhopes(){
        $(".droppable-area-hope2.connected-sortable1").html("");

        db.collection("Hopes").get().then((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                userfbdata = doc.data();

                // console.log(userfbdata);
                
                var sample_university_hope = $("#sample-university-hope");
                $(sample_university_hope).find('.heading-text').text(userfbdata.value);
                $(".droppable-area-hope2.connected-sortable1").append(sample_university_hope.html());

            });

            
        });

        $(".droppable-area-hope, .droppable-area-hope2").draggable({
            cancel: "button", // these elements won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        }).disableSelection();
    }

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

            var displayname = "John";
            if(displayName != null){
                displayname = displayName;
            }

            $("#user_name").text(displayname);

            let school_id = '';

            console.log(uid+ " TEST" );

            db.collection("Users").doc(uid).get().then((querySnapshot) => {
                var userfbdata = querySnapshot.data();

                console.log(userfbdata);

                var userdatacheck = localStorage.getItem('userfbdata');

                console.log(userdatacheck);
                
                if(userdatacheck != "undefined"){
                    localStorage.setItem('userfbdata', JSON.stringify(userfbdata));
                    
                    if(userfbdata.SchoolId != ""){
                        var school_id = (userfbdata.SchoolId != "") ? userfbdata.SchoolId : false;

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
                    }
                }
            });

            localStorage.setItem('userdata', JSON.stringify(user));

            $(".registration").addClass('hide')
            setTimeout(function () {
                $("#reg-step2").removeClass("hide");
            }, 2500);

        } else {

            localStorage.removeItem('userdata');
            localStorage.removeItem('userfbdata');
            
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
        var displayname = "John";
        if(user.displayName != null){
            displayname = user.displayName;
        } else {
            displayname = fname+" "+lname;
        }

        $("#user_name").text(displayname);

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
async function writeNewPost(uid, fname, lname, email, ckb_status) {
    // A post entry.
    // Get a key for a new Post.
    console.log(uid);
    var termsconditionstatus = (ckb_status == true) ? "Y" : "N";
    // var newKey = db.collection('Users').doc(uid);
    var userData = {
        ID: uid,
        Email: email,
        Fname: fname,
        Lname: lname,
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
    console.log(userData);
    await db.collection("Users").doc(uid).set(userData).then(() => {

        $(".registration").addClass("hide");
        $("#reg-step2").removeClass("hide");
        // console.log("users data added successfully");


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
    if(userdata != ""){
        console.log(typeof(userdata.SchoolId));
        // if(typeof(userdata.SchoolId) === "undefined") {
            console.log(userdata.SchoolId);
            $(".addschool_field").removeClass('hide');
        // }
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
// { key: "concern", value : "The college I choose doesnâ€™t meet my needs" },
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

var sample_university_concern = $("#sample-university-concern").html();
$(sample_university_concern).find('.heading-text').text();

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

    if(userdata != "undefined"){
        userdata = JSON.parse(userdata);
        console.log(userdata.SchoolId);
        if(typeof(userdata.SchoolId) === "undefined") {
            $(".addschool_field").removeClass('hide');
        }
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

            if (userfbdata.SchoolId) {
                console.log(userfbdata.SchoolId);
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

    $("#login_error").html("");

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
        $("#login_error").html(errorMessage);
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
        StartDate: start_date,
        SiblingAttend: sibling_attend,
    };

    if(schoolid){
        data["SchoolId"] = schoolid;
        data["SchoolManuallyEntered"] = "N";
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
    if(sat =="on"){ data['Sat'] = sat; }
    var test_date = $('#test_date').val();
    if(test_date !=""){ data['TestDate'] = test_date; }
    var composite_score = $('#composite_score').val();
    if(composite_score !=""){ data['CompositeScore'] = composite_score; }
    var verbal_score = $('#verbal_score').val();
    if(verbal_score !=""){ data['VerbalScore'] = verbal_score; }
    var act = $('#act:checked').val();
    if(act =="on"){ data['Act'] = act; }
    var act_test_date = $('#act_test_date').val();
    if(act_test_date !=""){ data['ActTestDate'] = act_test_date; }
    var act_math_score = $('#act_math_score').val();
    if(act_math_score !=""){ data['ActMathScore'] = act_math_score; }
    var act_english_score = $('#act_english_score').val();
    if(act_english_score !=""){ data['ActEnglishScore'] = act_english_score; }
    var act_composite_score = $('#act_composite_score').val();
    if(act_composite_score !=""){ data['ActCompositeScore'] = act_composite_score; }
    var test_checkbox = $('#test_checkbox:checked').val();
    if(test_checkbox =="on"){ data['TestsTaken'] = test_checkbox; }
   
    var userdata = localStorage.getItem('userdata');
    userdata = JSON.parse(userdata);
    db.collection("Users").doc(userdata.uid).update(data).then(() => {
        console.log("user step4 data successfully updated!");

        $(".registration").addClass("hide");
        $("#reg-step4").removeClass("hide");

    })

    // console.log(sat + " sat " + test_date + " test_date " + composite_score + " composite_score " + verbal_score + " verbal_score " + act + " act " + act_test_date + " act_test_date " + act_math_score + " act_math_score " + act_english_score + " act_english_score " + act_composite_score + " act_composite_score " + test_checkbox);
});

$('#submit-step4').on('click', function (e) {
    e.preventDefault();

    if($(".droppable-area1.connected-sortable .ui-sortable-handle").length > 0){

        console.log('this is step4');
        var jsonobj = {};
        var counterval = 1;

        var manual_entry_val = "N";
     
        
        $(".droppable-area1.connected-sortable .ui-sortable-handle").each(function(){

            var heading_text = $(this).find('.heading-text');
            var currenttext = heading_text.text();

            console.log(currenttext);

            if(heading_text.hasClass('manual')){
                manual_entry_val = "Y";
                var dataindex = "UniversityConcernManualEntryText";
                jsonobj[dataindex] = currenttext;
                return;
            }else {
                var dataindex = "UniversityConcern"+counterval;
                jsonobj[dataindex] = currenttext;
                counterval++;
            }
            
        })

        jsonobj["UniversityConcernManualEntry"] = manual_entry_val;


        var userdata = localStorage.getItem('userdata');
        userdata = JSON.parse(userdata);

        db.collection("Users").doc(userdata.uid).update(jsonobj).then(() => {
            console.log("user successfully updated!");
            // $("#selected-school-name").html(schoolname);
        })

        $(".registration").addClass("hide");
        $("#reg-step5").removeClass("hide");
    }

});


$('#submit-step5').on('click', function (e) {
    e.preventDefault();
    if($(".droppable-area-hope.connected-sortable .ui-sortable-handle").length > 0){
        console.log('this is step4');
        var jsonobj1 = {};
        var counterval = 1;

        var manual_entry_val = "N";
        
        $(".droppable-area-hope.connected-sortable .ui-sortable-handle").each(function(){
            var heading_text = $(this).find('.heading-text');
            var currenttext = heading_text.text();

            if(heading_text.hasClass('manual')){
                manual_entry_val = "Y";
                dataindex = "UniversityHopeManualEntryText";
                jsonobj1[dataindex] = currenttext;
                return;
            }else {
                dataindex = "UniversityHope"+counterval;
                jsonobj1[dataindex] = currenttext;
                counterval++;
            }
            
        })

        jsonobj1["UniversityHopeManualEntry"] = manual_entry_val;

        console.log(jsonobj1);

        var userdata = localStorage.getItem('userdata');
        userdata = JSON.parse(userdata);

        db.collection("Users").doc(userdata.uid).update(jsonobj1).then(() => {
            console.log("user successfully updated!");
            // $("#selected-school-name").html(schoolname);
        })

        $(".registration").addClass("hide");
        $("#reg-step6").removeClass("hide");
    }
});





$('#add_university_hope_btn').on("click", function(){
    $("#university-hope").fadeIn(100);
})

$('#add_university_concern_btn').on("click", function(){
    $("#university-concern").fadeIn(100);
})

// Add Manual Entry for University Concern
$("#add-university-concern").click(function(){
    var univesity_concern = $("#university-concern-field").val();
    if(univesity_concern !=""){
        var concerndata = {
            "key": 'concern',
            "value": univesity_concern
        };

        var concern_id = db.collection("Concerns").doc();
        concern_id.set(concerndata).then(() => {

            var sample_university_concern = $("#sample-university-concern");
            
            $(sample_university_concern).find('.heading-text').addClass('manual');
            $(sample_university_concern).find('.heading-text').text(univesity_concern);

            $(".droppable-area2.connected-sortable1").append(sample_university_concern.html());

            $(".droppable-area1, .droppable-area2").draggable({
                cancel: "button", // these elements won't initiate dragging
                revert: "invalid", // when not dropped, the item will revert back to its initial position
                containment: "document",
                helper: "clone",
                cursor: "move"
            }).disableSelection();


            // concern_manual = { university_concern_manual: "Y" };
            // // console.log(schoolid.id);
            // var userdata = localStorage.getItem('userdata');
            // userdata = JSON.parse(userdata);

            // db.collection("Users").doc(userdata.uid).update(concern_manual).then(() => {
            //     console.log("user successfully updated!");
            //     // $("#selected-school-name").html(schoolname);
            // })
            console.log("concern successfully updated!");
            $("#university-concern").fadeOut(100);

        })
    } else {
        return false;
    }
})

// Add Manual Entry for University Hope

$("#add-university-hope").click(function(){
    var univesity_hope = $("#university-hope-field").val();
    if(univesity_hope !=""){
        var hopedata = {
            "key": 'hope',
            "value": univesity_hope
        };

        var hope_id = db.collection("Hopes").doc();
        hope_id.set(hopedata).then(() => {

            var sample_university_hope = $("#sample-university-hope");

            $(sample_university_hope).find('.heading-text').addClass('manual');

            $(sample_university_hope).find('.heading-text').text(univesity_hope);
            $(".droppable-area-hope2.connected-sortable1").append(sample_university_hope.html());

            $(".droppable-area-hope, .droppable-area-hope2").draggable({
                cancel: "button", // these elements won't initiate dragging
                revert: "invalid", // when not dropped, the item will revert back to its initial position
                containment: "document",
                helper: "clone",
                cursor: "move"
            }).disableSelection();


            // hope_manual = { university_hope_manual: "Y" };
            // // console.log(schoolid.id);
            // var userdata = localStorage.getItem('userdata');
            // userdata = JSON.parse(userdata);

            // db.collection("Users").doc(userdata.uid).update(hope_manual).then(() => {
            //     console.log("user successfully updated!");
            //     // $("#selected-school-name").html(schoolname);
            // })

            console.log("hope successfully updated!");
            $("#university-hope").fadeOut(100);

        })
    } else {
        return false;
    }
})
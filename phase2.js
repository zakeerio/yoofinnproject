var db = firebase.firestore();

$(init);

function init() {
  $(document).ready(function () {
    loadstates();
  });

  function loadstates() {
    // $(".droppable-area2.connected-sortable1").html("");

    db.collection("States")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userfbdata = doc.data();

          console.log(userfbdata + "states data");

          //   var sample_university_concern = $("#sample-university-concern");
          //   $(sample_university_concern)
          //     .find(".heading-text")
          //     .text(userfbdata.value);
          //   $(".droppable-area2.connected-sortable1").append(
          //     sample_university_concern.html()
          //   );
        });
      });
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
      if (displayName != null) {
        displayname = displayName;
      }

      $("#user_name").text(displayname);

      let school_id = "";

      console.log(uid + " TEST");

      db.collection("Users")
        .doc(uid)
        .get()
        .then((querySnapshot) => {
          var userfbdata = querySnapshot.data();

          console.log(userfbdata);

          var userdatacheck = localStorage.getItem("userfbdata");

          console.log(userdatacheck);

          if (userdatacheck != "undefined") {
            localStorage.setItem("userfbdata", JSON.stringify(userfbdata));

            if (userfbdata.SchoolId != "") {
              var school_id =
                userfbdata.SchoolId != "" ? userfbdata.SchoolId : false;

              if (school_id != false) {
                console.log(school_id);

                db.collection("Schools")
                  .doc(school_id)
                  .get()
                  // db.collection("Schools").where("id", "==", school_id).get()
                  .then((snapshot) => {
                    //DocSnapshot
                    if (snapshot) {
                      let dataval = snapshot.data();
                      $("#selected-school-name").html(dataval.schoolname);
                      console.log(dataval);
                    } else {
                      // snapshot.data() will be undefined in this case
                      console.log("No such document!");
                    }
                  });
              }
            }
          }
        });

      localStorage.setItem("userdata", JSON.stringify(user));

      $(".registration").addClass("hide");
      setTimeout(function () {
        $("#reg-step2").removeClass("hide");
      }, 2500);
    } else {
      localStorage.removeItem("userdata");
      localStorage.removeItem("userfbdata");

      setTimeout(function () {
        $("#reg-step1").removeClass("hide");
      }, 2500);
      // User is signed out.
      console.log("user logged out!");
    }
  });
}

$("#submit_university_program_button").on("click", function (e) {
  e.preventDefault();
  console.log("hello there");
  // var schoolid = $(".input_addschool_field").attr("data-id");
  // var start_date = $("#start_date").val();
  // var sibling_attend = $("input[name='sibling_attend']").val();

  // console.log(schoolid);
  // console.log(start_date);
  // console.log(sibling_attend);

  // var data = {
  //     StartDate: start_date,
  //     SiblingAttend: sibling_attend,
  // };

  // if(schoolid){
  //     data["SchoolId"] = schoolid;
  //     data["SchoolManuallyEntered"] = "N";
  // }

  // var userdata = localStorage.getItem('userdata');
  // userdata = JSON.parse(userdata);
  // db.collection("Users").doc(userdata.uid).update(data).then(() => {
  //     console.log("user step3 data successfully updated!");

  //     $(".registration").addClass("hide");
  //     $("#reg-step3").removeClass("hide");

  // });
});

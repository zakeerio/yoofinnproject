var db = firebase.firestore();

// $(init);

// function init() {
//   $(".droppable-area1, .droppable-area2")
//     .sortable({
//       connectWith: ".connected-sortable",
//       stack: ".connected-sortable",
//       revert: true,
//       stop: function () {
//         console.log("Dropped");
//         addNumbersDynamicallyUniCon();
//       },
//       update: function () {
//         UpdateNumbersDynamicallyUniCon();
//       },
//     })
//     .disableSelection();

//   // Listening for auth state changes.
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       // User is signed in.
//       var displayName = user.displayName ? user.displayName : "Hi John";
//       var uid = user.uid;

//       $("#user_name").text("Hi " + displayname);

//       localStorage.setItem("userdata", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("userdata");
//     }
//   });
// }

$("#add_university_button").on("click", function (e) {
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

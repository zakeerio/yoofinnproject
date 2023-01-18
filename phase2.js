var db = firebase.firestore();

$(document).ready(function () {
  $("#registration_screen_0").addClass("hide");
  $("#registration_screen_1").addClass("hide");
  $("#registration_screen_2").addClass("hide");
  $("#registration_screen_3").addClass("hide");
  $("#registration_screen_4").addClass("hide");
  $("#registration_screen_5").addClass("hide");
  $("#registration_screen_6").addClass("hide");
  $("#registration_screen_7").addClass("hide");
  $("#registration_screen_8").addClass("hide");
  $("#registration_screen_9").addClass("hide");
  $("#registration_screen_10").addClass("hide");
});

$("#university_section").on("click", function (e) {
  e.preventDefault();

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        statesdata = doc.data();
        console.log(statesdata);

        $("#w-dropdown-list-0").append(
          "<a href='#' class='w-dropdown-link' tabindex='0'>" +
            statesdata.name +
            "</a>"
        );
      });
    });
});

$(function () {
  let university_array = [];
  db.collection("University")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        universitydata = doc.data();
        console.log(universitydata + "universitydata");
        university_array.push(universitydata.university_name);
      });
      console.log(university_array);
    });

  $("#Type-name-of-University").autocomplete({
    source: university_array,
  });
});

$("#submit_university_program_button").on("click", function (e) {
  let states_array = [];
  e.preventDefault();
  console.log("hello there");
});

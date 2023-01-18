var db = firebase.firestore();

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

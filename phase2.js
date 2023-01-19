var db = firebase.firestore();

$(document).ready(function () {
  let university_section_status = false;
  let values_section_status = false;
  let cost_section_status = false;
  let careers_section_status = false;
  let school_section_status = false;
  let sat_section_status = false;
  let forward_image =
    "https://uploads-ssl.webflow.com/629a6c53c8ec9fdc6019d9f8/63737f69d2049860f5be355f_ep_arrow-right-bold.svg";
  let tick_image =
    "https://uploads-ssl.webflow.com/629a6c53c8ec9fdc6019d9f8/62d967e2c3a35703f4eef7ea_check.svg";

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

  if (university_section_status === false) {
    $("#university_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (values_section_status === false) {
    $("#values_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (cost_section_status === false) {
    $("#cost_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (careers_section_status === false) {
    $("#careers_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (school_section_status === false) {
    $("#school_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (sat_section_status === false) {
    $("#sat_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }

  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      let student_user_name_div_text;
      var uid = user.uid;
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
          }

          let displayName = userfbdata.Fname;
          if (displayName === null || displayName === undefined) {
            student_user_name_div_text = "👋 Hi John,";
          } else {
            student_user_name_div_text = "👋 Hi " + displayName + ",";
          }
          $("#student_user_name").text(student_user_name_div_text);
        });

      localStorage.setItem("userdata", JSON.stringify(user));
    } else {
      localStorage.removeItem("userdata");
      localStorage.removeItem("userfbdata");

      // User is signed out.
      console.log("user logged out!");
    }
  });
});

$("#university_section").on("click", function (e) {
  e.preventDefault();

  $("#registration_splash_screen").addClass("hide");
  $("#registration_screen_0").removeClass("hide");
  let counter_append = 0;
  let country_counter_append = 0;

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        statesdata = doc.data();

        if (counter_append === 0) {
          $("#w-dropdown-list-0").html(
            "<a href='#' class='w-dropdown-link' tabindex='0'>ALL</a><a href='#' class='w-dropdown-link' tabindex='0'>" +
              statesdata.name +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-0").append(
            "<a href='#' class='w-dropdown-link' tabindex='0'>" +
              statesdata.name +
              "</a>"
          );
        }
        counter_append = counter_append + 1;
      });
    });

  db.collection("Department")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        departmentdata = doc.data();

        if (country_counter_append === 0) {
          $("#w-dropdown-list-1").html(
            "<a href='#' class='w-dropdown-link' tabindex='0'>ANY</a><a href='#' class='w-dropdown-link' tabindex='0'>" +
              departmentdata.name +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-1").append(
            "<a href='#' class='w-dropdown-link' tabindex='0'>" +
              departmentdata.name +
              "</a>"
          );
        }
        country_counter_append = country_counter_append + 1;
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

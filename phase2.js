var db = firebase.firestore();
var univeristy_array = [];

$(document).ready(function () {
  let university_section_status = localStorage.getItem(
    "university_section_status"
  )
    ? localStorage.getItem("university_section_status")
    : false;
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
  $("#registration_screen_seven").addClass("hide");
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
            "<a href='#' class='w-dropdown-link' tabindex='0'  onclick='setstatevalue(\"ALL\")>ALL</a><a href='#' class='w-dropdown-link' tabindex='0' onclick='setstatevalue(\"" +
              statesdata.name +
              "\")'>" +
              statesdata.name +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-0").append(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setstatevalue(\"" +
              statesdata.name +
              "\")'>" +
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
            "<a href='#' class='w-dropdown-link' tabindex='0'  onclick='setdepartmentvalue(\"ANY\")'>ANY</a><a href='#' class='w-dropdown-link' tabindex='0' onclick='setdepartmentvalue(\"" +
              departmentdata.name +
              "\")'>" +
              departmentdata.name +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-1").append(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setdepartmentvalue(\"" +
              departmentdata.name +
              "\")'>" +
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

$("#add_university_button").on("click", function (e) {
  e.preventDefault();
  var errors = "";
  $("#errors").html("");

  var state_value = localStorage.getItem("state_value");
  var department_name = localStorage.getItem("department_name");
  var univeristy_name = $("#Type-name-of-University").val();
  if (!state_value) {
    state_value = "ALL";
  }
  if (!department_name) {
    department_name = "ANY";
  }
  if (!univeristy_name) {
    univeristy_name = "";
  }
  let univeristy_object = {
    state_info: state_value,
    department_info: department_name,
    university_info: univeristy_name,
  };
  univeristy_array.push(univeristy_object);

  let univeristy_div_to_append =
    "<div class='UniversityOf mt-4'><a href='#' class='anchor-img w-inline-block'><img src='https://uploads-ssl.webflow.com/629a6c53c8ec9fdc6019d9f8/63c83b23bcdbf2331f6d0cc2_Vector%20(20).svg' loading='lazy' alt=''></a><div class='heading-14'>" +
    univeristy_name +
    "</div><div class='tittle-flex'><div class='heading-12'>" +
    department_name +
    "</div><div class='heading-12 blod-700'>" +
    state_value +
    "</div></div></div>";

  $(".university_list").append(univeristy_div_to_append);
});
$("#submit_university_program_button").on("click", function (e) {
  let states_array = [];
  let abortion_access_counter_append = 0;
  e.preventDefault();
  let useruniversity = { university: univeristy_array };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  console.log(userdata.ID + "userdatacheck.uid");
  db.collection("Users")
    .doc(userdata.ID)
    .update(useruniversity)
    .then(() => {
      console.log("user successfully updated!");
    });

  $("#registration_screen_0").addClass("hide");
  $("#registration_screen_1").removeClass("hide");
  localStorage.setItem("university_section_status", true);

  db.collection("AbortionAccess")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        abortionaccessdata = doc.data();
        let text = abortionaccessdata.type;
        let result = text.toLowerCase();
        if (abortion_access_counter_append === 0) {
          $("#abortion_access_parent_div").html(
            "<label class='radio-button-field-3 w-radio'><input type='radio' data-name='Radio 3' id='radio-3' name='radio-3' value='" +
              result +
              "' class='w-form-formradioinput radio-button-4 w-radio-input'><span class='radio-btn-text w-form-label' for='radio-3'>" +
              abortionaccessdata.type +
              "</span></label>"
          );
        } else {
          $("#abortion_access_parent_div").append(
            "<label class='radio-btn-no w-radio'><input type='radio' data-name='Radio 3' id='radio-3' name='radio-3' value='" +
              result +
              "' class='w-form-formradioinput radio-button-4 w-radio-input'><span class='radio-btn-text w-form-label' for='radio-3'>" +
              abortionaccessdata.type +
              "</span></label>"
          );
        }
        // console.log(abortionaccessdata + "abortionaccessdata");
      });
    });
});

$("#add_values_button").on("click", function (e) {
  let states_array = [];
  e.preventDefault();

  let rotc_values = $('input[name="radio"]:checked').val();
  let access_abortion_values = $('input[name="radio-3"]:checked').val();
});

$(document).on("input change", "#ethnicity_range", function () {
  localStorage.setItem("ethnicity_range", $(this).val());
});

function setstatevalue(state_name) {
  localStorage.setItem("state_value", JSON.stringify(state_name));
  $("#state_value_text_block").html(state_name);
}

function setdepartmentvalue(department_name) {
  localStorage.setItem("department_name", JSON.stringify(department_name));
  $("#department_value_block_text").html(department_name);
}

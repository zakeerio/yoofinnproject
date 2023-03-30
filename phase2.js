var db = firebase.firestore();
var univeristy_array = [];
let career_array = [];
var univeristy_counter = 0;
var career_counter = 0;

$(document).ready(function () {
  let university_section_status = localStorage.getItem(
    "university_section_status"
  )
    ? localStorage.getItem("university_section_status")
    : false;

  let value_section_status = localStorage.getItem("value_section_status")
    ? localStorage.getItem("value_section_status")
    : false;
  let cost_section_status = localStorage.getItem("cost_section_status")
    ? localStorage.getItem("cost_section_status")
    : false;

  let career_section_status = localStorage.getItem("career_section_status")
    ? localStorage.getItem("career_section_status")
    : false;

  let school_section_status = localStorage.getItem("school_section_status")
    ? localStorage.getItem("school_section_status")
    : false;

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
  $("#default_univerisity_item").css("display", "none");
  $("#default_career_item").css("display", "none");
  $("#help_page").addClass("hide");

  localStorage.setItem("help_call", JSON.stringify("splash"));

  console.log(university_section_status);

  if (university_section_status === "false") {
    console.log("here");
    $("#university_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (value_section_status === "false" || value_section_status === false) {
    $("#values_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }
  if (cost_section_status === "false" || cost_section_status === false) {
    $("#cost_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === tick_image) {
        $(this).attr("src", forward_image);
      }
    });
  }

  // console.log("career_section" + career_section_status + "status");
  // console.log("type off" + typeof career_section_status + "status");
  if (career_section_status === "true" || career_section_status === true) {
    $("#careers_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      // console.log(curSrc + "cursc");
      if (curSrc === forward_image) {
        $(this).attr("src", tick_image);
      }
    });
  }
  if (school_section_status === "true" || school_section_status === true) {
    $("#school_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === forward_image) {
        $(this).attr("src", tick_image);
      }
    });
  }
  if (sat_section_status === true || sat_section_status === "true") {
    $("#sat_section .dashboard-image").each(function () {
      var curSrc = $(this).attr("src");
      console.log(curSrc);
      if (curSrc === forward_image) {
        $(this).attr("src", tick_image);
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
  let university_section_status = localStorage.getItem(
    "university_section_status"
  );

  console.log(university_section_status + "university_section_status");
  if (
    university_section_status === false ||
    university_section_status === "false" ||
    university_section_status === null
  ) {
    var userdatacheck = localStorage.getItem("userfbdata");
    console.log(userdatacheck + "userdatacheck");
    let userdata = JSON.parse(userdatacheck);
    if (userdatacheck !== null) {
      $("#registration_splash_screen").addClass("hide");
      $("#registration_screen_0").removeClass("hide");
    }
  }

  localStorage.setItem("help_call", JSON.stringify("university_section"));

  let counter_append = 0;
  let country_counter_append = 0;

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        statesdata = doc.data();

        if (counter_append === 0) {
          $("#w-dropdown-list-0").html(
            "<a href='#' class='w-dropdown-link' tabindex='0'  onclick='setstatevalue(\"ALL\")'>ALL</a>" +
              " " +
              "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setstatevalue(\"" +
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
$("#values_section").on("click", function (e) {
  let abortion_access_counter_append = 0;
  let ethnicity_counter_append = 0;
  let religion_counter_append = 0;
  e.preventDefault();
  let value_section_status = localStorage.getItem("value_section_status");

  if (
    value_section_status === false ||
    value_section_status === "false" ||
    value_section_status === null
  ) {
    var userdatacheck = localStorage.getItem("userfbdata");
    let userdata = JSON.parse(userdatacheck);
    if (userdata) {
      $("#registration_splash_screen").addClass("hide");
      $("#registration_screen_1").removeClass("hide");
    }
  }

  localStorage.setItem("help_call", JSON.stringify("values_section"));

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
        abortion_access_counter_append = abortion_access_counter_append + 1;
      });
    });

  db.collection("Ethnicity")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ethnicitydata = doc.data();
        let text = ethnicitydata.ethnicity_type;
        let result = text.toLowerCase();
        if (ethnicity_counter_append === 0) {
          $("#w-dropdown-list-2").html(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setethnicityvalue(\"" +
              result +
              "\")'>" +
              ethnicitydata.ethnicity_type +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-2").append(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setethnicityvalue(\"" +
              result +
              "\")'>" +
              ethnicitydata.ethnicity_type +
              "</a>"
          );
        }
        ethnicity_counter_append = ethnicity_counter_append + 1;
      });
    });

  db.collection("Religion")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        religiondata = doc.data();
        let text1 = religiondata.name;
        let result1 = text1.toLowerCase();

        if (religion_counter_append === 0) {
          $("#w-dropdown-list-3").html(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setreligionvalue(\"" +
              result1 +
              "\")'>" +
              religiondata.name +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-3").append(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setreligionvalue(\"" +
              result1 +
              "\")'>" +
              religiondata.name +
              "</a>"
          );
        }
        religion_counter_append = religion_counter_append + 1;
      });
    });
});
$("#cost_section").on("click", function (e) {
  e.preventDefault();
  let cost_section_status = localStorage.getItem("cost_section_status");

  if (
    cost_section_status === false ||
    cost_section_status === null ||
    cost_section_status === "false"
  ) {
    var userdatacheck = localStorage.getItem("userfbdata");
    let userdata = JSON.parse(userdatacheck);
    if (userdata) {
      $("#registration_splash_screen").addClass("hide");
      $("#registration_screen_4").removeClass("hide");
    }
  }

  localStorage.setItem("help_call", JSON.stringify("cost_section"));
});
$("#careers_section").on("click", function (e) {
  let career_array = [];
  e.preventDefault();
  let career_section_status = localStorage.getItem("career_section_status");

  if (
    career_section_status === false ||
    career_section_status === null ||
    career_section_status === "false"
  ) {
    var userdatacheck = localStorage.getItem("userfbdata");
    let userdata = JSON.parse(userdatacheck);
    if (userdata) {
      $("#registration_splash_screen").addClass("hide");
      $("#registration_screen_3").removeClass("hide");
    }
  }

  localStorage.setItem("help_call", JSON.stringify("career_section"));

  db.collection("Career")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        careerdata = doc.data();
        console.log(careerdata + "universitydata");
        career_array.push(careerdata.title);
      });
      console.log(career_array);
    });

  $("#Type-name-of-University-2").autocomplete({
    source: career_array,
  });
});
$("#school_section").on("click", function (e) {
  let career_array = [];
  e.preventDefault();
  let career_section_status = localStorage.getItem("school_section_status");

  if (
    career_section_status === false ||
    career_section_status === null ||
    career_section_status === "false"
  ) {
    var userdatacheck = localStorage.getItem("userfbdata");
    let userdata = JSON.parse(userdatacheck);
    if (userdata) {
      $("#registration_splash_screen").addClass("hide");
      $("#registration_screen_2").removeClass("hide");
    }
  }

  localStorage.setItem("help_call", JSON.stringify("school_section"));
});
$("#sat_section").on("click", function (e) {
  let career_array = [];
  e.preventDefault();

  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  if (userdata) {
    $("#registration_splash_screen").addClass("hide");
    $("#registration_screen_5").removeClass("hide");
  }

  localStorage.setItem("help_call", JSON.stringify("sat_section"));
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

  var state_value = JSON.parse(localStorage.getItem("state_value"));
  var department_name = JSON.parse(localStorage.getItem("department_name"));
  var univeristy_name = $("#Type-name-of-University").val();
  const replaced = univeristy_name.replaceAll(" ", "_");

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

  $("#univeristy_lissting").append(
    "<div class='university_list' id='univeristy_" +
      univeristy_counter +
      "'><a href='#' class='anchor-img w-inline-block' onclick='closeuniversitypanel(\"" +
      replaced +
      "-" +
      univeristy_counter +
      "\")'><img src='https://uploads-ssl.webflow.com/629a6c53c8ec9fdc6019d9f8/63c83b23bcdbf2331f6d0cc2_Vector%20(20).svg' loading='lazy' alt=''></a><div class='heading-14'>" +
      univeristy_name +
      "</div><div class='tittle-flex'><div class='heading-12'>" +
      department_name +
      "</div><div class='heading-12 blod-700'>" +
      state_value +
      "</div></div></div>"
  );
  univeristy_counter = univeristy_counter + 1;
});
$("#submit_university_program_button").on("click", function (e) {
  let states_array = [];
  let abortion_access_counter_append = 0;
  let ethnicity_counter_append = 0;
  let religion_counter_append = 0;
  e.preventDefault();
  let useruniversity = { university: univeristy_array };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  db.collection("Users")
    .doc(userdata.ID)
    .update(useruniversity)
    .then(() => {
      console.log("user successfully updated!");
    });

  $("#registration_screen_0").addClass("hide");
  $("#registration_screen_1").removeClass("hide");
  localStorage.setItem("university_section_status", true);
  localStorage.setItem("help_call", JSON.stringify("values_section"));

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
        abortion_access_counter_append = abortion_access_counter_append + 1;
      });
    });

  db.collection("Ethnicity")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ethnicitydata = doc.data();
        let text = ethnicitydata.ethnicity_type;
        let result = text.toLowerCase();
        if (ethnicity_counter_append === 0) {
          $("#w-dropdown-list-2").html(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setethnicityvalue(\"" +
              result +
              "\")'>" +
              ethnicitydata.ethnicity_type +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-2").append(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setethnicityvalue(\"" +
              result +
              "\")'>" +
              ethnicitydata.ethnicity_type +
              "</a>"
          );
        }
        ethnicity_counter_append = ethnicity_counter_append + 1;
      });
    });

  db.collection("Religion")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        religiondata = doc.data();
        let text1 = religiondata.name;
        let result1 = text1.toLowerCase();

        if (religion_counter_append === 0) {
          $("#w-dropdown-list-3").html(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setreligionvalue(\"" +
              result1 +
              "\")'>" +
              religiondata.name +
              "</a>"
          );
        } else {
          $("#w-dropdown-list-3").append(
            "<a href='#' class='w-dropdown-link' tabindex='0' onclick='setreligionvalue(\"" +
              result1 +
              "\")'>" +
              religiondata.name +
              "</a>"
          );
        }
        religion_counter_append = religion_counter_append + 1;
      });
    });
});
$("#add_values_button").on("click", function (e) {
  e.preventDefault();

  let rotc_values = $('input[name="radio"]:checked').val();
  var ethnicity_type = JSON.parse(localStorage.getItem("ethnicity_type"));
  var ethnicity_range = JSON.parse(localStorage.getItem("ethnicity_range"))
    ? JSON.parse(localStorage.getItem("ethnicity_range"))
    : 5;
  var religion_name = JSON.parse(localStorage.getItem("religion_name"));
  var religion_range = JSON.parse(localStorage.getItem("religion_range"))
    ? JSON.parse(localStorage.getItem("religion_range"))
    : 5;
  let access_abortion_values = $('input[name="radio-3"]:checked').val();

  let values_object = {
    rotc_info: rotc_values,
    ethnicity_type: ethnicity_type,
    ethnicity_range: ethnicity_range,
    religion_name: religion_name,
    religion_range: religion_range,
    access_abortion_info: access_abortion_values,
  };

  let uservalues = { values: values_object };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  db.collection("Users")
    .doc(userdata.ID)
    .update(uservalues)
    .then(() => {
      console.log("user successfully updated!");
    });

  $("#registration_screen_1").addClass("hide");
  $("#registration_screen_2").removeClass("hide");
  localStorage.setItem("value_section_status", true);
  localStorage.setItem("help_call", JSON.stringify("school_section"));
});
$("#add_school_setting").on("click", function (e) {
  let career_array = [];
  e.preventDefault();

  let school_size = $('input[name="school_size"]:checked').val();
  let school_area = $('input[name="school_area"]:checked').val();

  let school_setting_object = {
    school_size: school_size,
    school_area: school_area,
  };

  let schoolsettingvalues = { school_setting: school_setting_object };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  db.collection("Users")
    .doc(userdata.ID)
    .update(schoolsettingvalues)
    .then(() => {
      console.log("user successfully updated!");
    });

  db.collection("Career")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        careerdata = doc.data();
        console.log(careerdata + "universitydata");
        career_array.push(careerdata.title);
      });
      console.log(career_array);
    });

  $("#Type-name-of-University-2").autocomplete({
    source: career_array,
  });

  $("#registration_screen_2").addClass("hide");
  $("#registration_screen_3").removeClass("hide");

  localStorage.setItem("help_call", JSON.stringify("career_section"));
  localStorage.setItem("school_section_status", true);
});
$("#add_career_button").on("click", function (e) {
  e.preventDefault();

  var career_info = localStorage.getItem("career_info");
  var salary_info = localStorage.getItem("salary_info");
  var growth_info = localStorage.getItem("growth_info");

  if (career_info === undefined || career_info === "undefined") {
    career_info = "";
  }
  if (salary_info === undefined || salary_info === "undefined") {
    salary_info = "";
  }
  if (growth_info === undefined || growth_info === "undefined") {
    growth_info = "";
  }

  let career_object = {
    career_info: career_info,
    salary_info: salary_info,
    growth_info: growth_info,
  };
  let careersettingvalues = { career: career_object };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  db.collection("Users")
    .doc(userdata.ID)
    .update(careersettingvalues)
    .then(() => {
      console.log("user successfully updated!");
    });

  localStorage.setItem("help_call", JSON.stringify("cost_section"));
  localStorage.setItem("career_section_status", true);
  $("#registration_screen_3").addClass("hide");
  $("#registration_screen_4").removeClass("hide");
});
$("#add_cost_factor").on("click", function (e) {
  e.preventDefault();

  let scholarship_status = $('input[name="scholarship_status"]:checked').val();
  var concern_tracker = localStorage.getItem("concern_tracker");
  let cost_status = $('input[name="cost_status"]:checked').val();
  let university_place = $('input[name="university_place"]:checked').val();
  let living_status = $('input[name="living_status"]:checked').val();

  let cost_object = {
    scholarship_info: scholarship_status,
    concern_info: concern_tracker,
    cost_info: cost_status,
    university_info: university_place,
    living_info: living_status,
  };
  let costsettingvalues = { cost: cost_object };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  db.collection("Users")
    .doc(userdata.ID)
    .update(costsettingvalues)
    .then(() => {
      console.log("user successfully updated!");
    });

  $("#registration_screen_4").addClass("hide");
  $("#registration_screen_5").removeClass("hide");
  localStorage.setItem("cost_section_status", true);
  localStorage.setItem("help_call", JSON.stringify("sat_section"));
});

$("#review_submit").on("click", function (e) {
  e.preventDefault();

  $("#registration_screen_5").addClass("hide");
  $("#registration_screen_9").removeClass("hide");
});

$(".continye-image").on("click", function (e) {
  e.preventDefault();

  console.log("call to action");
  var help_call = JSON.parse(localStorage.getItem("help_call"));

  if (help_call === "splash") {
    $("#registration_splash_screen").addClass("hide");
    $("#help_page").removeClass("hide");
  } else if (help_call === "university_section") {
    $("#registration_screen_0").addClass("hide");
    $("#help_page").removeClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").addClass("hide");
    $("#help_page").removeClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").addClass("hide");
    $("#help_page").removeClass("hide");
  } else if (help_call === "career_section") {
    $("#registration_screen_3").addClass("hide");
    $("#help_page").removeClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").addClass("hide");
    $("#help_page").removeClass("hide");
  } else if (help_call === "sat_section") {
    $("#registration_screen_5").addClass("hide");
    $("#help_page").removeClass("hide");
  }
});

$("#career_forward").on("click", function (e) {
  e.preventDefault();

  console.log("call to action");
  var help_call = JSON.parse(localStorage.getItem("help_call"));
  $("#registration_screen_3").addClass("hide");
  $("#help_page").removeClass("hide");
});
$("#accept_help_button").on("click", function (e) {
  e.preventDefault();

  var help_call = JSON.parse(localStorage.getItem("help_call"));

  if (help_call === "splash") {
    $("#registration_splash_screen").removeClass("hide");
    $("#help_page").addClass("hide");
  } else if (help_call === "university_section") {
    $("#registration_screen_0").removeClass("hide");
    $("#help_page").addClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").removeClass("hide");
    $("#help_page").addClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").removeClass("hide");
    $("#help_page").addClass("hide");
  } else if (help_call === "career_section") {
    $("#registration_screen_3").removeClass("hide");
    $("#help_page").addClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").removeClass("hide");
    $("#help_page").addClass("hide");
  } else if (help_call === "sat_section") {
    $("#registration_screen_5").removeClass("hide");
    $("#help_page").addClass("hide");
  }
});
$("#tiles_section").on("click", function (e) {
  e.preventDefault();

  var help_call = JSON.parse(localStorage.getItem("help_call"));

  if (help_call === "splash") {
    $("#registration_splash_screen").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  } else if (help_call === "university_section") {
    $("#registration_screen_0").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  } else if (help_call === "career_section") {
    $("#registration_screen_3").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  } else if (help_call === "sat_section") {
    $("#registration_screen_5").addClass("hide");
    $("#registration_screen_7").removeClass("hide");
  }
});
$("#about_section").on("click", function (e) {
  e.preventDefault();

  var help_call = JSON.parse(localStorage.getItem("help_call"));

  if (help_call === "splash") {
    $("#registration_splash_screen").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  } else if (help_call === "university_section") {
    $("#registration_screen_0").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  } else if (help_call === "career_section") {
    $("#registration_screen_3").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  } else if (help_call === "sat_section") {
    $("#registration_screen_5").addClass("hide");
    $("#registration_screen_10").removeClass("hide");
  }
});
$("#univeristy_exit_button").on("click", function (e) {
  e.preventDefault();
  localStorage.setItem("exit_call", JSON.stringify("university_section"));
  logout();
});
$("#values_exit_button").on("click", function (e) {
  e.preventDefault();
  localStorage.setItem("exit_call", JSON.stringify("values_section"));
  logout();
});
$("#school_exit_button").on("click", function (e) {
  e.preventDefault();
  localStorage.setItem("exit_call", JSON.stringify("school_section"));
  logout();
});
$("#career_exit_button").on("click", function (e) {
  e.preventDefault();
  localStorage.setItem("exit_call", JSON.stringify("career_section"));
  logout();
});
$("#cost_exit_button").on("click", function (e) {
  e.preventDefault();
  localStorage.setItem("exit_call", JSON.stringify("cost_section"));
  logout();
});
$("#review_exit_button").on("click", function (e) {
  e.preventDefault();
  localStorage.setItem("exit_call", JSON.stringify("review_section"));
  logout();
});

$("#book_a_meeting_univeristy").on("click", function (e) {
  e.preventDefault();
  $("#registration_screen_0").addClass("hide");
  $("#registration_screen_6").removeClass("hide");
});
$("#Book_now").on("click", function (e) {
  e.preventDefault();
  $("#registration_splash_screen").addClass("hide");
  $("#registration_screen_6").removeClass("hide");
});
$("#coming_career_path").on("click", function (e) {
  e.preventDefault();
  $("#registration_splash_screen").addClass("hide");
  $("#help_page").removeClass("hide");
});
$("#book_a_meeting_values").on("click", function (e) {
  e.preventDefault();
  $("#registration_screen_1").addClass("hide");
  $("#registration_screen_6").removeClass("hide");
});
$("#book_a_meeting_school").on("click", function (e) {
  e.preventDefault();
  $("#registration_screen_2").addClass("hide");
  $("#registration_screen_6").removeClass("hide");
});
$("#book_a_meeting_cost").on("click", function (e) {
  e.preventDefault();
  $("#registration_screen_4").addClass("hide");
  $("#registration_screen_6").removeClass("hide");
});
$("#close_book_a_meeting").on("click", function (e) {
  e.preventDefault();

  var help_call = JSON.parse(localStorage.getItem("help_call"));

  if (help_call === "university_section") {
    $("#registration_screen_0").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  }
});
$("#add_expert").on("click", function (e) {
  e.preventDefault();

  var help_call = JSON.parse(localStorage.getItem("help_call"));
  let expert_selection = $('input[name="expert_selection"]:checked').val();

  let userexpert = { expert: expert_selection };
  var userdatacheck = localStorage.getItem("userfbdata");
  let userdata = JSON.parse(userdatacheck);
  db.collection("Users")
    .doc(userdata.ID)
    .update(userexpert)
    .then(() => {
      console.log("user successfully updated!");
    });

  if (help_call === "university_section") {
    $("#registration_screen_0").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  } else if (help_call === "splash") {
    $("#registration_splash_screen").removeClass("hide");
    $("#registration_screen_6").addClass("hide");
  }
});

$(document).on("input change", "#ethnicity_range", function () {
  console.log("value changed");
  localStorage.setItem("ethnicity_range", $(this).val());
});
$(document).on("input change", "#religion_range", function () {
  console.log("value changed religion_range");
  localStorage.setItem("religion_range", $(this).val());
});
$(document).on("input change", "#concern_tracker", function () {
  localStorage.setItem("concern_tracker", $(this).val());
});

function setstatevalue(state_name) {
  localStorage.setItem("state_value", JSON.stringify(state_name));
  $("#state_value_text_block").html(state_name);
  $("#w-dropdown-toggle-0").removeClass("w--open");
  $("#w-dropdown-list-0").removeClass("w--open");
}
function logout() {
  localStorage.removeItem("userdata");
  localStorage.removeItem("userfbdata");
  var help_call = JSON.parse(localStorage.getItem("exit_call"));

  if (help_call === "university_section") {
    $("#registration_screen_0").addClass("hide");
    $("#registration_splash_screen").removeClass("hide");
  } else if (help_call === "values_section") {
    $("#registration_screen_1").addClass("hide");
    $("#registration_splash_screen").removeClass("hide");
  } else if (help_call === "school_section") {
    $("#registration_screen_2").addClass("hide");
    $("#registration_splash_screen").removeClass("hide");
  } else if (help_call === "career_section") {
    $("#registration_screen_3").addClass("hide");
    $("#registration_splash_screen").removeClass("hide");
  } else if (help_call === "cost_section") {
    $("#registration_screen_4").addClass("hide");
    $("#registration_splash_screen").removeClass("hide");
  } else if (help_call === "review_section") {
    $("#registration_screen_5").addClass("hide");
    $("#registration_splash_screen").removeClass("hide");
  }
  // User is signed out.
  console.log("user logged out!");
}
function setdepartmentvalue(department_name) {
  localStorage.setItem("department_name", JSON.stringify(department_name));
  $("#department_value_block_text").html(department_name);
  $("#w-dropdown-toggle-1").removeClass("w--open");
  $("#w-dropdown-list-1").removeClass("w--open");
}

function setethnicityvalue(ethnicity_type) {
  localStorage.setItem("ethnicity_type", JSON.stringify(ethnicity_type));
  $("#ethnicity_value_text_block").html(ethnicity_type);
  $("#w-dropdown-toggle-2").removeClass("w--open");
  $("#w-dropdown-list-2").removeClass("w--open");
}

function setreligionvalue(religion_name) {
  localStorage.setItem("religion_name", JSON.stringify(religion_name));
  $("#religion_value_text_block").html(religion_name);
  $("#w-dropdown-toggle-3").removeClass("w--open");
  $("#w-dropdown-list-3").removeClass("w--open");
}

function closeuniversitypanel(panel_id) {
  // let panel_div_id = "univeristy_" + panel_id;

  let [university_key, panelid] = panel_id.split("-");
  const replaced = university_key.replaceAll("_", " ");

  $("#univeristy_" + panelid).css("display", "none");

  const index = univeristy_array.findIndex(
    (item) => item.university_info === replaced
  );
  console.log(univeristy_array + "before");
  if (index > -1) {
    // only splice array when item is found
    univeristy_array.splice(index, 1); // 2nd parameter means remove one item only
  }
  console.log(univeristy_array + "after");
}

function postcareerselection(career_selection_text) {
  console.log(career_selection_text + "career_selection_text");
  let career_name_with_space = career_selection_text.split("-");
  let career_info = career_name_with_space[0];
  let salary_info = career_name_with_space[1];
  let growth_info = career_name_with_space[2];
  if (career_info === "NAN") {
    career_info = "";
  }
  if (salary_info === "NAN") {
    salary_info = " ";
  }
  if (growth_info === "NAN") {
    growth_info = false;
  }

  console.log(career_info + "career_info");
  console.log(salary_info + "salary_info");
  console.log(growth_info + "growth_info");

  localStorage.setItem("career_info", JSON.stringify(career_info));
  localStorage.setItem("salary_info", JSON.stringify(salary_info));
  localStorage.setItem("growth_info", JSON.stringify(growth_info));
}

function get_the_data(career, salary, growth) {
  console.log("called");
  db.collection("Career")
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot + "querySnapshot");
      querySnapshot.forEach((doc) => {
        careerdata = doc.data();
        localStorage.setItem("career_Test", JSON.stringify(careerdata));

        // console.log(doc.id + "careerdata");
        // console.log(careerdata.title + "careerdata.title");
        // console.log(careerdata.salary + " careerdata.salary ");
        // console.log(careerdata.growth_careers + "careerdata.growth_careers");
        if (
          careerdata.title === career ||
          careerdata.salary === salary ||
          careerdata.growth_careers === growth
        ) {
          // console.log("in it ");
          let career_title = careerdata.title;
          let career_name_with_space = career_title.split(" ");
          let half_name = career_name_with_space[0]
            ? career_name_with_space[0]
            : "";
          let last_name = career_name_with_space[1]
            ? career_name_with_space[1]
            : "";

          var index_of_career = career_array.indexOf(career_title);
          console.log(career_array + "career array");

          const replaced = career_title.replaceAll(" ", "_");

          console.log(index_of_career + "index_of_career");
          if (index_of_career > -1) {
          } else {
            $("#career_parent_list").append(
              "<div class='training flex'><div class='results'><div class='social-heading16 mb'><span class='light-sky-blue'>" +
                half_name +
                "</span>" +
                last_name +
                "</div></div><img src='https://uploads-ssl.webflow.com/629a6c53c8ec9fdc6019d9f8/63737f69d2049860f5be355f_ep_arrow-right-bold.svg' loading='lazy' alt='' onclick='postcareerselection(\"" +
                replaced +
                "-" +
                careerdata.salary +
                +"-" +
                careerdata.growth_careers +
                "\")' ></div>"
            );
            career_array.push(career_title);
          }

          career_counter = career_counter + 1;
        }
      });
      career_array = [];
    });
}

$("#Type-name-of-University-2").on("change", function () {
  var career_text = $(this).val();
  let Salary_button = $('input[name="Salary_button"]:checked').val();
  let growth_button = $('input[name="growth_button"]:checked').val();

  get_the_data(career_text, Salary_button, growth_button);
});

$("input[type=radio][name=Salary_button]").change(function () {
  var career_text_1 = $("#Type-name-of-University-2").val();
  let Salary_button_1 = $(this).val();
  let growth_button_1 = $('input[name="growth_button"]:checked').val();
  get_the_data(career_text_1, Salary_button_1, growth_button_1);
});

$("input[type=radio][name=growth_button]").change(function () {
  console.log("call");
  var career_text_2 = $("#Type-name-of-University-2").val();
  let Salary_button_2 = $('input[name="Salary_button"]:checked').val();
  let growth_button_2 = $(this).val();
  get_the_data(career_text_2, Salary_button_2, growth_button_2);
});

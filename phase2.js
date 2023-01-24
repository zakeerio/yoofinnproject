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
  let university_section_status = localStorage.getItem(
    "university_section_status"
  );
  console.log(university_section_status + "university_section_status");

  if (
    university_section_status === false ||
    university_section_status === null
  ) {
    $("#registration_splash_screen").addClass("hide");
    $("#registration_screen_0").removeClass("hide");
  }
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
  var ethnicity_range = JSON.parse(localStorage.getItem("ethnicity_range"));
  var religion_name = JSON.parse(localStorage.getItem("religion_name"));
  var religion_range = JSON.parse(localStorage.getItem("religion_range"));
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
});

$(document).on("input change", "#ethnicity_range", function () {
  console.log("value changed");
  localStorage.setItem("ethnicity_range", $(this).val());
});
$(document).on("input change", "#religion_range", function () {
  console.log("value changed religion_range");
  localStorage.setItem("religion_range", $(this).val());
});

function setstatevalue(state_name) {
  localStorage.setItem("state_value", JSON.stringify(state_name));
  $("#state_value_text_block").html(state_name);
  $("#w-dropdown-toggle-0").removeClass("w--open");
  $("#w-dropdown-list-0").removeClass("w--open");
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

  // let career_object = {
  //   career_info: career_info,
  //   salary_info: salary_info,
  //   growth_ifo: growth_ifo,
  // };
  // let careersettingvalues = { career: career_object };
  // var userdatacheck = localStorage.getItem("userfbdata");
  // let userdata = JSON.parse(userdatacheck);
  // db.collection("Users")
  //   .doc(userdata.ID)
  //   .update(careersettingvalues)
  //   .then(() => {
  //     console.log("user successfully updated!");
  //   });

  // $("#registration_screen_3").addClass("hide");
  // $("#registration_screen_4").removeClass("hide");
}

function get_the_data(career, salary, growth) {
  console.log(career + "career");
  console.log(salary + "Salary");
  console.log(growth + "growth");

  let growth_value;
  let salary_Value;
  if (career === undefined) {
    career = "";
  }
  if (salary === undefined) {
    salary_Value = "average";
  } else {
    salary_Value = salary;
  }
  if (growth === undefined) {
    growth_value = true;
  } else {
    growth_value = growth;
  }

  db.collection("Career")
    .where("title", "==", career)
    .where("salary", "==", salary)
    .where("growth_careers", "==", growth)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        careerdata = doc.data();
        let career_title = careerdata.title;
        let career_name_with_space = career_title.split(" ");
        let half_name = career_name_with_space[0]
          ? career_name_with_space[0]
          : "";
        let last_name = career_name_with_space[1]
          ? career_name_with_space[1]
          : "";

        var index_of_career = career_array.indexOf(career_title);

        const replaced = career_title.replaceAll(" ", "_");

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
              salary_Value +
              +"-" +
              growth_value +
              "\")' ></div>"
          );
          career_array.push(career_title);
        }

        career_counter = career_counter + 1;
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
  var career_text_2 = $("#Type-name-of-University-2").val();
  let Salary_button_2 = $('input[name="Salary_button"]:checked').val();
  let growth_button_2 = $(this).val();
  get_the_data(career_text_2, Salary_button_2, growth_button_2);
});

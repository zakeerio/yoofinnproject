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
	let universitydata_array = [];
	db.collection("University")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				var universitydata = doc.data();
				var universityId = doc.id;
				var university_name = { uniId : universitydata.university_name+"__"+universityId};
				universitydata_array.push(university_name);

				// Get the input element
				// var autocompleteInput = $("#Type-name-of-University");

				// // Add attributes from the array
				// autocompleteInput.attr("data-id", universityId);



				// console.log(universitydata + "universitydata");
				// console.log(universityId);
				university_array.push(universitydata.university_name);
				// console.log(university_array);
			});

			console.log(universitydata_array);
		localStorage.setItem('universitydata_array', JSON.stringify(universitydata_array));
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
	
	var universitydata_array = JSON.parse(localStorage.getItem("universitydata_array"));
	var universityId = "";
	var exsistUniversity = false;
	universitydata_array.forEach((doc) => {
		universitydata = doc;
		// console.log(universitydata);
		var parts = universitydata.uniId.split('__');
		if(parts[0] == univeristy_name ) {
			universityId = parts[1];
			exsistUniversity = true;
			return false;
		} 
	});
	if(exsistUniversity == false) {
		alert("please add exsisting university")
		return false;
	} 
	

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
		university_id: universityId,

	};
	// console.log(univeristy_object); return false;
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





	// User added university successfully
	db.collection("Users")
		.doc(userdata.ID)
		.update(useruniversity)
		.then(() => {
			univeristy_array.forEach((result) => {
				var universityId = result.university_id;
				console.log(universityId);
				db.collection("UnivestiesStatus").where("universityId", "==", universityId).where("userId", "==", userdata.ID).get().then((querySnapshot) => {
				var universityStatusData = { universityId: universityId, userId: userdata.ID, status: "notsure" };
					console.log("kutch bhi");
					if (querySnapshot.size == 0) {
						db.collection("UnivestiesStatus")

						


							.add(universityStatusData)
							.then(docRef => {
	
								console.log("Univesrity data successfully inserted with ID: ", docRef.id);
							})
							.catch(error => {
								console.error("Error update unvieristy status data:", error);
							});
					}
				});
			console.log(result)
		});
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
		$("#registration_screen_seven").removeClass("hide");
	} else if (help_call === "university_section") {
		$("#registration_screen_0").addClass("hide");
		$("#registration_screen_seven").removeClass("hide");
	} else if (help_call === "values_section") {
		$("#registration_screen_1").addClass("hide");
		$("#registration_screen_seven").removeClass("hide");
	} else if (help_call === "school_section") {
		$("#registration_screen_2").addClass("hide");
		$("#registration_screen_seven").removeClass("hide");
	} else if (help_call === "career_section") {
		$("#registration_screen_3").addClass("hide");
		$("#registration_screen_seven").removeClass("hide");
	} else if (help_call === "cost_section") {
		$("#registration_screen_4").addClass("hide");
		$("#registration_screen_seven").removeClass("hide");
	} else if (help_call === "sat_section") {
		$("#registration_screen_5").addClass("hide");
		$("#registration_screen_seven").removeClass("hide");
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
					console.log(careerdata.title + "careerdata.title");
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
			//career_array = [];
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





// universitydatablock
$('.progress').on("change", function () {
	var value1 = $(this).val();
	$(this).css("background", `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value1}%, #fff ${value1}%, white 100%)`)

})

$(".about-us").on('click', function () {
	$(".continue-section").addClass("hide");
	$("#registration_screen_10").removeClass("hide");
})


/////////////////////////////////////////



$(".tiles").on('click', function () {

	db.collection('settings').doc("universityCount").get().then((querySnapshot) => {
		const doc = querySnapshot.data();
		// var documentdata = doc.data();
		console.log(doc);


		var likedTotal = doc.liked;
		var rejectedTotal = doc.disliked;
		var notSureTotal = doc.notsure;
		// console.log(oldstatus, newStatus, currentStatus); //return false;

		$("#likedTotal").text(likedTotal);
		$("#rejectedTotal").text(rejectedTotal);
		$("#notSureTotal").text(notSureTotal);


	});



	var userdatacheck = localStorage.getItem("userfbdata");

	userdatacheck = JSON.parse(userdatacheck);

	let displayUniversity = userdatacheck.university;
	
	if (displayUniversity !== null && displayUniversity !== undefined) {
		// console.log(displayUniversity);


		var notsureUniversityBlock = "";
		var likedUniversityBlock = "";
		var dislikedUniversityBlock = "";

		$(".not-sure-tab").html(notsureUniversityBlock);
		$(".likeduniversityblock").html(likedUniversityBlock);
		$(".dislikeuniversityblock").html(dislikedUniversityBlock);

		let allstepscount = 0;
		let stepsdone = 0;
		let stepsincomplete = 0;
		var all_done  = true;


		displayUniversity.forEach(myFunction);

		function myFunction(value) {
			// txt += value + "<br>";
			// console.log(value.university_id); return false;
			// console.log(userdatacheck); return false;
			db.collection("University").where("university_name", "==", value.university_info).get().then((querySnapshot) => {
			// db.collection("University").doc(value.university_id).get().then((querySnapshot) => {
				// console.log(querySnapshot.size); return false;
				if (querySnapshot.size > 0) {
					querySnapshot.forEach((doc) => {
						var statedata = doc.data();

						// console.log(statedata); return false;
						var userdatacheck = localStorage.getItem("userfbdata");
						userdatacheck = JSON.parse(userdatacheck);

						// var userID = userdatacheck.ID;
						var uniId = doc.id;
						db.collection("UnivestiesStatus").where("universityId", "==", uniId).where("userId", "==", userdatacheck.ID).get().then((querySnapshot) => {
							// console.log(uniId); return false;


							if (querySnapshot.size > 0) {
								var statusdoc = querySnapshot.docs[0];
								statusdoc = statusdoc.data();

								if (statusdoc) {

									if (statusdoc.status == "notsure") {
										console.log(statusdoc.status)

										// console.log(doc.id, " => ", doc.data());

										notsureUniversityBlock += `
											
											<div class="tab-box universitydatablock"  id="universityId_${doc.id}" data-uniid="${doc.id}" >
												<div class="btn"><a href="#" class="university-button mb-8 hide-bodr w-button">${statedata.university_name}</a>
													<div class="bg-img-text">
													<div class="nub-text">97%</div>
													<div class="heaing-10">MATCH</div>
													</div>
												</div>
												<div class="university-denver"><a href="#" class="links-arch w-inline-block">
													<div class="text-block-29 capitalize">${value.department_info}</div>
													</a>
													<div class="heading-12">Denver, <span class="span">${value.state_info}</span></div>
												</div>
												<div class="soical-icon mt-15">
													<div class="soicl-icon-text">
														<a href="#" class="tile-rejected w-inline-block" data-status="disliked">
														<div class="socl-icon">
															<img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63c9351446fa29beec75737f_ion_thumbs-down-sharp.svg" loading="lazy" alt=""></div>
													</a>
													<div class="socl-text">
														<div class="heading-12">Reject</div>
													</div>
													</div>
													<div class="soicl-icon-text">
													<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63c93514aa263025c35d8ed5_Vector%20(22).svg" loading="lazy" alt=""></div><a href="#" class="tile-liked w-inline-block" data-status="liked">
														<div class="socl-text position">
														<div>Like</div>
														</div>
													</a>
													</div>
												</div>
											</div>` ;
									} else if (statusdoc.status == "liked") {

										async function fetchLikedUniversities() {
											try {
												var stepBoxes = "";
												var stepBoxesCheckBox = "";
										
												const querySnapshot = await db.collection("UserUniverstiesLiked")
													.where("university_id", "==", uniId)
													.where("user_id", "==", userdatacheck.ID)
													.get();
										
													
													if (querySnapshot.size > 0) {
														var university = querySnapshot.docs[0].data();
														console.log(querySnapshot.docs[0].id + " LIKES SIZE", uniId, userdatacheck.ID);
														var applied_done = (university.applied_at !="") ? "bg-green" : '';
														var applied_date = false;
														if(university.applied_at !="" && university.applied_at != undefined ){
														 	var splitdate = university.applied_at.split(" ");
															 applied_date = splitdate[0];
														}
														
														var sortOrder = ["About the university", "Degree programs", "Tuition & Scholarship", "Book a Virtual Tour", "Book in person Tour", "Applied"];
														var linksorder = [
															"https://www.google.com1",
															"https://www.google.com/2",
															"https://www.google.com/3",
															"https://www.google.com/4",
															"https://www.google.com/5",
															"https://www.google.com/6"
														];
														var sortedSteps = {};
														var counter = 0;
														sortOrder.forEach(function(step) {
																	
														// Iterate over each universityLiked
														
														// console.log(step, university.steps.hasOwnProperty(step));
														if (university.steps.hasOwnProperty(step)) {
															sortedSteps[step] = university.steps[step];

															if(university.steps[step] == "incomplete"){
																all_done = false;
															}

															(university.steps[step] == "complete") ? stepsdone++ : stepsincomplete++;
															allstepscount++;
															
															var appliedtext = (step == "Applied") ? "<span class='applied_at'>" +((applied_date !=false) ? applied_date : "") +"</span>" : "";

															stepBoxes += `
															<div class="checkbox-text box-hover ${(university.steps[step] == 'complete' ? 'bg-clolor' : '')} ${applied_done}"  data-url="${linksorder[counter]}">
																<div class="heading-12 chkboxlabel ${(university.steps[step] == 'complete' ? 'clr-white' : '')}">${step} <br> ${appliedtext}</div>
																<label class="w-checkbox checkbox-field-5 position">
																																	<div class="w-checkbox-input w-checkbox-input--inputType-custom liked-checkbox bg ${(university.steps[step] == 'complete' ? 'w--redirected-checked' : '')}"></div>
															
																	<input type="checkbox" id="checkbox-2" name="checkbox-2" data-universityId="${uniId}" data-name="${step}" class="checkboxStepbox"
																		style="opacity:0;position:absolute;z-index:-1">
																	<span class="checkbox-label-3 w-form-label" for="checkbox-2"></span>
																</label>
															</div>`;
															// console.log(step + ": " + university.steps[step]);

															stepBoxesCheckBox+= `
															<label class="w-checkbox checkbox-field-5">
																<div class="w-checkbox-input w-checkbox-input--inputType-custom liked-checkbox ${(university.steps[step] == 'complete' ? 'w--redirected-checked' : '')}"></div><input
																type="checkbox" ${(university.steps[step] == 'complete' ? 'checked' : '')} id="checkbox-2" data-targetname="${step}" name="checkbox-2" data-name="Checkbox 2"
																style="opacity:0;position:absolute;z-index:-1" disabled><span class="checkbox-label-3 w-form-label"
																for="checkbox-2"></span>
															</label>
															`;

														}
														counter++;
													})
		
													// Place the code dependent on stepBoxes here											

													setLikedUniversityBlockContent(stepBoxes, stepBoxesCheckBox, applied_date)
												}
											} catch (error) {
												console.error("Error getting liked universities: ", error);
											}
										}
		
										// Call the async function
										fetchLikedUniversities();
										// console.log(likedUniversityBlock);

										function setLikedUniversityBlockContent(stepBoxesHtml, stepBoxesCheckBox, applied_date){
											likedUniversityBlock = `
											<div class="tab-box mt-20 universitydatablock" id="universityId_${uniId}" data-uniid="${uniId}" >
											<div class="uni-block-header">
												<div>
												<div class="btn"><a href="#"
													class="university-button mb-8 w-button">${value.university_info}</a></div>
												<div class="university-denver">
												<div class="heading-12">Denver, <span class="span">${value.state_info}</span></div><a
													href="#" class="links-arch w-inline-block">
													<div class="text-block-29 mt-10">${value.department_info}</div>
												</a>
												</div>
												</div>
												<div class="all-done-alert" ${(applied_date != false) ? "style='display:flex;'" : ""}><img
													src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63793b406a668a62dea3049a_Vector%20(12).svg"
													loading="lazy" alt="">
												<div>All Done</div>
												</div>
											</div>
												
												<div class="form-like w-form">
												<form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get"
													class="form-checkbox" data-wf-page-id="636cd27562d86914d6afe79c"
													data-wf-element-id="c72dbb86-82a3-c9fd-098d-978348e89213" aria-label="Email Form 3">
													<div class="main-checkbox mt-15">
														${stepBoxesHtml}
														
													</div>
													<div class="checkox">
													${stepBoxesCheckBox}
														
													</div>
												</form>
												<div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form 3 success">
													<div>Thank you! Your submission has been received!</div>
												</div>
												<div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form 3 failure">
													<div>Oops! Something went wrong while submitting the form.</div>
												</div>
												</div>
											</div>`;

											if (statusdoc.status == "liked") {
												$(".likeduniversityblock").append(likedUniversityBlock);
											}
											// $(".likeduniversityblock").append(likedUniversityBlock);

											// console.log("stepsdone "+stepsdone,"stepsimcomplete "+stepsimcomplete);
											$("#stepsdone").text(stepsdone);
											$("#stepsincomplete").text(stepsincomplete);
											$("#allstepscount").text(allstepscount);

											if(all_done === true) {	
												$(".d-flex.success-block").css("display", "flex");
											} else {
												$(".d-flex.success-block").css("display", "none");
											}


										}

									} else if (statusdoc.status == "disliked") {


										dislikedUniversityBlock += `
										<div class="tab-box universitydatablock"  id="universityId_${doc.id}" data-uniid="${doc.id}" >
										<div class="btn"><a href="#"
											class="university-button mb-8 hide-bodr w-button">${statedata.university_name}</a>
											<div class="bg-img-text">
											<div class="nub-text">97%</div>
											<div class="heaing-10">MATCH</div>
											</div>
										</div>
										<div class="university-denver"><a href="#"
											class="links-arch w-inline-block">
											<div class="text-block-29">${value.department_info}</div>
											</a>
											<div class="heading-12">Denver, <span class="span">${value.state_info}</span></div>
										</div>
										<div class="soical-icon mt-15">
											<div class="soicl-icon-text widht"><a href="#" data-status="notsure"
												class="w-inline-block tile-notsure">
												<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63cd2be3d805d5fe57fbe100_%F0%9F%A4%94.svg" loading="lazy"
													alt=""></div>
											</a>
											<div class="socl-text pt">
												<div class="text-block-62">Not sure</div>
											</div>
											</div>
											<div class="soicl-icon-text">
											<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63c93514aa263025c35d8ed5_Vector%20(22).svg"
												loading="lazy" alt=""></div><a href="#" class="tile-liked w-inline-block" data-status="liked">
												<div class="socl-text position">
												<div>Like</div>
												</div>
											</a>
											</div>
										</div>
									</div>`
									}
								}
							}

							// console.log(universityBlock);
							$(".not-sure-tab").html(notsureUniversityBlock);

							// $(".likeduniversityblock").html(likedUniversityBlock);

							$(".dislikeuniversityblock").html(dislikedUniversityBlock);


						});

					});

			}

		})
	}

	}

	$(".continue-section").addClass("hide");
	$("#registration_screen_seven").removeClass("hide");
})





function tileUpdateUnivesities(universityId) {


	var notsureUniversityBlock = "";
	var likedUniversityBlock = "";
	var dislikedUniversityBlock = "";

	let allstepscount = 0;
	let stepsdone = 0;
	let stepsincomplete = 0;
	let all_done = true;

	// console.log(statedata); return false;
	var userdatacheck = localStorage.getItem("userfbdata");
	userdatacheck = JSON.parse(userdatacheck);

	// var university_name = "Univeristy Name Static";
	// var department_info = "Department Info"
	// var state_info = "State Info";

	let displayUniversity = userdatacheck.university;


	$(document).find("#universityId_" + universityId).remove();
	// var userID = userdatacheck.ID;
	var uniId = universityId;
	db.collection("UnivestiesStatus").where("universityId", "==", uniId).where("userId", "==", userdatacheck.ID).get().then((querySnapshot) => {
		// console.log(uniId); return false;

		

		if (querySnapshot.size > 0) {
			var statusdoc = querySnapshot.docs[0];
			statusdoc = statusdoc.data();

			if (displayUniversity !== null && displayUniversity !== undefined) {
				// console.log(displayUniversity); return false;
		
				// $(".not-sure-tab").html(notsureUniversityBlock);
				// $(".likeduniversityblock").html(likedUniversityBlock);
				// $(".dislikeuniversityblock").html(dislikedUniversityBlock);
		
				displayUniversity.forEach(universityBlock);
		
				function universityBlock(value) {
					// txt += value + "<br>";
					// console.log(value.university_id); return false;
					// console.log(userdatacheck); return false;
					if(value.university_id == uniId) {
						if (statusdoc && $("#universityId_"+uniId).length ==0 ) {

							console.log(statusdoc.status)
							if (statusdoc.status == "notsure") {

			
								// console.log(doc.id, " => ", doc.data());
			
								notsureUniversityBlock += `<div class="tab-box universitydatablock" id="universityId_${uniId}" data-uniid="${uniId}" >
									<div class="btn"><a href="#" class="university-button mb-8 hide-bodr w-button">${value.university_info}</a>
										<div class="bg-img-text">
										<div class="nub-text">97%</div>
										<div class="heaing-10">MATCH</div>
										</div>
									</div>
									<div class="university-denver"><a href="#" class="links-arch w-inline-block">
										<div class="text-block-29 capitalize">${value.department_info}</div>
										</a>
										<div class="heading-12">Denver, <span class="span">${value.state_info}</span></div>
									</div>
									<div class="soical-icon mt-15">
										<div class="soicl-icon-text"><a href="#" class="tile-rejected w-inline-block" data-status="disliked">
											<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63c9351446fa29beec75737f_ion_thumbs-down-sharp.svg" loading="lazy" alt=""></div>
										</a>
										<div class="socl-text">
											<div class="heading-12">Reject</div>
										</div>
										</div>
										<div class="soicl-icon-text">
										<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63c93514aa263025c35d8ed5_Vector%20(22).svg" loading="lazy" alt=""></div><a href="#" class="tile-liked w-inline-block" data-status="liked">
											<div class="socl-text position">
											<div>Like</div>
											</div>
										</a>
										</div>
									</div>
								</div>` ;

								if (statusdoc.status == "notsure") {
									$(".not-sure-tab").append(notsureUniversityBlock);
								}


							} else if (statusdoc.status == "liked") {

								async function fetchLikedUniversities1() {
									try {
										var stepBoxes = "";
										var stepBoxesCheckBox = "";
								
										const querySnapshot = await db.collection("UserUniverstiesLiked")
											.where("university_id", "==", uniId)
											.where("user_id", "==", userdatacheck.ID)
											.get();
								
										// console.log(querySnapshot.size + " LIKES SIZE");
								
										if (querySnapshot.size > 0) {
											var university = querySnapshot.docs[0].data();

											var sortOrder = ["About the university", "Degree programs", "Tuition & Scholarship", "Book a Virtual Tour", "Book in person Tour", "Applied"];
											var linksorder = [
													"https://www.google.com1",
													"https://www.google.com/2",
													"https://www.google.com/3",
													"https://www.google.com/4",
													"https://www.google.com/5",
													"https://www.google.com/6"
												];

											var sortedSteps = {};
											var counter = 0

											sortOrder.forEach(function(step) {

												var appliedtext = (step == "Applied") ? "<span class='applied_at'></span>" : "";

												
											// // Iterate over each universityLiked
											// for (var step in university.steps) {
												(university.steps[step] == "complete") ? stepsdone++ : stepsincomplete++;
												allstepscount++;

												console.log(step, university.steps.hasOwnProperty(step));
												if (university.steps.hasOwnProperty(step)) {
													sortedSteps[step] = university.steps[step];
													if(sortedSteps[step] == 'incomplete'){
														all_done = false;
													}

													var applied_done = (university.applied_at !="") ? "bg-green" : '';
													

													stepBoxes += `
													<div class="checkbox-text box-hover ${(sortedSteps[step] == 'complete' ? 'bg-clolor' : '')} ${applied_done}" data-url="${linksorder[counter]}">
														<div class="heading-12 chkboxlabel ${(sortedSteps[step] == 'complete' ? 'clr-white' : '')}">${step} ${appliedtext}</div>
														<label class="w-checkbox checkbox-field-5 position">
															<div class="w-checkbox-input w-checkbox-input--inputType-custom liked-checkbox bg ${(sortedSteps[step] == 'complete' ? 'w--redirected-checked' : '')}"></div>
															<input type="checkbox" id="checkbox-2" name="checkbox-2" data-universityId="${uniId}" data-name="${step}" class="checkboxStepbox"
																style="opacity:0;position:absolute;z-index:-1">
															<span class="checkbox-label-3 w-form-label" for="checkbox-2"></span>
														</label>
													</div>`;
													// console.log(step + ": " + sortedSteps[step]);

													stepBoxesCheckBox += `
													<label class="w-checkbox checkbox-field-5">
														<div class="w-checkbox-input w-checkbox-input--inputType-custom liked-checkbox  ${(sortedSteps[step] == 'complete' ? 'w--redirected-checked' : '')}"></div><input
														type="checkbox" ${(sortedSteps[step] == 'complete' ? 'checked' : '')} data-targetname="${step}" id="checkbox-2" name="checkbox-2" data-name="Checkbox 2"
														style="opacity:0;position:absolute;z-index:-1" disabled><span class="checkbox-label-3 w-form-label" 
														for="checkbox-2"></span>
													</label>
													`;
												}
												counter++;
											})

											// Place the code dependent on stepBoxes here

											setLikedUniversityBlockContent1(stepBoxes, stepBoxesCheckBox)
										}
									} catch (error) {
										console.error("Error getting liked universities: ", error);
									}
								}

								// Call the async function
								fetchLikedUniversities1();

								function setLikedUniversityBlockContent1(stepBoxesHtml, stepBoxesCheckBox){
								
									likedUniversityBlock += `
									<div class="tab-box mt-20 universitydatablock" id="universityId_${uniId}" data-uniid="${uniId}" >
									<div class="uni-block-header">
                    					<div>
										<div class="btn"><a href="#"
											class="university-button mb-8 w-button">${value.university_info}</a></div>
										<div class="university-denver">
										<div class="heading-12">Denver, <span class="span">${value.state_info}</span></div><a
											href="#" class="links-arch w-inline-block">
											<div class="text-block-29 mt-10">${value.department_info}</div>
										</a>
										</div>
										</div>
										<div class="all-done-alert"><img
											src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63793b406a668a62dea3049a_Vector%20(12).svg"
											loading="lazy" alt="">
										<div>All Done</div>
										</div>
									</div>
										<div class="form-like w-form">
										<form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get"
											class="form-checkbox" data-wf-page-id="636cd27562d86914d6afe79c"
											data-wf-element-id="c72dbb86-82a3-c9fd-098d-978348e89213" aria-label="Email Form 3">
											<div class="main-checkbox mt-15">
											${stepBoxesHtml}
												
											</div>
											<div class="checkox">
												${stepBoxesCheckBox}
											</div>
										</form>
										<div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form 3 success">
											<div>Thank you! Your submission has been received!</div>
										</div>
										<div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form 3 failure">
											<div>Oops! Something went wrong while submitting the form.</div>
										</div>
										</div>
									</div>`;

									var inmcomplete_check = parseInt($("#stepsincomplete").text());

									if (statusdoc.status == "liked") {
										$(".likeduniversityblock").append(likedUniversityBlock);
											
										$("#stepsdone").text(parseInt($("#stepsdone").text()) + stepsdone);
										$("#stepsincomplete").text(parseInt($("#stepsincomplete").text()) + stepsincomplete);
										$("#allstepscount").text(parseInt($("#allstepscount").text()) + allstepscount);
									}

									if((inmcomplete_check+stepsincomplete)  == 0) {	
										$(".d-flex.success-block").css("display", "flex");
									} else {
										$(".d-flex.success-block").css("display", "none");
									}
								}								

							} else if (statusdoc.status == "disliked") {
			
			
								dislikedUniversityBlock += `
								<div class="tab-box universitydatablock" id="universityId_${uniId}" data-uniid="${uniId}" >
								<div class="btn"><a href="#"
									class="university-button mb-8 hide-bodr w-button">${value.university_info}</a>
									<div class="bg-img-text">
									<div class="nub-text">97%</div>
									<div class="heaing-10">MATCH</div>
									</div>
								</div>
								<div class="university-denver"><a href="#"
									class="links-arch w-inline-block">
									<div class="text-block-29">${value.department_info}</div>
									</a>
									<div class="heading-12">Denver, <span class="span">${value.state_info}</span></div>
								</div>
								<div class="soical-icon mt-15">
									<div class="soicl-icon-text widht"><a href="#" data-status="notsure"
										class="w-inline-block tile-notsure">
										<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63cd2be3d805d5fe57fbe100_%F0%9F%A4%94.svg" loading="lazy"
											alt=""></div>
									</a>
									<div class="socl-text pt">
										<div class="text-block-62">Not sure</div>
									</div>
									</div>
									<div class="soicl-icon-text">
									<div class="socl-icon"><img src="https://assets-global.website-files.com/629a6c53c8ec9fdc6019d9f8/63c93514aa263025c35d8ed5_Vector%20(22).svg"
										loading="lazy" alt=""></div><a href="#" class="tile-liked w-inline-block" data-status="liked">
										<div class="socl-text position">
										<div>Like</div>
										</div>
									</a>
									</div>
								</div>
								</div>`

								if (statusdoc.status == "disliked") {
									$(".dislikeuniversityblock").append(dislikedUniversityBlock);
				
								}
							}

						}
					}
					
				}
		
			}			
			// console.log(universityBlock);

		}

	});

};


$(document).on("click",".checkbox-text", function(){
    // $(this).siblings(".w-checkbox.checkbox-field-5.position").find(".checkboxStepbox").trigger("click")

    $(this).children().find(".checkboxStepbox").trigger("click");
	// alert("test")

})


$(document).on("click", ".tile-liked, .tile-notsure, .tile-rejected", function (e) {
	e.preventDefault();
	var uniId = $(this).parents(".universitydatablock").data("uniid");
	console.log(uniId);
	var userdatacheck = localStorage.getItem("userfbdata");
	var likestatus = $(this).data("status");
	userdatacheck = JSON.parse(userdatacheck);
	var universityStatusData = { universityId: uniId, userId: userdatacheck.ID, status: likestatus };

	// console.log(universityStatusData); return false;

	var oldstatus = '';

	var universityId = uniId;
	db.collection("UnivestiesStatus").where("universityId", "==", uniId).where("userId", "==", userdatacheck.ID).get().then((querySnapshot) => {
		if (querySnapshot.size > 0) {
			const doc = querySnapshot.docs[0];

			if (doc) {
				const docId = doc.id;
				var documentdata = doc.data();
				oldstatus = documentdata.status;
				console.log(doc.id, " => ", doc.data());

				db.collection("UnivestiesStatus")
					.doc(docId)
					.update(universityStatusData)
					.then(() => {
						updateSettingData(universityId, oldstatus, likestatus);
						if(likestatus == "liked") {
							addUniversityLikeData(universityId);
						}

						console.log("University data successfully updated with ID: ", docId);
					})
					.catch((error) => {
						console.error("Error updating university status data:", error);
					});
			}
			console.log(" if somthing")

		} else {

			db.collection("UnivestiesStatus")
				.add(universityStatusData)
				.then(docRef => {
					updateSettingData(universityId, oldstatus, likestatus);

					console.log("Univesrity data successfully inserted with ID: ", docRef.id);
				})
				.catch(error => {
					console.error("Error update unvieristy status data:", error);
				});
			// console.log("somthing")
		}
	})
})

function addUniversityLikeData(universityId){

	var userdatacheck = localStorage.getItem("userfbdata");
	userdatacheck = JSON.parse(userdatacheck);

	var universityLikedata =  {
		university_id: universityId,
		user_id: userdatacheck.ID,
		steps: {
			"About the university": "incomplete",
			"Degree programs": "incomplete",
			"Tuition & Scholarship": "incomplete",
			"Book a Virtual Tour": "incomplete",
			"Book in person Tour": "incomplete",
			"Applied": "incomplete",
		}
	};

	// Reference the document by its ID and get its data
	db.collection('UserUniverstiesLiked')
    .where("university_id", "==", universityId)
    .where("user_id", "==", userdatacheck.ID)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
            // No matching document found, add a new one
            db.collection("UserUniverstiesLiked")
                .add(universityLikedata)
                .then(docRef => {
                    console.log("University Liked successfully inserted with ID: ", docRef.id);
                })
                .catch(error => {
                    console.error("Error updating Liked university status data:", error);
                });
        } else {
            // Handle the case when there are matching documents
            console.log("Document already exists for the specified conditions");
        }
    })
}

function updateSettingData(universityId, oldstatus, likestatus) {


	// Reference the document by its ID and get its data
	db.collection('settings').doc("universityCount").get()
		.then((doc) => {
			if (doc.exists) {
				// Document found, access its data
				const data = doc.data();
				// console.log(data);

				if (oldstatus == "") {

				} else {
					var counter = '';

					// Example usage
					const recordIdToUpdate = 'universityCount'; // Replace with the actual record ID
					const newStatusToUpdate = likestatus; // Replace with the actual new status
					const newoldstatus = oldstatus; // Replace with the actual new status

					updateUniversityStatus(universityId, newoldstatus, recordIdToUpdate, newStatusToUpdate);
					// console.log(recordIdToUpdate, newStatusToUpdate);

				}
				console.log('Document data:', data);
			} else {
				console.log('Document not found');
			}
		})
		.catch((error) => {
			console.error('Error getting document:', error);
		});
}

// Function to update university status based on another collection's record
async function updateUniversityStatus(universityId, oldstatus, recordId, newStatus) {
	try {
		// Get the current status of the university
		const universityStatusDoc = await db.collection('settings').doc(recordId).get();
		const currentStatus = universityStatusDoc.data();
		// console.log(currentStatus);
		// Update the counter in universityStatus based on the new status

		switch (newStatus) {
			case 'liked':
				currentStatus.liked = (currentStatus.liked || 0) + 1;
				if (oldstatus === 'disliked') {
					currentStatus.disliked = Math.max((currentStatus.disliked || 0) - 1, 0);
				}
				if (oldstatus === 'notsure') {
					currentStatus.notsure = Math.max((currentStatus.notsure || 0) - 1, 0);
				}
				break;
			case 'disliked':
				currentStatus.disliked = (currentStatus.disliked || 0) + 1;
				if (oldstatus === 'liked') {
					currentStatus.liked = Math.max((currentStatus.liked || 0) - 1, 0);
				}
				if (oldstatus === 'notsure') {
					currentStatus.notsure = Math.max((currentStatus.notsure || 0) - 1, 0);
				}
				break;
			case 'notsure':
				currentStatus.notsure = (currentStatus.notsure || 0) + 1;
				if (oldstatus === 'liked') {
					currentStatus.liked = Math.max((currentStatus.liked || 0) - 1, 0);
				}
				if (oldstatus === 'disliked') {
					currentStatus.disliked = Math.max((currentStatus.disliked || 0) - 1, 0);
				}
				break;
			default:
				throw new Error('Invalid status');
		}

		var likedTotal = currentStatus.liked;
		var rejectedTotal = currentStatus.disliked;
		var notSureTotal = currentStatus.notsure;
		console.log(oldstatus, newStatus, currentStatus); //return false;

		$("#likedTotal").text(likedTotal);
		$("#rejectedTotal").text(rejectedTotal);
		$("#notSureTotal").text(notSureTotal);



		// Update the universityStatus collection
		await db.collection('settings').doc(recordId).update(currentStatus);

		tileUpdateUnivesities(universityId)

		// $(".tiles").trigger("click", function () {
		// 	console.log("triggered auto")
		// })


		console.log('University status updated successfully');
	} catch (error) {
		console.error('Error updating university status:', error);
	}
}

$(document).on("change", ".checkboxStepbox", function(){

	var $checkbox = $(this); // Store reference to the checkbox
    setTimeout(function(){
        // var isChecked = $checkbox.prop("checked");
        var isChecked = $checkbox.siblings(".w-checkbox-input").hasClass("w--redirected-checked");
        
		var userdatacheck = localStorage.getItem("userfbdata");
		userdatacheck = JSON.parse(userdatacheck);

		var universityId = $checkbox.data('universityid');
		var targetname = $checkbox.data('name');
		// console.log(targetname)

		var completecheck = "incomplete";

		var formattedDateTime = '';
		var dataurl = "";
		// console.log(isChecked);
		if (isChecked) {
			$checkbox.parents(".checkbox-text").addClass("bg-clolor");
			dataurl = $checkbox.parents(".checkbox-text").data("url")
			$checkbox.parents(".checkbox-text").find(".heading-12").addClass("clr-white");
			$checkbox.parents(".form-checkbox").find('[data-targetname="' + targetname + '"]').siblings('.w-checkbox-input').addClass('w--redirected-checked');
			completecheck = "complete";
			var applied_check = $checkbox.parents(".form-checkbox").find(".checkbox-text.bg-clolor").length;

			if(applied_check==6) {
				var currentDateTime = new Date();
				// Format the date and time
				formattedDateTime = currentDateTime.getFullYear() + '-' + addZeroPrefix(currentDateTime.getMonth() + 1) + '-' + addZeroPrefix(currentDateTime.getDate()) + ' ' + addZeroPrefix(currentDateTime.getHours()) + ':' + addZeroPrefix(currentDateTime.getMinutes()) + ':' + addZeroPrefix(currentDateTime.getSeconds());
				// Function to add zero prefix to single-digit numbers
				function addZeroPrefix(number) {
					return (number < 10 ? '0' : '') + number;
				}
				$checkbox.parents(".form-checkbox").find(".checkbox-text").addClass("bg-green");
				var splitdate = formattedDateTime.split(" ");
				$checkbox.parents(".form-checkbox").find(".checkbox-text").find(".applied_at").text(splitdate[0]);
				$checkbox.parents(".universitydatablock").find(".all-done-alert").css("display","flex");

			}

			// alert("Checkbox is checked");
		} else {
			$checkbox.parents(".checkbox-text").removeClass("bg-clolor");
			$checkbox.parents(".checkbox-text").find(".heading-12").removeClass("clr-white");
			$checkbox.parents(".form-checkbox").find('[data-targetname="' + targetname + '"]').siblings('.w-checkbox-input').removeClass('w--redirected-checked');
			// alert("Checkbox is unchecked");
			$checkbox.parents(".form-checkbox").find(".checkbox-text").removeClass("bg-green");
			$checkbox.parents(".form-checkbox").find(".checkbox-text").find(".applied_at").text("");
			$checkbox.parents(".universitydatablock").find(".all-done-alert").css("display","none");
			formattedDateTime = "";
		}

		// console.log(universityId,userdatacheck.ID); return false;
		
		db.collection("UserUniverstiesLiked")
		.where("university_id", "==", universityId)
		.where("user_id", "==", userdatacheck.ID)
		.get()
		.then((querySnapshot) => {
			if (querySnapshot.size > 0) {
				const doc = querySnapshot.docs[0];

				if (doc) {
					const docId = doc.id;
					var documentdata = doc.data();
					// console.log(doc.id, " => ", doc.data());
					// Update the document data
					documentdata.steps[targetname] = completecheck;
					documentdata.applied_at = formattedDateTime;
					console.log(documentdata);
					// Move the update operation inside this block
					db.collection("UserUniverstiesLiked")
					.doc(docId)
					.update(documentdata)
					.then(() => {
						var incrementchange = (completecheck == "complete") ? 1 : 0;
						if(incrementchange == 1){
							$("#stepsdone").text(parseInt($("#stepsdone").text()) + 1);
							$("#stepsincomplete").text(parseInt($("#stepsincomplete").text()) - 1);
						}else {
							$("#stepsdone").text(parseInt($("#stepsdone").text()) - 1);
							$("#stepsincomplete").text(parseInt($("#stepsincomplete").text()) + 1);
						}
						var incomplete_check = parseInt($("#stepsincomplete").text());
						if(incomplete_check == 0){
							$("#all-done-block").css("display","flex");
						} else {
							$("#all-done-block").hide();
						}
						console.log("University data successfully updated with ID: ", docId);

						if(dataurl !=""){
							window.open(dataurl,'_blank');
						}
					})
					.catch((error) => {
						console.error("Error updating university Liked data:", error);
					});
				}
			}
		})
		.catch((error) => {
			console.error("Error getting university Liked data:", error);
		});

	}, 500)


})

$(".profile-btn").on('click', function () {
	$(".continue-section").addClass("hide");
	$("#registration_splash_screen").removeClass("hide");
})

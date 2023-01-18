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

  //   $("#Type-name-of-University").autocomplete({
  //     source: function (request, response) {
  //       console.log(request.term);
  //       var array_univeristy = [];

  //       var struniveristy = request.term;
  //       var universitykeywordsval = struniveristy.split(" ");

  //       db.collection("University")
  //         .where("schoolkeywords", "array-contains-any", universitykeywordsval)
  //         .limit(15)
  //         .get()
  //         .then((querySnapshot) => {
  //           console.log(querySnapshot.size);
  //           if (querySnapshot.size > 0) {
  //             querySnapshot.forEach((doc) => {
  //               statedata = doc.data();
  //               // console.log(doc.id, " => ", doc.data());
  //               var school_item = { id: doc.id, value: doc.data().schoolname };

  //               array_schools.push(school_item);
  //             });
  //           } else {
  //             school_item = { value: "", label: "Not Found" };
  //             array_schools.push(school_item);
  //           }
  //           console.log(array_schools);
  //           response(array_schools);
  //         })
  //         .catch((error) => {
  //           // The document probably doesn't exist.
  //           console.error("No results found: ", error);
  //         });
  //     },
  //     minLength: 2,
  //     select: function (event, ui) {
  //       if (ui.item.value == "Not Found") {
  //         $(this).removeAttr("data-id");
  //       } else {
  //         $(this).attr("data-id", ui.item.id);
  //         $("#selected-school-name").html(ui.item.value);
  //         console.log(ui.item);
  //       }
  //     },
  //     error: function (data) {
  //       $('.input_addschool_field"').removeClass("ui-autocomplete-loading");
  //     },
  //   });
});

$("#submit_university_program_button").on("click", function (e) {
  let states_array = [];
  e.preventDefault();
  console.log("hello there");

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        universitydata = doc.data();
        console.log(universitydata + "universitydata");
      });
    });
});

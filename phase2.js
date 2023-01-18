var db = firebase.firestore();

$("#submit_university_program_button").on("click", function (e) {
  let states_array = [];
  e.preventDefault();
  console.log("hello there");

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        statesdata = doc.data();
        states_array = statesdata.name;
        // console.log(userfbdata.name + "data");
        for (var counter = 0; counter < states_array.length; counter++) {
          console.log(states_array[counter] + "coutner");
        }

        // $("#w-dropdown-list-0").append(
        //   "<style>.dropeditem" +
        //     classcounter +
        //     ':before{ content: "' +
        //     (classcounter + 1) +
        //     '";}</style>'
        // );
      });
    });
});

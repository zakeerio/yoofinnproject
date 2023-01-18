var db = firebase.firestore();

$("#submit_university_program_button").on("click", function (e) {
  e.preventDefault();
  console.log("hello there");

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        statesdata = doc.data();

        // console.log(userfbdata.name + "data");
        for (var counter = 0; counter < statesdata.length; counter++) {
          console.log(statesdata[counter] + "coutner");
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

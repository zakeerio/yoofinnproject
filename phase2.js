var db = firebase.firestore();

$("#submit_university_program_button").on("click", function (e) {
  e.preventDefault();
  console.log("hello there");

  db.collection("States")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userfbdata = doc.data();

        console.log(userfbdata + "data");
      });
    });
});

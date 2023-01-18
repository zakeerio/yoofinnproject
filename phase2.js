var db = firebase.firestore();

$(init);

function init() {
  $(".droppable-area1, .droppable-area2")
    .sortable({
      connectWith: ".connected-sortable",
      stack: ".connected-sortable",
      revert: true,
      stop: function () {
        console.log("Dropped");
        addNumbersDynamicallyUniCon();
      },
      update: function () {
        UpdateNumbersDynamicallyUniCon();
      },
    })
    .disableSelection();

  var classeslist = [];
  var usedclasses = [];

  function addNumbersDynamicallyUniCon() {
    console.log("Add box");
    var universityconcerns = [];

    // $(".droppable-area1.connected-sortable .ui-sortable-handle").removeClass('dropped')
    var classcounter = 0;
    $(".droppable-area1.connected-sortable .ui-sortable-handle").each(
      function () {
        universityconcerns.push($(this).find(".heading-text").text());

        if ($.inArray("dropeditem" + classcounter, classeslist) == -1) {
          classeslist.push("dropeditem" + classcounter);
          $("head").append(
            "<style>.dropeditem" +
              classcounter +
              ':before{ content: "' +
              (classcounter + 1) +
              '";}</style>'
          );
        }

        for (
          var i = 0,
            l = $(
              ".droppable-area1.connected-sortable .ui-sortable-handle"
            ).length;
          i < l;
          i++
        ) {
          var obj = "dropeditem" + i;
          if ($(this).hasClass(obj)) {
            $(this).removeClass(obj);
          }
        }

        $(this).addClass("dropped");
        // $(this).addClass(classes[classcounter]);
        $(this).addClass("dropeditem" + classcounter);
        classcounter++;
      }
    );
    $("#univrsityconcerns").val(universityconcerns.join(","));

    console.log(classeslist);
  }

  function UpdateNumbersDynamicallyUniCon() {
    console.log("update box");
    var universityconcerns = [];

    for (
      var i = 0,
        l = $(".droppable-area1.connected-sortable .ui-sortable-handle").length;
      i < l;
      i++
    ) {
      var obj = "dropeditem" + i;
      if ($(this).hasClass(obj)) {
        $(this).removeClass(obj);
      }
    }

    var classcounter = 0;
    $(".droppable-area1.connected-sortable .ui-sortable-handle").each(
      function () {
        universityconcerns.push($(this).find(".heading-text").text());

        $(this).addClass("dropped");
        if (!$(this).hasClass("dropeditem" + classcounter)) {
          $(this).addClass("dropeditem" + classcounter);
        }

        classcounter++;
      }
    );
    $("#univrsityconcerns").val(universityconcerns.join(","));
  }

  $(".droppable-area-hope, .droppable-area-hope2")
    .sortable({
      connectWith: ".connected-sortable",
      stack: ".connected-sortable",
      revert: true,
      stop: function () {
        console.log("Dropped");
        addNumbersDynamicallyExcites();
      },
      update: function () {
        UpdateNumbersDynamicallyExcites();
      },
    })
    .disableSelection();

  function addNumbersDynamicallyExcites() {
    console.log("Add box");

    // $(".droppable-area1.connected-sortable .ui-sortable-handle").removeClass('dropped')
    var classcounter = 0;
    var univrsityexcites = [];
    $(".droppable-area-hope.connected-sortable .ui-sortable-handle").each(
      function () {
        univrsityexcites.push($(this).find(".heading-text").text());

        if ($.inArray("dropeditem" + classcounter, classeslist) == -1) {
          classeslist.push("dropeditem" + classcounter);
          $("head").append(
            "<style>.dropeditem" +
              classcounter +
              ':before{ content: "' +
              (classcounter + 1) +
              '";}</style>'
          );
        }

        for (
          var i = 0,
            l = $(
              ".droppable-area-hope.connected-sortable .ui-sortable-handle"
            ).length;
          i < l;
          i++
        ) {
          var obj = "dropeditem" + i;
          if ($(this).hasClass(obj)) {
            $(this).removeClass(obj);
          }
        }

        $(this).addClass("dropped");
        $(this).addClass("dropeditem" + classcounter);

        classcounter++;
      }
    );

    $("#univrsityexcites").val(univrsityexcites.join(","));
  }

  function UpdateNumbersDynamicallyExcites() {
    var excitesval = [];

    console.log("update box");
    for (var i = 0, l = classes.length; i < l; i++) {
      var obj = classes[i];
      if (
        $(
          ".droppable-area-hope.connected-sortable .ui-sortable-handle"
        ).hasClass(obj)
      ) {
        $(
          ".droppable-area-hope.connected-sortable .ui-sortable-handle"
        ).removeClass(obj);
      }
    }

    var classcounter = 0;
    $(".droppable-area-hope.connected-sortable .ui-sortable-handle").each(
      function () {
        excitesval.push($(this).find(".heading-text").text());

        $(this).addClass("dropped");
        $(this).addClass(classes[classcounter]);
        classcounter++;
      }
    );
    $("#universityconcerns").val(excitesval.join(","));
  }

  $(document).ready(function () {
    loadconcerns();
    loadhopes();
  });

  function loadconcerns() {
    $(".droppable-area2.connected-sortable1").html("");

    db.collection("Concerns")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userfbdata = doc.data();

          console.log(userfbdata);

          var sample_university_concern = $("#sample-university-concern");
          $(sample_university_concern)
            .find(".heading-text")
            .text(userfbdata.value);
          $(".droppable-area2.connected-sortable1").append(
            sample_university_concern.html()
          );
        });

        $(".droppable-area1, .droppable-area2")
          .draggable({
            cancel: "button", // these elements won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move",
          })
          .disableSelection();
      });
  }

  function loadhopes() {
    $(".droppable-area-hope2.connected-sortable1").html("");

    db.collection("Hopes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userfbdata = doc.data();

          // console.log(userfbdata);

          var sample_university_hope = $("#sample-university-hope");
          $(sample_university_hope)
            .find(".heading-text")
            .text(userfbdata.value);
          $(".droppable-area-hope2.connected-sortable1").append(
            sample_university_hope.html()
          );
        });
      });

    $(".droppable-area-hope, .droppable-area-hope2")
      .draggable({
        cancel: "button", // these elements won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        helper: "clone",
        cursor: "move",
      })
      .disableSelection();
  }

  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      var displayname = "John";
      if (displayName != null) {
        displayname = displayName;
      }

      $("#user_name").text(displayname);

      let school_id = "";

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

            if (userfbdata.SchoolId != "") {
              var school_id =
                userfbdata.SchoolId != "" ? userfbdata.SchoolId : false;

              if (school_id != false) {
                console.log(school_id);

                db.collection("Schools")
                  .doc(school_id)
                  .get()
                  // db.collection("Schools").where("id", "==", school_id).get()
                  .then((snapshot) => {
                    //DocSnapshot
                    if (snapshot) {
                      let dataval = snapshot.data();
                      $("#selected-school-name").html(dataval.schoolname);
                      console.log(dataval);
                    } else {
                      // snapshot.data() will be undefined in this case
                      console.log("No such document!");
                    }
                  });
              }
            }
          }
        });

      localStorage.setItem("userdata", JSON.stringify(user));

      $(".registration").addClass("hide");
      setTimeout(function () {
        $("#reg-step2").removeClass("hide");
      }, 2500);
    } else {
      localStorage.removeItem("userdata");
      localStorage.removeItem("userfbdata");

      setTimeout(function () {
        $("#reg-step1").removeClass("hide");
      }, 2500);
      // User is signed out.
      console.log("user logged out!");
    }
  });
}

$("#submit_university_program_button").on("click", function (e) {
  e.preventDefault();
  console.log("hello there");
  // var schoolid = $(".input_addschool_field").attr("data-id");
  // var start_date = $("#start_date").val();
  // var sibling_attend = $("input[name='sibling_attend']").val();

  // console.log(schoolid);
  // console.log(start_date);
  // console.log(sibling_attend);

  // var data = {
  //     StartDate: start_date,
  //     SiblingAttend: sibling_attend,
  // };

  // if(schoolid){
  //     data["SchoolId"] = schoolid;
  //     data["SchoolManuallyEntered"] = "N";
  // }

  // var userdata = localStorage.getItem('userdata');
  // userdata = JSON.parse(userdata);
  // db.collection("Users").doc(userdata.uid).update(data).then(() => {
  //     console.log("user step3 data successfully updated!");

  //     $(".registration").addClass("hide");
  //     $("#reg-step3").removeClass("hide");

  // });
});

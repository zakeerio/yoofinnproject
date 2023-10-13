// Initialize Firebase
var db = firebase.firestore();

$(document).ready(function() {
    init();
});

function init(){
    // remove localStorage
    localStorage.removeItem('deposit');
    localStorage.removeItem('gender');
    localStorage.removeItem('duration');
    localStorage.removeItem('age');
    // Event listeners
    $('#dateofbirth').on('change', calculateAge);
    $('input[name=gender]').on('change', function(){
        var gender = $(this).val();
        localStorage.setItem('gender', gender);
    });
    $('#deposit').on('change', function(){
        var deposit = $(this).val();
        localStorage.setItem('deposit', deposit);
    });
    $('#duration').on('change', function(){
        var duration = $(this).val();
        localStorage.setItem('duration', duration);
    });

    $("#plan-monthly").on('click', function(e){
        e.preventDefault();
        $("#plan-yearly").removeClass("plan-active");
        $("#plan-monthly").addClass("plan-active");
        var chargesval = $("#totalcharges").attr("plan-monthly");
        console.log(chargesval);
        $("#Charges").val(chargesval);
        $("#totalcharges").text("$".chargesval);
        $("#Plan").val("Monthly Plan");
    })

    $("#plan-yearly").on('click', function(e){
        e.preventDefault();
        $("#plan-monthly").removeClass("plan-active");
        $("#plan-yearly").addClass("plan-active");
        var chargesval = $("#totalcharges").attr("plan-yearly");
        console.log(chargesval);
        $("#Charges").val(chargesval);
        $("#totalcharges").text("$".chargesval);
        $("#Plan").val("Yearly Plan");
    })
    // Event listener for paycalcbutton
    $("#paycalcbutton").on('click', function(e) {
        e.preventDefault();

        // Retrieve data from localStorage
        const deposit = parseInt(localStorage.getItem('deposit'));
        const gender = localStorage.getItem('gender');
        const duration = parseInt(localStorage.getItem('duration'));
        const age = parseInt(localStorage.getItem('age'));

        // Query Firestore
        const quotemycarcoverageCollection = db.collection('quotemycarcoverage');

        quotemycarcoverageCollection
            .where('deposit', '==', deposit)
            .where('age', '==', age)
            .where('years', '==', duration)
            .where('gender', '==', gender)
            .get()
            .then(querySnapshot => {
                console.log('Matching documents count:', querySnapshot.size);

                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(doc => {
                        const dbdata = doc.data();
                        console.log('Matching user:', dbdata);
                        console.log('Charges:', dbdata.charges);
                        // Perform further actions with the matching user data

                        $("#Charges").val(dbdata.charges);
                        $("#totalcharges").text("$"+dbdata.charges).attr("plan-monthly", (dbdata.charges/12).toFixed(2)).attr("plan-yearly", dbdata.charges);
                        $('.w-slider-arrow-right').trigger('click');

                    });
                } else {
                    console.log("No matching documents found.");
                }
            })
            .catch(error => {
                console.error('Error getting matching users:', error);
            });
    });

    const countriesCollection = db.collection('countries');
    const selectElement = document.getElementById('country');

    // Function to populate the <select> element with country options
    const populateCountryOptions = (countries) => {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            selectElement.appendChild(option);
        });
    };

    // Retrieve all records from the 'countries' collection
    countriesCollection.orderBy('name').get()
        .then(querySnapshot => {
            const countries = [];
            querySnapshot.forEach(doc => {
                countries.push(doc.data());
            });
            populateCountryOptions(countries);
        })
        .catch(error => {
            console.error('Error getting countries:', error);
        });
}

function calculateAge() {
    const dateOfBirthInput = $('#dateofbirth').val();
    const dateOfBirth = new Date(dateOfBirthInput);
  
    if (isNaN(dateOfBirth)) {
      alert('Please select a valid date of birth.');
      return;
    }
  
    // Calculate the current date
    const currentDate = new Date();
  
    // Calculate the age
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  
    // Adjust age if birthday has not occurred this year yet
    if (currentDate < new Date(currentDate.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate())) {
      age--;
    }

    $("#info_dateofbirth").val(dateOfBirthInput);
    localStorage.setItem('age', age);
    localStorage.setItem('dateofbirth', dateOfBirthInput);
}

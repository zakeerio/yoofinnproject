// Initialize Firebase
var db = firebase.firestore();
$(document).ready(function() {
    init();
});

function init(){
    // remove localStorage
    localStorage.removeItem('gender');
    localStorage.removeItem('age');
    localStorage.removeItem('dateofbirth');
    // Event listeners
    $('#dateofbirth').on('change', calculateAge);
    $('input[name=gender]').on('change', function(){
        var gender = $(this).val();
        localStorage.setItem('gender', gender);
        $("#text-gender").text(gender);
    });


    $(document).on("click", "#SubmitBtn", function(){
    // Assuming you have a JavaScript object with the provided fields
    var formData = {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        emailAddress: localStorage.getItem("emailAddress"),
        phoneNumber: localStorage.getItem("phoneNumber"),
        gender: localStorage.getItem("gender"),
        dateOfBirth: localStorage.getItem("dateofbirth"),
        country: localStorage.getItem("country"),
        streetAddress: localStorage.getItem("streetAddress"),
        state: localStorage.getItem("state"),
        zip: localStorage.getItem("zip")
    };
    
    // Add the document to the "formData" collection
        db.collection("quotemycarcoverageData").add(formData)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    })
    $(document).on('click', "#plan-monthly", function(e){
        e.preventDefault();
        $("#plan-yearly").removeClass("active-plan");
        $("#plan-monthly").addClass("active-plan");
        var chargesval = $("#totalcharges").attr("plan-monthly");
        $("#Charges").val(chargesval);
        $("#totalcharges").text(chargesval);
        $("#Plan").val("Monthly Plan");
    })

    $(document).on('click', "#plan-yearly", function(e){
        e.preventDefault();
        $("#plan-monthly").removeClass("active-plan");
        $("#plan-yearly").addClass("active-plan");
        var chargesval = $("#totalcharges").attr("plan-yearly");
        $("#Charges").val(chargesval);
        $("#totalcharges").text(chargesval);
        $("#Plan").val("Yearly Plan");
    })
    // Event listener for paycalcbutton
    $("#paycalcbutton").on('click', function(e) {
        e.preventDefault();
        var checktest = false;
        $(this).parents('.w-slide').find('.required').each(function(){
            var currentval = $(this).val().trim();
            if(currentval ==""){ 
                $(this).addClass("error"); 
                checktest = true;
            } else { 
                $(this).removeClass("error"); 
            }
        });
        if(checktest) { return false; }
        // Retrieve data from localStorage
        const deposit = parseInt($('#deposit').val());
        const duration = parseInt($('#duration').val());
        if (deposit !="" && duration !="") {
            const gender = localStorage.getItem('gender');
            const age = parseInt(localStorage.getItem('age'));
            // Query Firestore
            const quotemycarcoverageCollection = db.collection('quotemycarcoverage');
            quotemycarcoverageCollection
            .where('deposit', '==', deposit)
            .where('age', '==', age)
            .where('years', '==', duration)
            .where('gender', '==', gender)
            .get().then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(doc => {
                        const dbdata = doc.data();
                        console.log('Matching user:', dbdata);
                        $("#Charges").val("$"+dbdata.charges).trigger("change");
                        $("#totalcharges").text("$"+dbdata.charges).attr("plan-monthly", "$"+(dbdata.charges/12).toFixed(2)).attr("plan-yearly", "$"+dbdata.charges);
                        $('.w-slider-arrow-right').trigger('click');
                    });
                } else {
                    alert("Something went wrong.");
                }
            })
            .catch(error => {
                console.error('Error getting matching users:', error);
            });
        }
    });

    const countriesCollection = db.collection('countries');
    const selectElement = document.getElementById('country');
    $("#country").on("change", function(){
        $("#text-country").text($(this).val());
        localStorage.setItem("country", $(this).val());
        
    })
    $("#First-Name").on("change", function(){
        $("#text-firstname").text($(this).val());
        localStorage.setItem("firstName", $(this).val());
    })
    $("#Last-Name").on("change", function(){
        $("#text-lastname").text($(this).val());
        localStorage.setItem("lastName", $(this).val());

    })
    $("#Email-Address").on("change", function(){
        $("#text-emailaddress").text($(this).val());
        localStorage.setItem("emailAddress", $(this).val());
    })
    $("#Phone-Number").on("change", function(){
        $("#text-phonenumber").text($(this).val());
        localStorage.setItem("phoneNumber", $(this).val());

    })

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
    
    if ($('#Street-Address-City').length > 0) {
        // var options = { types: ['(cities)']};
        var autocomplete = new google.maps.places.Autocomplete($("#Street-Address-City")[0]);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var result = autocomplete.getPlace();
            // console.log(result.address_components[0]);
            var addressComponents = result.address_components;
            var address_street_line1 = result.formatted_address;
            // var city = getAddressComponent(addressComponents, 'locality');
            var state = getAddressComponent(addressComponents, 'administrative_area_level_1');
            var country = getAddressComponent(addressComponents, 'country');
            var postalCode = getAddressComponent(addressComponents, 'postal_code');
            $('#Street-Address-City').val(address_street_line1).trigger("change");
            $('#text-address').text(address_street_line1);
            $('#address_zipcode').val(postalCode).trigger("change");
            $('#text-zip').text(postalCode);
            // $('#address_city').val(city);
            $('#State').val(state).trigger("change");
            $('#text-state').text(state);
            $('#address_country').val(country).trigger("change");
            // Assuming you have a JavaScript object with the provided fields

            localStorage.setItem("streetAddress", address_street_line1);
            localStorage.setItem("state", state);
            localStorage.setItem("zip", postalCode);
        });
    }

    function getAddressComponent(components, type) {
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            var componentTypes = component.types;
            if (componentTypes.indexOf(type) !== -1) {
                return component.long_name;
            }
        }
        return '';
    }
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

    if (age < 21) {
        alert('You must be at least 21 years old.');
        return;
    }

    $("#info_dateofbirth").val(dateOfBirthInput);
    $("#text-dateofbirth").text(dateOfBirthInput);
    localStorage.setItem('age', age);
    localStorage.setItem('dateofbirth', dateOfBirthInput);
}

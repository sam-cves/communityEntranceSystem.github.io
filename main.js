// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCYFBsWbxDXeS65e6AZMWCDdHzAaZy5zVU",
  authDomain: "community-gated-system.firebaseapp.com",
  databaseURL: "https://community-gated-system-default-rtdb.firebaseio.com",
  projectId: "community-gated-system",
  storageBucket: "community-gated-system.appspot.com",
  messagingSenderId: "427254845808",
  appId: "1:427254845808:web:f702ef0cbc24c27ad7bfb5",
  measurementId: "G-W16BSD560P"
});


//const db = firebaseConfig.firestore();
//const auth = firebaseApp.auth();



// Sign up function
function signUpUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // const buildingname = document.getElementById("buildingname").value;

  console.log(email, password)
  // firebase code
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {

      // Signed up
      Add_doc(); 
      alert("You are Signed Up Sucessfully");
      //location.href = "signIn.html";
      console.log(result)
      // ...
    })
    .catch((error) => {
      alert(error.code,"\n",error.message)
      console.log(error.code);
      console.log(error.message)
      // ..
    });
}

// const cloudDB = firebaseConfig.firestore();

document.getElementById('signUp').addEventListener('click', addTable)



function addTable() {
  FnameT = document.getElementById('fname').value;
  LnameT = document.getElementById('lname').value;
  EmailT = document.getElementById('email').value;
  UserTypeT = document.getElementById('otherField').value;
  AptNoT = document.getElementById('inputAptNo').value;
  BuildingNoT = document.getElementById('inputBuildingName').value;
  StreetT = document.getElementById('autocomplete').value;
  CityT = document.getElementById('inputCity').value;
  StateT = document.getElementById('inputState').value;
  ZipT = document.getElementById('inputZip').value;
  CountryT = document.getElementById('inputCountry').value;
  pwd = document.getElementById('password').value;
  cpwd = document.getElementById('confirm_password').value;


  if (FnameT == '' || LnameT == '' || EmailT == '' || UserTypeT == '') {
    alert("All fields are required");
  } else if(pwd != cpwd )
  {
    alert("Password and Confirm Password do not match!!");
  }
  else {
    // Add to the DB
    // var FnameT, LnameT, EmailT, UserTypeT;
    signUpUser();
    // Add_doc();
  };
}

var FnameT, LnameT, EmailT, UserTypeT;
const cloudDB = firebaseConfig.firestore();
function Add_doc() {

  cloudDB.collection("User1").add(
    {
      FirstName: FnameT,
      LastName: LnameT,
      Email: EmailT,
      UserType: UserTypeT,
      AptNo: AptNoT,
      BuildingNo: BuildingNoT,
      Street: StreetT,
      City: CityT,
      State: StateT,
      Zip: ZipT,
      Country: CountryT
    })
    .then(function (docRef) {
      console.log("User Added with ID", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding the user".error);
    });
}


// Sign In function

// document.getElementById('signIn').addEventListener('click', signInUser)

// function signInUser() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   // firebase code
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((result) => {
//       // document.write("You are Signed In")
//       location.href = "ownerHomePage.html";
//       console.log(result)
//     })
//     .catch((error) => {
//       console.log(error.code);
//       console.log(error.message)
//     });

// }



var placeSearch, autocomplete;

// List all address components (corresponds to form field IDs and Google address object)
var componentForm = {
  autocomplete: ['street_number', 'route'],
  inputCity: 'locality',
  inputState: 'administrative_area_level_1',
  inputZip: 'postal_code',
  inputCounty: 'administrative_area_level_2',
  inputCountry: 'country'
};

// Create autocomplete object based on the autocomplete ("street") field
// Location type restricted to geocode
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    { type: ['geocode'] });

  // Call fillInAddress when user selects an address from dropdown
  autocomplete.addListener('place_changed', fillInAddress);
}

// Fill fields with values from Google Maps autocomplete object
function fillInAddress() {

  // Get place data from autocomplete object
  var place = autocomplete.getPlace();
  console.log(place);

  // Enable each field, then fill them with the corresponding value from the place object
  for (var component in componentForm) {
    document.getElementById(component).disabled = false;
    document.getElementById(component).value = search(componentForm[component], place.address_components);
  }

  // Original Google Implementation - do not use
  // Get each component of the address from the place
  // object and fill the corresponding field
  //   for (var i = 0; i < place.address_components.length; i++) {

  //     var addressType = place.address_components[i].types[0];

  //     if (componentForm[addressType]) {
  //       var val = place.address_components[i][componentForm[addressType]];
  //       document.getElementById(addressType).value = val;
  //     }
  //   }

  // Fill the autocomplete field with values from the place object
  // If a street number is not found, set the field to route only.
  if (search("street_number", place.address_components) != "") {
    document.getElementById("autocomplete").value = search("street_number", place.address_components) + " ";
  }
  document.getElementById("autocomplete").value += search("route", place.address_components);

  // Search the passed object for a specified address component/type and return the short_name value of the matched component/type
  // If requested type does not exist in the placeObject, return an empty string
  function search(type, placeObject) {
    for (var i = 0; i < placeObject.length; i++) {
      if (placeObject[i].types[0] === type) {
        return placeObject[i].short_name;
      } else if (i === placeObject.length - 1) {
        return "";
      }
    }
  }
}









//funcao fazewr login ----------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("btnlogar").onclick = function btnlogar() {
	var email = document.getElementById("INPUTusuario").value;
	var password = document.getElementById("INPUTusuariosenha").value;
	// ..
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage);
		alert("deu merda! " + errorMessage);
		// ...
	});
}




//funcao logoff ----------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("btnlogoff").onclick = function btnlogoff() {
	firebase.auth().signOut();
}




// //funcao que calula a soma ---------------------------------------------------------------------------------------------------------------------------
// document.getElementById("btn-calcular").onclick = function () {
// 	var valorA = document.getElementById("valor-a").value;
// 	var valorB = document.getElementById("valor-b").value;
// 	alert(parseInt(valorA) + parseInt(valorB));
// }





// //funcao  ----------------------------------------------------------------------------------------------------------------------------------------
// document.getElementById("btn-vaiii").onclick = function vaiii() {
// 	var database = firebase.database();
// 	var ref = database.ref('score');
// 	var data = { name: 'pear', count: 7 };
// 	ref.push(data);
// 	 	console.log('------------dados enviados--------------------');


// 	// var fruit = database.ref('fruit');
// 	// //fruit.push(data);
// 	// database.ref('fruit').push();
// 	// database.ref('fruit').push(data).catch(function (error) {
// 	// 	console.log('------------erro--------------------');
// 	// 	console.log(error);
// 	// 	console.log('-------------err-------------------');
// 	// 	// ...
// 	// });



// 	// fruit.push(data, finished);
// 	// function finished(error) {
// 	// 	if (error) {
// 	// 		console.log('ooops');
// 	// 		console.log(error);
// 	// 	} else {
// 	// 		console.log('data saved!');
// 	// 	}
// 	// }

// 	console.log('--------------------------------');
// }















// //funcao  ----------------------------------------------------------------------------------------------------------------------------------------
// document.getElementById("btn-teste").onclick = function teste() {
// 	var para = document.createElement("P");
// 	var t = document.createTextNode("teste de escrita.");
// 	para.appendChild(t);
// 	document.getElementById("bigOne").appendChild(para);

// }










// //funcao  ----------------------------------------------------------------------------------------------------------------------------------------
// document.getElementById("btn-getFromDatabase").onclick = function getFromDatabase() {

// 	var config = {
// 		apiKey: "AIzaSyKKKKKKKKKKKKKHPhZB89tKqjkEQVTmKys",
// 		authDomain: "meusitelm-cbb2f.firebaseapp.com",
// 		databaseURL: "https://meusitelm-cbb2f.firebaseio.com",
// 		projectId: "meusitelm-cbb2f",
// 		storageBucket: "",
// 		messagingSenderId: "439399064627"
// 	};
// 	firebase.initializeApp(config);
// 	console.log(firebase);
// 	console.log('--------------------------------');


// 	var email = "leodecm3@gmail.com.br";
// 	var password = "DFwoiSFuenw2132_-2234";
//                  DFwoiSFuenw2132_-2234

// 	// //para criar um login
// 	// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
// 	// 	// Handle Errors here.
// 	// 	var errorCode = error.code;
// 	// 	var errorMessage = error.message;
// 	// 	console.log(errorMessage);
// 	// 	// ...
// 	// });

// 	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
// 		// Handle Errors here.
// 		var errorCode = error.code;
// 		var errorMessage = error.message;
// 		console.log(errorMessage);
// 		// ...
// 	  });

// 	var database = firebase.database();
// 	var ref = database.ref('score');
// 	var data = { name: 'pear', count: 7 };
// 	ref.push(data);


// 	// gettingthe text value from the database
// 	// var bigOne = document.getElementById('bigOne');
// 	// var dbRef = firebase.database().ref().child('text');
// 	// dbRef.on('value', snap => bigOne.innerText = snap.val());
// }












// //lixo era para verificar usuario  ----------------------------------------------------------------------------------------------------------------------------------------
// //document.getElementById("btn-authverify").onclick = function authverify() {
// 	// firebase.auth().onAuthStateChanged(function (user) {
// 	// 	if (user) {
// 	// 		// User is signed in.
// 	// 		var isAnonymous = user.isAnonymous;
// 	// 		var uid = user.uid;
// 	// 		console.log('ta logado ' + user.uid);
// 	// 		// ...
// 	// 	} else {
// 	// 		// User is signed out.
// 	// 		// ...
// 	// 		console.log('deu merda');
// 	// 	}
// 	// 	// ...
// 	// });

// 	// console.log(firebase.auth().onAuthState);
// 	//console.log('------------firebase usuario--------------------');
// 	//console.log(firebase.User.email);
// 	//console.log(firebase.User.name);
// 	//console.log(firebase.auth().currentUser);
















// ///////deletar backup
// document.getElementById("testeCalendario").onclick = function testeCalendario() {
	
// 	var dataDoCalendario = new Date();
// 	dataDoCalendario = document.getElementById("dataDoCalendario").value;

// 	var date = new Date();
// 	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// 	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
// 	var _lastDay;
// 	_lastDay = lastDay.getDate();

// 	var _firstDay = firstDay.getDay();
// 	var acabou = false;
// 	var text = "";
// 	var tempDia = 1;
	
// 	for (var j = 0; j < 31 && acabou == false; j++) {
// 		for (var i = 0; i < 7 && acabou == false; i++) {
// 			if (i < _firstDay) {
// 				text += " -- ";

// 			}
// 			else {
// 				text += " " + tempDia + " ";
// 				tempDia++;
// 				if(tempDia > _lastDay){
// 					acabou = true;
// 				}
// 			}
// 		}
// 		_firstDay = 0;
// 		text += "<br>";
// 	}

import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
    // Initialize Firebase
  	constructor (){
  	var config = {
    apiKey: "AIzaSyCS4raOie6ENo0vP636CkZ6ZHUe-72r71c",
    authDomain: "arsenalmanager-e8464.firebaseapp.com",
    databaseURL: "https://arsenalmanager-e8464.firebaseio.com",
    projectId: "arsenalmanager-e8464",
    storageBucket: "",
    messagingSenderId: "902180377643"
 	};
  	firebase.initializeApp(config);
	}
}

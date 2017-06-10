const config = {
	apiKey: "AIzaSyAmLE5kYMWiB6-Hy-CAO_kBfRIEwJaNDkE",
	authDomain: "wayfarer-17532.firebaseapp.com",
	databaseURL: "https://wayfarer-17532.firebaseio.com",
	projectId: "wayfarer-17532",
	storageBucket: "wayfarer-17532.appspot.com",
	messagingSenderId: "914349967715"
};

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();

const storageRef = firebase.storage().ref(); 

export default { databaseRef };
export { storageRef };
// export default firebase = { 
// 	databaseRef: firebase.database().ref(),
// 	storageRef: firebase.storage().ref()
// }

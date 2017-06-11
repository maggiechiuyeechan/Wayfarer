import React from "react";
import { storageRef, databaseRefRoot } from "../../Common/FirebaseConfig";

//when Firebase changes console log changed
export default class GeoJson extends React.Component {
	constructor(){
		super();
		this.state = {
			firebaseObj : {},
			userGeojson : {}
		}
		this.convertToGeojson = this.convertToGeojson.bind(this);
	}

	convertToGeojson(){
		let userGeojson = {};
		userGeojson['type'] = 'FeatureCollection';
		userGeojson['features'] = [];

		for (var key in this.state.firebaseObj) {
			let lat = this.state.firebaseObj[key].coordinates[0];
			let lon = this.state.firebaseObj[key].coordinates[1];
			let newFeature = {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [ lat, lon ]
					},
				"properties": {
					"key": key,
					"description": ""
					}
			}
			userGeojson['features'].push(newFeature);
		}
		console.log(userGeojson);
	}

	componentWillReceiveProps(nextProps) {

		databaseRefRoot.on('value', (snapshot) => {
			 this.setState({
			 	firebaseObj : snapshot.val()
			 });
			 this.convertToGeojson();
		});

		if (nextProps.map !== null) {
		};

	}

	render(){ 
		return ( 
			<div>
				<h1>Hello</h1>
			</div> 
		) }
}
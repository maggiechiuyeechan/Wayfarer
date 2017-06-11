import React from "react";
import { storageRef, databaseRefRoot } from "../../Common/FirebaseConfig";
import UpdateMapLayer from "../UpdateMapLayer/";

//when Firebase changes console log changed
export default class GeoJson extends React.Component {

	constructor(){
		super();
		this.state = {
			userGeojson : {},
			map: null
		}
		this.convertToGeojson = this.convertToGeojson.bind(this);

	}

	convertToGeojson(firebaseObj, passMap){
		let userGeojson = {};
		userGeojson['type'] = 'FeatureCollection';
		userGeojson['features'] = [];

		for (var key in firebaseObj) {
			let lat = firebaseObj[key].point.coordinates[0];
			let lon = firebaseObj[key].point.coordinates[1];

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
		this.setState({
			userGeojson : userGeojson
		});
	}

	componentWillReceiveProps(nextProps) {
		databaseRefRoot.on('value', (snapshot) => {
			let firebaseObj = snapshot.val();
			this.convertToGeojson(firebaseObj);
		});
		this.setState({ map : nextProps}) 
}

	render(){ 
		return ( 
			<div>
				<UpdateMapLayer geoJson={this.state.userGeojson} map={this.state.map} />
			</div> 
		) }
}
import React from "react";
import { storageRef, databaseRefRoot } from "../../Common/FirebaseConfig";
import UpdateMapLayer from "../UpdateMapLayer/";

//when Firebase changes console log changed
export default class GeoJson extends React.Component {

	constructor(){
		super();
		this.state = {
			userGeojson : {},
			map: null,
			firebaseObj: null
		}
		this.convertToGeojson = this.convertToGeojson.bind(this);

	}

	convertToGeojson(firebaseObj){
			let userGeojson = {};
			userGeojson['type'] = 'FeatureCollection';
			userGeojson['features'] = [];

			for (var key in firebaseObj) {
				if (firebaseObj[key].downloadLink !== undefined) { 
					let lat = firebaseObj[key].point.coordinates[0];
					let lon = firebaseObj[key].point.coordinates[1];
					let imgURL = firebaseObj[key].downloadLink[0];

					let newFeature = {
						"type": "Feature",
						"geometry": {
							"type": "Point",
							"coordinates": [ lat, lon ]
							},
						"properties": {
							"key": key,
							"description": "",
							"firstImage": imgURL
							}
					}
					userGeojson['features'].push(newFeature);
					this.setState({
						userGeojson : userGeojson
					});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		databaseRefRoot.on('value', (snapshot) => {
			let firebaseObj = snapshot.val();
			this.convertToGeojson(firebaseObj);
			this.setState({
				firebaseObj
			})
		});
		this.setState({ map : nextProps }) 
}

	render(){ 
		return ( 
			<div>
				<UpdateMapLayer geoJson={this.state.userGeojson} map={this.state.map} />
			</div> 
		) }
}
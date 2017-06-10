import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Firebase, { storageRef } from "../../Common/FirebaseConfig";

export default class Map extends React.Component {
	constructor(){
		super();
		this.state = {
			currentLocation: {},
			cityId: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {

		e.preventDefault();

		if ( this.state.currentLocation !== undefined) {
			Firebase.databaseRef.push(this.state.currentLocation);
		}

		const cityRef = storageRef.child(this.state.cityId);
		let fileList = this.file.files;

		for (let eachFile in fileList) {
			if ( fileList[eachFile].name !== undefined) {
				let thisImage = cityRef.child(fileList[eachFile].name);
				thisImage.put(fileList[eachFile]).then((snapshot)=>{console.log("uploaded");});
			};
		};
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.map !== null) {

			mapboxgl.geocoder = new MapboxGeocoder({
			    accessToken: mapboxgl.accessToken
			});

			nextProps.map.addControl(mapboxgl.geocoder);

			mapboxgl.geocoder.on('result', (event) => {
				this.setState({ currentLocation: event.result.geometry });
				this.setState({ cityId: String(event.result.geometry.coordinates) });
			});

		}
	}
	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}> 
					<input type ="file" ref= {(ref)=> this.file = ref} multiple/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}
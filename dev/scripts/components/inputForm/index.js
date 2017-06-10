import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Firebase, { storageRef } from "../../Common/FirebaseConfig";

export default class Map extends React.Component {
	constructor(){
		super();
		this.state = {
			currentLocation: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log(this.file.files)

		// let file = this.file.files[0];
		// let thisImage = storageRef.child(this.file.files.name);
		// thisImage.put(file).then((snapshot)=>{console.log("uploaded");});
		// Firebase.databaseRef.push(this.state.currentLocation.coordinates);
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.map !== null) {

			mapboxgl.geocoder = new MapboxGeocoder({
			    accessToken: mapboxgl.accessToken
			});

			nextProps.map.addControl(mapboxgl.geocoder);

			mapboxgl.geocoder.on('result', (event) => {
				this.setState({ currentLocation:event.result.geometry });
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
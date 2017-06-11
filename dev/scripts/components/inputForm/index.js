import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Firebase, { storageRef, firebaseDb } from "../../Common/FirebaseConfig";
import FirebaseToGeojson from "../FirebaseToGeoJson/"

export default class Map extends React.Component {
	constructor(){
		super();
		this.state = {
			currentLocation: { point: null, cityId: null, downloadLink: null},
			currentArrayUrls: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		let fileList = this.file.files;
		const cityRef = storageRef.child(this.state.currentLocation.cityId);

		if ( this.state.currentLocation !== undefined) {
			Firebase.databaseRef.push(this.state.currentLocation).then((snapshot)=>{ 
 				let currentKey = (snapshot.key);

 				for (let eachFile in fileList) {
					if (fileList[eachFile].name !== undefined){
						let thisImage = cityRef.child(fileList[eachFile].name);
						console.log(currentKey);
						thisImage.put(fileList[eachFile]).then((snapshot)=>{ 
							var newArrayUrl = this.state.currentArrayUrls;
							newArrayUrl.push(snapshot.metadata.downloadURLs[0]);

							this.setState({
								currentArrayUrls: newArrayUrl
							});

							firebaseDb.ref(currentKey+"/downloadLink/").set(this.state.currentArrayUrls);
						});
					}
				}
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.map !== null) {
			mapboxgl.geocoder = new MapboxGeocoder({
			    accessToken: mapboxgl.accessToken
			});

			nextProps.map.addControl(mapboxgl.geocoder);

			mapboxgl.geocoder.on('result', (event) => {
				let point = event.result.geometry;
				let pointString = String(event.result.geometry.coordinates); 
				this.setState({ currentLocation: { point, cityId : pointString, downloadLink: null}});
			});

		}
	}

				//<FirebaseToGeojson firebaseStoragePath={this.state.storagePath} />
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
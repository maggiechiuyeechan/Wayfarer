import React from "react";
import GeoJson from "../FirebaseToGeoJson";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Gallery from "../Gallery/";
import { firebaseDb } from "../../Common/FirebaseConfig";


export default class updateMapLayer extends React.Component {
	constructor(){
		super();
		this.state = {
			dbkey: null,
			firebaseElement: null
		}
	}
	displayGallery(){

	}
	componentWillReceiveProps(nextProps) {
		if ( nextProps.geoJson.features !== undefined ) {
			nextProps.geoJson.features.map((marker)=> {
					let el = document.createElement('div');
					el.className = 'marker';
					el.style.backgroundImage = `url(${marker.properties.firstImage})`;
					//el.style.backgroundImage = `url(http://unsplash.it/100/100)`;

					el.addEventListener('click', ()=>{
						console.log("I'm clicked");
						const dbkey = marker.properties.key;
						this.setState({dbkey});

						firebaseDb.ref(dbkey).on("value",(snapshot)=>{
							this.setState({firebaseElement: snapshot.val()});
						})
					});

				new mapboxgl.Marker(el, {offset:[-50,-50]})
					.setLngLat(marker.geometry.coordinates)
					.addTo(nextProps.map.map);
			});
		}
	}

	render(){
		return(
			<Gallery dbkey={this.state.dbkey} firebaseElement={this.state.firebaseElement}/>
		);
	};
};
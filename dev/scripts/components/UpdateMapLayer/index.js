import React from "react";
import GeoJson from "../FirebaseToGeoJson";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Gallery from "../Gallery/";

export default class updateMapLayer extends React.Component {

	componentWillReceiveProps(nextProps) {
		if ( nextProps.geoJson.features !== undefined ) {
			nextProps.geoJson.features.forEach((marker)=> {
					let el = document.createElement('div');
					el.className = 'marker';
					el.style.backgroundImage = `url(${marker.properties.firstImage})`;
					//el.style.backgroundImage = `url(http://unsplash.it/100/100)`;

					el.addEventListener('click', ()=>{
					    //window.alert(marker.properties.message);
					});

				new mapboxgl.Marker(el, {offset:[-50,-50]})
					.setLngLat(marker.geometry.coordinates)
					.addTo(nextProps.map.map);
			});
		}
	}

	render(){
		return(
			<Gallery />
		);
	};
};
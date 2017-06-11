import React from "react";
import GeoJson from "../FirebaseToGeoJson";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export default class updateMapLayer extends React.Component {

	componentWillReceiveProps(nextProps) {

		if ( nextProps.geoJson.features !== undefined) {
			nextProps.geoJson.features.forEach(function(marker) {
			    // create a DOM element for the marker
			    var el = document.createElement('div');
			    el.className = 'marker';
			    el.style.backgroundImage = 'url(http://unsplash.it/100/100/';
			    el.style.width = 100 + 'px';
			    el.style.height = 100 + 'px';

			    el.addEventListener('click', function() {
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
			null
		);
	};
};
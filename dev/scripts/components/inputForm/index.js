import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";


export default class Map extends React.Component {
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.map !== null) {

			let geocoder = new MapboxGeocoder({
			    accessToken: mapboxgl.accessToken
			});
			nextProps.map.addControl(geocoder);

			geocoder.on('result', function(ev) {
				//console.log(ev.result.geometry)
			    //map.getSource('single-point').setData(ev.result.geometry);
			});

		}
	}
	render(){
		return(
			<div>
			</div>
		)
	}
}
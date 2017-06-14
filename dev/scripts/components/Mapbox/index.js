import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import InputForm from "../inputForm";
import GeoJson from "../FirebaseToGeoJson"

mapboxgl.accessToken = "pk.eyJ1IjoiZW1tY2VlIiwiYSI6ImNqM296NGRpbTAwZmIzMm51ZWgxM2lmcDcifQ.PBztfR7grwxt_2auv7OeSw";

export default class Map extends React.Component {
	constructor() {
		super();
		this.state = {
			map: null
		}
	}
	componentDidMount(){
		var map = new mapboxgl.Map({
			container: this.map,
			style: 'mapbox://styles/emmcee/cj3vpu9hb01962snxx9rphata',
			//style: 'mapbox://styles/emmcee/cj3wl04gv0fge2rl3aj4kd8gw',
			//style: 'mapbox://styles/emmcee/cj3wl3ogh0fc62rr4d691l7dp',
			renderWorldCopies: false,
			maxZoom: 20,
			minZoom: 1.5,
			pitchWithRotate: false,
			dragRotate: false
		});
		this.setState({
			map
		});
	}
	render(){
		return(
			<main>
				<div className="map" ref={node => this.map = node}></div>
				<InputForm map={this.state.map} />
			</main>
		)
	}
}
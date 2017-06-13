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
			maxZoom: 22,
			minZoom: 2
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
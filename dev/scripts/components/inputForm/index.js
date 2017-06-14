import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Firebase, { storageRef, firebaseDb } from "../../Common/FirebaseConfig";
import FirebaseToGeojson from "../FirebaseToGeoJson/"

function EnterImages(props){
	const isImageInputVisible = props.isImageInputVisible;
				// { firebaseImgs.map((link)=>{<li><img src={link}/></li>}) };
	if (isImageInputVisible === true){
		return (
			<div className="inputForm__container">
				<button type="button" className="exitButton" onClick={props.exitPanel}><i className="fa fa-times" aria-hidden="true"></i>
</button>
				<div className="inputForm__mainContainer">
					<div className="inputForm__location">
						<h4 className="inputForm label__titles"> Destination </h4>
						<h1>{props.placeName}</h1>
					</div>

					<div className="inputForm__formContainer">
						<h4 className="inputForm label__titles"> Upload images to this location </h4>
						<form className="enterCityImages" onSubmit={props.handleSubmit}> 
							<input className="inputfile buttons chooseFiles" id="uploadImagesToLocation" type ="file" onChange={props.getFile} multiple/>
							<label className="chooseFiles" htmlFor="uploadImagesToLocation" >Choose Files</label>
							<input className="inputForm buttons submit" type="submit" value="Upload" />
							<p className="note"> File size limit: maximum 1mb per image </p>
						</form>
					</div>
				</div>
			</div>
		)
	}else{
		return null;
	}
}


export default class Map extends React.Component {
	constructor(){
		super();
		this.state = {
			currentLocation: { point: null, cityId: null, downloadLink: null, placeName: null},
			currentArrayUrls: [],
			map: {},
			isImageInputVisible: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getFile = this.getFile.bind(this);
		this.exitPanel = this.exitPanel.bind(this);
	}
	exitPanel(e){
		this.setState({isImageInputVisible:false});
	}
	getFile(e) {
		this.setState({ files: e.target.files });
	}
	handleSubmit(e) {
		e.preventDefault();

		let fileList = this.state.files;
		const cityRef = storageRef.child(this.state.currentLocation.cityId);

		if ( this.state.currentLocation !== undefined ) {
			Firebase.databaseRef.push(this.state.currentLocation).then((snapshot)=>{ 
 				let currentKey = (snapshot.key);

 				for (let eachFile in fileList) {
					if (fileList[eachFile].name !== undefined){
						let thisImage = cityRef.child(fileList[eachFile].name);
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
		this.setState({
			currentArrayUrls: [],
			isImageInputVisible: false,
		})
	}
	componentWillReceiveProps(nextProps) {

		if (nextProps.map !== null) {
			mapboxgl.geocoder = new MapboxGeocoder({
			    accessToken: mapboxgl.accessToken,
			});

			nextProps.map.addControl(mapboxgl.geocoder);

			mapboxgl.geocoder.on('result', (event) => {
				let point = event.result.geometry;
				let placeName = event.result.place_name;
				let pointString = String(event.result.geometry.coordinates); 
				this.setState({ currentLocation: { point, cityId : pointString, placeName: placeName, downloadLink: null}});
				this.setState({ isImageInputVisible: true})
			});

			this.setState({
				map: nextProps.map
			})
		}


	}

	render(){
		return(
			<div>
				<FirebaseToGeojson map={this.state.map} />
				<EnterImages getFile={this.getFile} exitPanel={this.exitPanel} isImageInputVisible={this.state.isImageInputVisible} placeName={this.state.currentLocation.placeName} handleSubmit={this.handleSubmit}/>
			</div>
		)
	}
}
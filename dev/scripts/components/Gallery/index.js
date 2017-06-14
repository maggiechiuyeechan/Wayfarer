import React from "react";
import Firebase, { firebaseStorageDb, storageRef, firebaseDb } from "../../Common/FirebaseConfig";


//on submit of input form
//show input field
//get props for city id
// function newImage (props){


// 	return(
// 		)
// }

function DisplayGallery(props){
	const isVisible = props.isVisible;
	const firebaseElement = props.firebaseElement;
				// { firebaseImgs.map((link)=>{<li><img src={link}/></li>}) };
	if (isVisible === true && firebaseElement !== null){
		const firebaseImgs = firebaseElement.downloadLink;
		const firebasePlaceName = firebaseElement.placeName;
		return (
			<div className="gallery">
					<button type="button" className="gallery__exit exitButton" onClick={props.exitPanel}><i className="fa fa-times" aria-hidden="true"></i></button>
					<h1 className="gallery__title"> {firebasePlaceName} </h1>
				<div className="gallery__imageItems">
					<ul>
							{ firebaseImgs.map((link)=>{
								return ( 
									<li>
											<div className="imgContainer" style={{ backgroundImage: `url(${link})` }}>
												{/*<img key={`img${link}`} src={link} />*/}
										</div>
										<button key={link} onClick={()=>{props.removeImg(link)}} className="removeImgButton"> <i className="fa fa-trash-o" aria-hidden="true"></i> </button>
									</li>
								)
							})}
					</ul>
				</div>
				<div className="gallery--form__container">
					<h4 className="label__titles"> Add more images to this location </h4>
					<form className="enterCityImages" onSubmit={props.handleSubmit}> 
						<input className="inputfile buttons chooseFiles" id="uploadImagesToLocation" type ="file" onChange={props.getFile} multiple/>
						<label className="chooseFiles" htmlFor="uploadImagesToLocation" >Choose Files</label>
						<input className="inputForm buttons submit" type="submit" value="Upload" />
						<p className="note"> File size limit: maximum 1mb per image </p>
					</form>
				</div>
			</div>

		)
	}else{
		return null;
	}
}

export default class Gallery extends React.Component {
	constructor(){
		super();
		this.state = {
			firebaseElement: null,
			isVisible: false,
			dbkey: null,
			currentArrayUrls: null
		}

		this.removeImg = this.removeImg.bind(this);
		this.exitPanel = this.exitPanel.bind(this);
		this.getFile = this.getFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	exitPanel(e){
		this.setState({
			isVisible:false
		});
	}

	getFile(e) {
		this.setState({ files: e.target.files });
	}

	handleSubmit(e) {
		e.preventDefault();

		let fileList = this.state.files;
		let cityId = this.state.firebaseElement.cityId;
		const cityRef = storageRef.child(cityId);
		let currentKey = this.state.dbkey;
		let tempFirebaseEle = this.state.firebaseElement;

		for (let eachFile in fileList){
			let thisImage = cityRef.child(fileList[eachFile].name);
			thisImage.put(fileList[eachFile]).then((snapshot)=>{
				var newArrayUrl = tempFirebaseEle.downloadLink;
				newArrayUrl.push(snapshot.metadata.downloadURLs[0]);
				tempFirebaseEle.downloadLink = newArrayUrl;

				firebaseDb.ref(currentKey+"/downloadLink/").set(tempFirebaseEle.downloadLink);
				this.setState({
					firebaseElement: tempFirebaseEle
				});
			});
		}
	}
	removeImg(imgKey){
		firebaseStorageDb.refFromURL(imgKey).delete();

		//////remove from firebase storage and database
		var firebaseElement = this.state.firebaseElement;
		var dbkey = this.state.dbkey;

		if ( firebaseElement.downloadLink.length > 1 ){
			var indexToBeRemoved = firebaseElement.downloadLink.indexOf(imgKey);
			firebaseElement.downloadLink.splice(indexToBeRemoved, 1);
			this.setState({
				firebaseElement
			})
			firebaseDb.ref(dbkey+"/downloadLink/").set(this.state.firebaseElement.downloadLink);
		} else {
			firebaseDb.ref(dbkey).remove();
		}
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps !== undefined && nextProps.clicked) {
			this.setState({
				dbkey: nextProps.dbkey,
				isVisible: true,
				firebaseElement: nextProps.firebaseElement,
			})
		}
	}

	render(){
		return(
			<main>
				<DisplayGallery isVisible={this.state.isVisible} firebaseElement={this.state.firebaseElement} removeImg={this.removeImg} handleSubmit={this.handleSubmit} exitPanel={this.exitPanel} getFile={this.getFile}/>
			</main>
		)
	}
}
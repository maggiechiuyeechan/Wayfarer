import React from "react";
import { firebaseStorageDb, firebaseDb } from "../../Common/FirebaseConfig";


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
		return (
			<div>
				<ul>
						{ firebaseImgs.map((link)=>{
							return ( 
								<li>
									<img key={`img${link}`} src={link} /> 
									<button key={link} onClick={()=>{props.removeImg(link)}}> Remove image </button>
								</li>
							)
						})};
				</ul>
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
			dbkey: null
		}
		this.removeImg = this.removeImg.bind(this);
	}

	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log("I'm submitted");
	// 	console.log(this.file.file);
	// }

	removeImg(imgKey){
		firebaseStorageDb.refFromURL(imgKey).delete();
		console.log(this.state.firebaseElement);

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
		}else{
			firebaseDb.ref(dbkey).remove();
		}
		console.log(firebaseElement);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== null) {
			this.setState({
				dbkey: nextProps.dbkey,
				isVisible: true,
				firebaseElement: nextProps.firebaseElement
			})
		}
	}

	render(){
		return(
			<main>
				<DisplayGallery isVisible={this.state.isVisible} firebaseElement={this.state.firebaseElement} removeImg={this.removeImg} handleSubmit={this.handleSubmit}/>
				{
				/*<form className="addImg" onSubmit={this.handleSubmit}> 
					<input type ="file" ref= {(ref)=> this.file = ref} multiple/>
					<input type="submit" value="Submit" />
				</form>
				*/
				}
			</main>
		)
	}
}
import React from 'react';
import ReactDOM from 'react-dom';
import Mapbox from "./components/Mapbox";


class App extends React.Component {
	render() {
		return (
		<main>
			<div className="header__Container">
				<h2 className="logoText">- Wayfarer -</h2>
			</div>
			<div className="containMap">
				<Mapbox />
			</div>
		</main>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

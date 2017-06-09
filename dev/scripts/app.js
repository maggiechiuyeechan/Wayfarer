import React from 'react';
import ReactDOM from 'react-dom';
import Mapbox from "./components/Mapbox";


class App extends React.Component {
    render() {
      return (
        <div>
          <Mapbox />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

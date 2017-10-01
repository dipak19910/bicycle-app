import React, { Component } from 'react';
import './App.css';
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
} from "react-google-maps";



import  GoogleMapComponent from "./GoogleMapComponent"
const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,

)(props =>
    <GoogleMapComponent {...props}/>
);




class App extends Component {
  render() {
    return (
        <div>

            <MapWithAMarkerClusterer /></div>);
  }
}

export default App;

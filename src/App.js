import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var google = window.google;
import fetch from "isomorphic-fetch";
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
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

/**
 * Created by bhola on 29/9/17.
 */

import  React from "react";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker,
} from "react-google-maps";
import  GoogleAutoComplete from "./GoogleAutoComplete"
var google = window.google;
import Feeder from "./Feeder"
class GoogleMapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getLocation = this.getLocation.bind(this);
    }

    componentWillMount() {
        this.setState({})
    }
    getLocation(error,{source,destination}){
        if(source && destination){
            this.props.directionFetch(source, destination);
        }else {
            this.props.fetchData()
        }


    }
    componentDidMount() {
         this.props.fetchData();
    }

    render() {
        let {directions, markers} = this.props;
        // if (!this.state.markers) {
        //     return <div>loading.....</div>;
        // }
        return ( <div>
            <div>
                <GoogleAutoComplete getLocation={this.getLocation}/>
            </div>
            <GoogleMap
            defaultZoom={3}
            defaultCenter={{lat: 28.7041, lng: 77.1025}}
        >
            {markers &&  <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={60}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.imei}
                        position={{lat: marker.lat, lng: marker.lng}}
                    />
                ))}
            </MarkerClusterer>}
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap></div>)
    }
}

export default Feeder(GoogleMapComponent);
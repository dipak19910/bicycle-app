/**
 * Created by bhola on 29/9/17.
 */

import  React from "react";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import {
    GoogleMap,
    DirectionsRenderer,
    Marker,
} from "react-google-maps";
import  GoogleAutoComplete from "./GoogleAutoComplete"

import Feeder from "./Feeder"
import  AutoSuggest from "./AutoSuggest"
class GoogleMapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getLocation = this.getLocation.bind(this);
    }

    componentWillMount() {
        this.setState({})
    }
    getLocation(error,props){
        let {source, destination} = props;
        if(source && destination){
            this.props.directionFetch(source, destination);
        }else {
            this.props.getWithInArea(source || destination)
        }
    }
    componentDidMount() {
         this.props.getWithInArea();
    }
    render() {
        let {directions, markers,gpsPosition} = this.props;
        // if (!this.state.markers) {
        //     return <div>loading.....</div>;
        // }
        return ( <div>

            <div>
                <GoogleAutoComplete getLocation={this.getLocation}/>
            </div>
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{lat: 28.7041, lng: 77.1025}}
            >
                {gpsPosition && <Marker
                    position={{ lat: gpsPosition.lat, lng:  gpsPosition.lng}}
                />}
                {markers && <MarkerClusterer
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
                {directions && <DirectionsRenderer directions={directions}/>}
            </GoogleMap><div><AutoSuggest {...this.props} /></div></div>);
    }
}

export default Feeder(GoogleMapComponent);
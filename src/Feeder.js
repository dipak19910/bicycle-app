
import React from "react";
import PropTypes from "prop-types";
import qs from "qs";
var google = window.google;
import  {connectToSocket,saveSubscriptionInfo,deleteSubscriptionInfo} from "./Socket";
module.exports = Component => {
    class Feeder extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {};
            this.fetchData = this.fetchData.bind(this);
            this.directionFetch = this.directionFetch.bind(this);
            this.getDirection = this.getDirection.bind(this);
            this.getWithInArea = this.getWithInArea.bind(this);
            this.imei = new Date().getTime();
            connectToSocket()
        }
        componentWillMount(){
            deleteSubscriptionInfo({imei:this.imei})
        }
        getWithInArea({lat=28.7041,lng=77.1025}={}){
            let url = `http://127.0.0.1:7071/location/tenkm?lat=${lat}&lng=${lng}`;
            this.fetchData(url).then(result=>{
                this.setState({markers:result.response});
            });
        }
        fetchData(url,options){
            return fetch(url)
                .then(res => res.json())
                .then(data => {
                    return data;
                });
           }
        getDirection(source,destination){
            const DirectionsService = new google.maps.DirectionsService();
            DirectionsService.route({
                origin: new google.maps.LatLng(source.lat, source.lng),
                destination: new google.maps.LatLng(destination.lat, destination.lng),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
        directionFetch(source={},destination={},speed) {
            saveSubscriptionInfo({imei: this.imei, source, destination, speed}, (data) => {
                this.getDirection(data.source, data.destination);
            });
            this.getDirection(source, destination);
            // this.fetchData(url);

        }

        render() {
            var { ...props } = this.props;
            return <Component {...props} directions={this.state.direction} markers={this.state.markers} fetchData={this.getWithInArea} directionFetch={this.directionFetch} />;
        }
    }

    return Feeder;
};

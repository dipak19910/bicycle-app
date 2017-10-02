import React from "react";
import qs from "qs";
import {getDirection} from "./utility";
import  {connectToSocket, saveSubscriptionInfo, deleteSubscriptionInfo} from "./Socket";
module.exports = Component => {
    class Feeder extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {};
            this.directionFetch = this.directionFetch.bind(this);
            this.chooseImeiBicycle = this.chooseImeiBicycle.bind(this);
            this.getWithInArea = this.getWithInArea.bind(this);
            this.getImeiNumber = this.getImeiNumber.bind(this);
            this.fetchData = this.fetchData.bind(this);
            connectToSocket()
        }

        componentWillMount() {
            deleteSubscriptionInfo({imei: this.imei})
            // 33540066063
        }

        fetchData(url, options = {}) {
            return fetch(url)
                .then(res => res.json())
                .then(data => {
                    return data;
                });
        }

        /*to get all device from within a particuler range*/
        getWithInArea({lat = 28.7041, lng = 77.1025} = {}) {
            let url = `http://127.0.0.1:7071/location/tenkm?lat=${lat}&lng=${lng}`;
            this.fetchData(url).then(({response}) => {
                this.setState({markers: response, directions: null});
            });
        }

        /*get direction from source to destination */
        directionFetch(source = {}, destination = {}) {
            let url = `http://127.0.0.1:7071/location/distance?${qs.stringify({
                source: JSON.stringify(source),
                destination: JSON.stringify(destination)
            })}`;
            this.fetchData(url).then(({response}) => {
                getDirection(response,(error,result)=>{
                    this.setState({
                        directions: result,
                        baseDistance:{
                            source,
                            destination
                        }
                    });
                });
            });
        }

        /*get imei list of imei number from data base */
        getImeiNumber({lat = 28.7041, lng = 77.1025} = {}) {
            let url = `http://127.0.0.1:7071/location/tenkm?lat=${lat}&lng=${lng}`;
            return this.fetchData(url);
        }
        /*choose a bycle*/
        chooseImeiBicycle({source, destination, speed, imei,age,sex,weight,heartRate}) {
            this.imei = imei;
            saveSubscriptionInfo({imei: this.imei, source, destination, speed}, (data) => {
                this.setState({
                    gpsPosition:data.source
                });

            });
            let url = `http://127.0.0.1:7071/location/chooseimei?${qs.stringify({
                source: JSON.stringify(source),
                destination: JSON.stringify(destination),
                speed,
                imei,
                age,
                sex,
                weight,
                heartRate
            })}`;
            this.fetchData(url);
        }

        getProps(){
            return {
                ...this.props,
                getWithInArea:this.getWithInArea,
                directionFetch:this.directionFetch,
                getImeiNumber:this.getImeiNumber,
                fetchData:this.fetchData,
                chooseImeiBicycle:this.chooseImeiBicycle,
                ...this.state
            }
        }
        render() {
            return <Component {...this.getProps()}/>;
        }
    }

    return Feeder;
};

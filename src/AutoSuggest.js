import React from"react";
import ReactAutocomplete from  "react-autocomplete"
import {deepEqual} from './utility'
import PropTypes from "prop-types";
import HumanBody from "./HumanBody"
class AutoSuggest extends React.Component {

    constructor(props,context) {
        super(props,context)
        this.state = {
            value: '',
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }

    componentWillReceiveProps(nextProps){
        let {baseDistance} =this.props
        if(nextProps.baseDistance && nextProps.baseDistance!==baseDistance ){
            this.fetchData(nextProps);
        }
    }
    fetchData(nextProps){
        /*to compare if current source and previous source is not equal*/
        if(!this.source || !(deepEqual(this.source,nextProps.baseDistance.source))) {
            this.props.getImeiNumber(nextProps.baseDistance.source).then(({response})=>{
                this.source = nextProps.baseDistance.source;
                this.setState({data: response});
            })
        }
    }
    getChildContext() {
        return {autosuggest: {
            getValues:(value)=>{
                this.humanValue = value;
            }
        }};
    }
    onSelect(value){
        console.log("this.coe>>>>", this);
        this.props.chooseImeiBicycle({
            ...this.props.baseDistance,
            imei: value,
            speed: 10,
            ...this.humanValue
        });
    }
    render() {
        if (!this.props.directions) {
            return null
        }
        return (
            <div>
                {this.props.children}
                <ReactAutocomplete
                    items={this.state.data}
                    shouldItemRender={(item, value) => item.imei.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.imei}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.imei}
                            style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}
                        >
                            {item.imei}
                        </div>
                    }
                    value={this.state.value}
                    onChange={e => this.setState({value: e.target.value})}
                    onSelect={value => {
                        this.onSelect(value);
                        this.setState({value});
                    }}
                />
            </div>

        );
    }
}


AutoSuggest.childContextTypes  = {
    autosuggest: PropTypes.object
};
export  default   AutoSuggest;
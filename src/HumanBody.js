import React from"react";
import PropTypes from "prop-types";

class HumanBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        };
        this.getValues = this.getValues.bind(this);
    }

    getValues(){
        return this.state;
    }
    render() {
        return (
            <div>
                <input type="number" placeholder="age" value={this.state.age} onChange={(e) => {
                    this.setState({
                        age: e.target.value
                    });
                }}/>

                <input type="number" placeholder="weight" value={this.state.weight} onChange={(e) => {
                    this.setState({
                        weight: e.target.value
                    });
                }}/>

                <input type="number"  placeholder="heart rate" value={this.state.heartRate} onChange={(e) => {
                    this.setState({
                        heartRate: e.target.value
                    });
                }}/>

                <input type="text"  placeholder="m/f" value={this.state.sex} onChange={(e) => {
                    this.setState({
                        sex: e.target.value
                    });
                    this.context.autosuggest.getValues({
                        ...this.state,
                        sex:e.target.value

                    });
                }}/>
            </div>

        );
    }
}
HumanBody.contextTypes = {
    autosuggest: PropTypes.object
};


export  default   HumanBody;
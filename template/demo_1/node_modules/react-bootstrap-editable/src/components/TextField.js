import React from "react"
import {Input} from "reactstrap";

export default class TextField extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <React.Fragment>
                <Input invalid={!!this.props.validationText}
                       value={this.props.value? this.props.value : ""}
                       onChange={e => this.props.setNewValue(e.target.value)}
                       type="text" bsSize="sm" className="mr-1"/>
                {this.props.controls}
            </React.Fragment>
        )
    }
}

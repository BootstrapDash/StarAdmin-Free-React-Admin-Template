import React from "react"
import {Input} from "reactstrap";

export default class TextArea extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <React.Fragment>
                <Input invalid={!!this.props.validationText}
                       value={this.props.value? this.props.value : ""}
                       onChange={e => this.props.setNewValue(e.target.value)}
                       type="textarea" className="mb-1"/>
            </React.Fragment>
        )
    }
}

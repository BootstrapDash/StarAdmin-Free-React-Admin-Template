import React from "react"
import {CustomInput} from "reactstrap";

export default class File extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <CustomInput className="form-control-sm mr-1" type="file" bsSize="sm"
                             label={this.props.value? this.props.value.name: this.props.label}
                             onChange={e => this.props.setNewValue(e.target.files[0])}/>
                {this.props.controls}
            </React.Fragment>
        )
    }
}

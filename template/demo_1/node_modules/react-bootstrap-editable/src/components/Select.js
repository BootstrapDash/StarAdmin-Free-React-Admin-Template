import React from "react"
import {Input} from "reactstrap";

export default class TextField extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const options = this.props.options.map((value, index) => {
            return <option key={index + value}>{value}</option>
        })
        return (
            <React.Fragment>
                <Input value={this.props.value} onChange={e => this.props.setNewValue(e.target.value)}
                       type="select" bsSize="sm" className="mr-1">{options}</Input>
                {this.props.controls}
            </React.Fragment>
        )
    }
}

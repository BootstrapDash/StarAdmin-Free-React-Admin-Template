import React from "react"
import {Input} from "reactstrap";

export default class Date extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let date = this.props.value
        if(date){
            date = date.toISOString? date.toISOString().slice(0, 10): new window.Date(date).toISOString().slice(0, 10)
        }
        return (
            <React.Fragment>
                <Input value={date? date : ""} type="date" bsSize="sm" className="mr-1"
                       onChange={e => this.props.setNewValue(e.target.valueAsDate)}/>
                {this.props.controls}
            </React.Fragment>
        )
    }
}

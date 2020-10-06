import React from "react"
import PropTypes from "prop-types";
import TextField from "./components/TextField";
import TextArea from "./components/TextArea";
import Select from "./components/Select";
import Date from "./components/Date";
import {Button, Form, PopoverHeader, PopoverBody, Popover, Spinner, FormText} from "reactstrap";
import File from "./components/File";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

export default class Editable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: this.props.initialValue,
            newValue: this.props.initialValue,
            isEditing: false,
            validationText: null,
            isLoading: false,
        };
        //used for popover mode
        this.clickableLink = React.createRef();
    }
    componentDidMount() {
        if(this.props.ajax && !this.props.validate && !this.props.disabled){
            console.error(`Editable(${this.props.id}): You provided an ajax prop without a validate prop; 
            ajax function will not be called`)
        }
    }
    componentDidUpdate(prevProps, prevState){
        //update initial value if the prop got updated
        if(prevProps.initialValue !== this.props.initialValue){
            this.setState({value: this.props.initialValue, newValue: this.props.initialValue})
        }
    }
    getEditingComponent(){
        let controls = (
            <React.Fragment>
                <Button className="ml-auto mr-1" color="success" size="sm" onClick={() => this.onSubmit(this.state.newValue)}>
                    <FontAwesomeIcon icon={faCheck} fixedWidth/>
                </Button>
                <Button color="danger" size="sm" onClick={() => this.onCancel()}>
                    <FontAwesomeIcon icon={faTimes} fixedWidth/>
                </Button>
            </React.Fragment>
        );
        if(this.state.isLoading){
            controls = (
                <div className="my-auto mx-4">
                    <Spinner  style={{width: "1.5rem", height: "1.5rem"}}/>
                </div>)
        }
        let commonProps = {
            value: this.state.newValue,
            validationText: this.state.validationText,
            controls: controls,
            setNewValue: (newValue) => this.setState({newValue: newValue}),
            onCancel: () => this.onCancel()
        };
        let component;
        switch(this.props.type){
            case "textfield":
                component =  <TextField {...commonProps}/>;
                break;
            case "select":
                component = <Select {...commonProps} options={this.props.options}/>;
                break;
            case "date":
                component = <Date {...commonProps}/>;
                break;
            case "textarea":
                return (
                    <Form>
                        <TextArea {...commonProps}/>
                        <div className="d-flex align-items-start">
                            <FormText className="mt-0">{this.state.validationText}</FormText>
                            {controls}
                        </div>
                    </Form>);
            case "file":
                component = <File {...commonProps} label={this.props.label}/>;
                break;
            default:
                console.error(`Editable(${this.props.id}): "${this.props.type}" is not a valid value for the "type" prop`)
                return null
        }
        return(
            <Form className={this.props.className}>
                <div className="align-items-baseline d-flex">
                    {component}
                </div>
                <FormText className="mt-0">{this.state.validationText}</FormText>
            </Form>
        )
    }
    onCancel(){
        //reset validation text AND new value, all back to initial
        this.setState({validationText: null, newValue:this.state.value, isEditing: false})
    }
    //validation happens here
    onSubmit(newValue){
        const validationText = this.props.validate? this.props.validate(newValue) : null

        //we always trigger this, as long as the prop is specified
        this.props.onSubmit? this.props.onSubmit(newValue) : null

        if(validationText){
            this.setState({validationText: validationText})
        }else{
            this.props.validate? this.onValidated(newValue) : this.setState({value: newValue, isEditing: false})
        }
    }
    onValidated(validValue){
        if(this.props.onValidated){
            this.props.onValidated(validValue)
        }else if(!this.props.ajax){
            console.error(`Editable(${this.props.id}): Specified a validate function without onValidated or ajax`)
        }

        if(this.props.ajax && validValue !== this.state.value){
            this.ajax(validValue)
        }else{
            this.setState({value: validValue, isEditing: false, validationText: null})
        }
    }
    ajax(validValue){
        this.setState({isLoading: true})
        let xhr = new XMLHttpRequest()
        //this will call the user's ajax function, allowing him to set up the xhr object however he wants
        this.props.ajax(xhr, validValue, this.props.id);
        //consume the user's on ready state change function to call it later before the editable's
        let onReadyStateChange = xhr.onreadystatechange? xhr.onreadystatechange : null
        xhr.onreadystatechange = () => {
            onReadyStateChange? onReadyStateChange() : null;
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    this.setState({isLoading: false, isEditing: false, value: validValue, validationText: null})
                }else{
                    this.setState({isLoading: false, validationText: `Ajax Response ${xhr.status} Error`})
                }
            }
        }
    }
    render(){
        if((this.state.isEditing || this.props.alwaysEditing) && this.props.mode === "inline"){
            return(this.getEditingComponent())
        }else{
            let value = this.state.value? this.state.value: "No value"
            //format date objects for display, might add a custom format function here later
            value = this.props.type === "date" && this.state.value? new window.Date(this.state.value).toUTCString().slice(5, 16) : value
            value = this.props.type === "file" && this.state.value? this.state.value.name : value

            let p = "", a = "";
            if(this.props.isValueClickable){
                if(this.props.disabled){
                    p = value
                }else{
                    a = value
                }
            }else{
                p = value
                a = this.props.disabled? a : this.props.editText
            }
            //add label if applicable
            p = this.props.label? `${this.props.label}: ${p}` : p;
            let popover = this.props.mode === "popover"?(
                <Popover isOpen={this.state.isEditing} placement={this.props.placement}
                         target={this.clickableLink}>
                    <PopoverHeader>{this.props.label}</PopoverHeader>
                    <PopoverBody>{this.getEditingComponent()}</PopoverBody>
                </Popover>
            ) : null;

            return(
                <Form className={this.props.className} inline>
                    {p && this.props.showText && <p className="my-0" style={{"whiteSpace": "pre-wrap"}}>{p}</p>}
                    {a && <a ref={this.clickableLink} className="ml-1 mt-auto" href="javascript:"
                             onClick={() => this.setState({isEditing: true})}>{a}</a>}
                    {popover}
                </Form>
            )
        }
    }
}
Editable.defaultProps = {
    type: "textfield",
    mode: "inline",
    alwaysEditing: false,
    className: null,
    initialValue: null,
    id: null,
    label: null,
    showText: true,
    disabled: false,
    isValueClickable: false,
    editText: "Edit",
    //popover
    placement: "top",
    //functions
    validate: null,
    ajax: null,
    onSubmit: null,
    onValidated: null,
    //select props
    options: null
};
Editable.propTypes = {
    type: PropTypes.oneOf(["textfield", "textarea", "select", "date", "file"]).isRequired,
    mode: PropTypes.oneOf(["inline", "popover"]).isRequired,
    alwaysEditing: PropTypes.bool,
    className: PropTypes.string,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    showText: PropTypes.bool,
    disabled: PropTypes.bool,
    isValueClickable: PropTypes.bool,
    editText: PropTypes.string,
    validate: PropTypes.func,
    ajax: PropTypes.func,
    onSubmit: PropTypes.func,
    onValidated: PropTypes.func,
    /** Popover mode only */
    placement: PropTypes.oneOf(["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "right", "right-start",
        "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end"]),
    /** Select only */
    options: PropTypes.array,
};

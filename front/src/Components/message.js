import react from "react";

class UserMessage extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            messageID: this.props.messageID,
            message: this.props.message,
            sender: this.props.sender,
            showForm: this.props.showForm,
            selectedForm: this.props.selectedForm,
            edited: this.props.edited,
        }
    }

    render(){
        if(this.state.edited === true){
            console.log("TRUE")
        }

        return(
        <div>
            {this.state.edited === true ?
            <div>{this.state.sender}:{this.state.message}</div>
            : <div>False</div>
            }
        </div>
        );

    }
}

export default UserMessage;
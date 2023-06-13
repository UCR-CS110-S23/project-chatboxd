import react from "react";
import {useState} from "react"
import { Button } from "@mui/material";
import likeEmoji from "../images/like.png"
import dislikeEmoji from "../images/dislike.png"
import '../Styles/Chatroom.css'
/* import UserMessage from "../Components/message.js"; */

class Chatroom extends react.Component{
    constructor(props){
        super(props);
        /* this.socket = io('http://localhost:3001') */ //more stuff here
        this.state = {
            username:this.props.username,
            text: '',
            messages: [],
            error: "none",
            showForm: false,
            selectedForm: undefined,
            originalMsg: "",
            newMsg:'',
            id: undefined,
            searchMsg: '',
            searching: false,
        }
    }

    react = (messageId) =>{
        if(this.state.searching === false){
            this.setState({id: messageId, showForm: true, selectedForm:"emoji"})
        }
    }

    searchMessage = (event) => {
        if(this.state.searchMsg === ''){
            console.log("Stop searching. Show all chats.")
            this.setState({searching:false})
            this.props.socket.emit("grab history")
        }
        else{
            console.log("Search in messages for:", this.state.searchMsg)
            this.setState({searching:true})
            this.props.socket.emit("search", this.state.searchMsg)
        }
        event.preventDefault()
        /* this.props.socket.emit("search", this.state.searchMsg) */
    }

    emoji = (data) => {
        //console.log(data.stance)
        this.setState({showForm: false});
        this.props.socket.emit("emoted", {id:this.state.id, stance:data.stance})
    }

    editMessage = (event) => {
        this.setState({showForm: false});
        this.props.socket.emit("edited message", {id:this.state.id, newMsg:this.state.newMsg})
    }

    closeForm = () => {
        this.setState({showForm: false});
    }

    render(){

        let display = null;

        if (this.state.showForm){
            //let fields = [];
            if(this.state.selectedForm === "edit"){
                console.log("EDIT")
                display = 
                <div>
                    {this.state.error === "none" ?
                        <div>
                            <button onClick={() => this.closeForm()}> X </button>
                            <form onSubmit={this.editMessage}>
                                <label>
                                Edit your message: 
                                <input type="text" value={this.state.newMsg} onChange={(e) => this.setState({"newMsg":e.target.value} )} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </div> 
                        : <></>}
                    {this.state.error === "none" ?
                        <></>
                        : <div>Room does not exist anymore. Please press back button. </div>}
                    <Button onClick={() => this.props.goBack()}> Back to lobby </Button>
                </div>;
            }
            else if(this.state.selectedForm === "emoji"){
                display = 
                <div>
                    {this.state.error === "none" ?
                        <div>
                            <button onClick={() => this.closeForm()}> X </button>
                            <div>
                                React to the message!
                            </div>
                            <button onClick={() => this.emoji({stance:"like"})}>Like</button>
                            <button onClick={() => this.emoji({stance:"dislike"})}>Dislike</button>
                        </div> 
                        : <></>}
                    {this.state.error === "none" ?
                        <></>
                        : <div>Room does not exist anymore. Please press back button. </div>}
                    <Button onClick={() => this.props.goBack()}> Back to lobby </Button>
                </div>;
            }
        }
        else{ display =
            <div style={{width:'auto', height:'auto'}}>
                <div>Send a message:</div>
                {/* { (this.state.error === "none") && (this.state.searching === false) ? 
                    <input type="text" id="text" onChange={(e)=>{this.setState({text:e.target.value})}}/>
                    : <></>}  */}
                { (this.state.error === "exists") || (this.state.searching === true) ? 
                    <></>
                    : <input type="text" id="text" onChange={(e)=>{this.setState({text:e.target.value})}}/>} 
                {this.state.error === "none" ?
                    <></>
                    : <div>Room does not exist anymore. Please press back button. </div>}
                {/* { (this.state.error === "none") && (this.state.searching === false) ?
                    <button onClick={()=>this.props.sendChat(this.state.text)}>send</button>
                    : <></>} */}
                { (this.state.error === "exists") || (this.state.searching === true) ?
                    <></>
                    : <button onClick={()=>this.props.sendChat(this.state.text)}>send</button>}

                {this.state.error === "none" ? 
                    Chatroom
                    : <></>}
            <br></br>
            <Button onClick={() => this.props.goBack()}> Back to lobby </Button>
            </div>;
        }

        this.props.socket.on('room gone', (data)=>{
            //console.log("REACHED HERE")
            if(data.msg == "failed message"){
                this.setState({error:"exists"})
            }
        })

        this.props.socket.on('load history', (history)=>{
            /* if(this.state.searching === false){ */
            /* console.log("CHATROOM MESSAGES", history) */
            if(this.state.searching === false){
                this.setState({messages:history});
            }
            /* } */
        })

        this.props.socket.on('search history', (history)=>{
            this.setState({messages:history});
        })

        return (
            <div className="chatroom-container">
              <div className="chatroom-header">Chatroom</div>
              
              {/* Input form for searching messages */}
              {(this.state.error !== "exists") && (
              <div className="chatroom-search-form">
                <input
                  type="text"
                  value={this.state.searchMsg}
                  onChange={(e) => this.setState({ searchMsg: e.target.value })}
                  placeholder="Search the chat"
                />
                <button onClick={this.searchMessage}>Search</button>
              </div>
                )}
              
              {/* List of messages */}
              <ul className="chatroom-message-list">
                {this.state.messages.map((message) => (
                  <li key={message._id}>
                    <div className="message" onClick={()=>this.react(message._id)}>
                      <div className="sender">{message.sender.name}</div>
                      <div className="text">{message.message.text}</div>
                    </div>
                    <div className="actions">
                      {this.state.username === message.sender.username && (this.state.error !== "exists") && (
                        <button onClick={() => this.setState({ id: message._id, showForm: true, selectedForm: "edit", originalMsg: message.message.text, newMsg: message.message.text })}>
                          Edit
                        </button>
                      )}
                      <div onClick={() => this.react(message._id)} className="emoji">
                        {message.emoji === "like" && <img src={likeEmoji} alt="likeEmoji" />}
                        {message.emoji === "dislike" && <img src={dislikeEmoji} alt="dislikeEmoji" />}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Form for sending messages */}
              {!this.state.showForm && (this.state.error !== "exists") && (
                <div className="chatroom-form">
                  <input
                    type="text"
                    id="text"
                    onChange={(e) => {
                      this.setState({ text: e.target.value });
                    }}
                    placeholder="Send a message"
                  />
                  <button onClick={() => this.props.sendChat(this.state.text)}>Send</button>
                </div>
              )}
      
              {/* Display form for editing or reacting to a message */}
              {this.state.showForm && (this.state.error !== "exists") && (
                <div className="chatroom-form">
                    {this.state.selectedForm === "edit" && (
                    <div>
                        <button onClick={() => this.closeForm()}>X</button>
                        <form onSubmit={this.editMessage}>
                        <label>
                            Edit your message:
                            <input
                            type="text"
                            value={this.state.newMsg}
                            onChange={(e) => this.setState({ newMsg: e.target.value })}
                            />
                        </label>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>
                    )}

                    {this.state.selectedForm === "emoji" && (
                    <div>
                        <button onClick={() => this.closeForm()}>X</button>
                        <div>React to the message!</div>
                        <button onClick={() => this.emoji({ stance: "like" })}>Like</button>
                        <button onClick={() => this.emoji({ stance: "dislike" })}>Dislike</button>
                    </div>
                    )}
                </div>
                )}
      
             {this.state.error === "exists" && (
                <div>Room does not exist anymore. Please press back button. </div>
             )}

              {/* Back to lobby button */}
              <Button onClick={() => this.props.goBack()}>Back to Lobby</Button>
            </div>
        );
    }
}

export default Chatroom;
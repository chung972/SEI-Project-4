import React, {Component} from 'react'
import Chatkit from "@pusher/chatkit-client";
import MessageList from '../../components/ChatComponents/MessageList';
import SendMessageForm from '../../components/ChatComponents/SendMessageForm';
import RoomList from '../../components/ChatComponents/RoomList';
import NewRoomForm from '../../components/ChatComponents/NewRoomForm';

const tokenUrl = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b93e8a79-4f9a-41f3-b407-1757f163d0c3/token"
const instanceLocator = "v1:us1:b93e8a79-4f9a-41f3-b407-1757f163d0c3"
const pusherKey = process.env.PUSHER_KEY

// const chatkit = new Chatkit({
//     instanceLocator: "v1:us1:b93e8a79-4f9a-41f3-b407-1757f163d0c3",
//     key: "0b7aa237-a82a-438c-ad8b-3980c2eab270:wN+3wbyIzdEokkobixJm0UnGusKSVuehDV1uswGu8Vo="
// })


class ChatPage extends Component {
    
    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            currentUser: null
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
    } 
    
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'chung972',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.setState({currentUser})
            this.getRooms()
        })
        .catch(err => console.log('error on connecting: ', err))
    }
    
    getRooms() {
        this.state.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.state.currentUser.rooms
            })
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }
    
    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.state.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRooms()
        })
        .catch(err => console.log('error on subscribing to room: ', err))
    }
    
    sendMessage(text) {
        console.log(text)
        this.state.currentUser.sendSimpleMessage({
            text,
            roomId: this.state.roomId
        });
    }
    
    createRoom(name) {
        this.state.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('error with createRoom: ', err))
    }
    
    render() {
        return (
            <div className="app">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />
                <MessageList 
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage} />
                <NewRoomForm createRoom={this.createRoom} />
            </div>
        );
    }
}

export default ChatPage;
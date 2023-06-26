import React, { Component } from "react";
import Config from "../scripts/config";

class Image extends Component {
    state = {
        ros: null,
        image: null
    };

    constructor(){
        super();
        this.init_connection();
        this.view_image = this.view_image.bind(this);
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("Connection established");
        });

        this.state.ros.on("close", () => {
            console.log("Connection closed");

            setTimeout(() => {
                console.log('This will run after 1 second!');
            }, 1000);

            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
                } catch (error) {
                    console.log("Connection issue");
                }
            }, 3000);
        });
        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
        } catch (error) {
            console.log("Connection issue");
        }
       }
       view_image() {
        try {
           

        var image_topic = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.TOPIC_IMAGE,
            messageType: Config.MSG_IMAGE
        });

        image_topic.subscribe(function(message) {
            document.getElementById('image').src = "data:image/jpg;base64," + message.data;
            console.log("images received");
          });
          

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.view_image();
    }
    render() {
        return (
            <div>
                <img id="image" src="https://reactjs.org/logo-og.png" alt="react logo" style={{ width: '400px', height: '400px' }}/>
            </div>);

    }
}

export default Image;
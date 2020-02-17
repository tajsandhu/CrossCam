import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { Storage } from 'aws-amplify';

export default class Camera extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            recording: false,
            capture_button_color: 'white',
            capture_mode: 'picture',
            swap_icon: 'camera-alt',
        }
    }

    componentDidMount() {
        //determines the width and height of the camera preview on startup
        this.setState({
            height: Dimensions.get('window').height, 
            width: Dimensions.get('window').width
        });
    }

    //swaps between the picture and video mode
    swapMode = () => {
        if (this.state.swap_icon == 'camera-alt')
            this.setState({swap_icon: 'videocam', capture_mode: 'video'});
        else
            this.setState({swap_icon: 'camera-alt', capture_mode: 'picture'})
    }

    //captures an image and stores it in s3
    takePicture = async() => {
        if (this.camera) {
            //takes a pictre and returns a promise
            const data = await this.camera.takePictureAsync();
            //retrieves the image uri from the promise
            const respone = await fetch(data.uri);
            //retrieves image from the uri
            const blob = await respone.blob();
            //stores the image in an s3 bucket
            //logs an error if one occers
            Storage.put('yourKeyHere.jpeg', blob, {
                contentType: 'image/jpeg',})
            .then (result => console.log(result))
            .catch(err => console.log(err));
        } else {
            Alert.alert('Camera Unavailable');
        }
    }

    /* TODO: implement auth storage */
    //records a video
    takeVideo = async() => {
        if (this.camera) {
            if (this.state.recording == false) {
                //change the state to reflect a new recording starting
                this.setState({recording: true, capture_button_color: 'red'});
                //begins a recording and returns a promise on completion
                const data = await this.camera.recordAsync();
                //for testing only, displays the uri
                Alert.alert(data.uri)
            } else {
                //change the state to reflect on a recording ending
                this.setState({recording: false, capture_button_color: 'white'});
                //ends a recording and allows recordAsync to return the promise
                await this.camera.stopRecording();
            }
        } else {
            Alert.alert('Camera Unavailable');
        }
    }

    //selects between image and video capture when the capture button is selected
    capture = async() => {
        if (this.state.capture_mode == 'picture')
            await this.takePicture();
        else
            await this.takeVideo();
    }
    
    
    render() {
        return(
            <View style={styles.camera_container}>
                <RNCamera
                    style={{height: this.state.width, width: this.state.width}}
                    ref={ref => {this.camera = ref;}}
                    />
                <TouchableOpacity onPress={this.capture} style={styles.capture_button}>
                    <Icon  
                        name='camera'
                        color={this.state.capture_button_color}
                        size={60}
                        />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.swapMode} style={styles.swap_button}>
                    <Icon 
                        name={this.state.swap_icon}
                        color='white'
                        size={30}
                        />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    camera_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    capture_button: {
        position: 'absolute',
        bottom: 15
    },

    swap_button: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    }

})
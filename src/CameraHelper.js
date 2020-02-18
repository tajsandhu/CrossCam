import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { Storage } from 'aws-amplify';

export default class CameraHelper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            recording: false,
        }
    }

    componentDidMount() {
        //determines the width and height of the camera preview on startup
        this.setState({
            height: Dimensions.get('screen').height, 
            width: Dimensions.get('screen').width
        });
    }

    getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        var second = new Date().getSeconds();
        var mili = new Date().getMilliseconds();
        return ''.concat(date, '-', month, '-', year, '-', hour, ':', second, ':', mili);
    }//captures an image and stores it in s3
    takePicture = async() => {
        if (this.camera) {
            //takes a pictre and returns a promise
            const data = await this.camera.takePictureAsync({quality: .5});
            //retrieves the image uri from the promise
            const respone = await fetch(data.uri);
            //retrieves image from the uri
            const blob = await respone.blob();

            const title = ''.concat(this.getCurrentDate(), '.jpeg');
            //stores the image in an s3 bucket
            //logs an error if one occers
            Storage.put(title, blob, {
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
                const data = await this.camera.recordAsync({quality: .5});
                //for testing only, displays the uri
                Alert.alert(data.uri)
            } else {
                //change the state to reflect on a recording ending
                this.setState({recording: false, capture_button_color: 'white'});
                //ends a recording and allows recordAsync to return the promise
                this.camera.stopRecording();
            }
        } else {
            Alert.alert('Camera Unavailable');
        }
    }

    //selects between image and video capture when the capture button is selected
    capture = async(mode) => {
        if (mode == 'picture')
            await this.takePicture();
        else
            await this.takeVideo();
    }

}
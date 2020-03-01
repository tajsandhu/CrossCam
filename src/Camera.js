import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon, Slider } from 'react-native-elements';
import { Storage } from 'aws-amplify';
import { useIsFocused } from '@react-navigation/native';
import CameraRoll from "@react-native-community/cameraroll";


class CameraView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            recording: false,
            capture_button_color: 'white',
            swap_icon: 'camera-alt',
            focus: false,
            zoom: 0,
            flash: 'auto',
            flash_icon: 'flash-auto'
        }
    }

    async componentDidMount() {
        await this.requestCameraPermission();
        //determines the width and height of the camera preview on startup
        this.setState({
            height: Dimensions.get('window').height, 
            width: Dimensions.get('window').width
        });
    }
      
    requestCameraPermission = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                                'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can store data")
            } else {
                console.log("Storage permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
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
    }

    //captures an image and stores it in s3
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
                .catch(err => Alert.alert(err));
        } else {
            Alert.alert('Camera Unavailable');
        }
    }

    flash = async() => {
        if (this.state.flash == 'auto') {
            this.setState({flash: 'on', flash_icon: 'flash'})
        } else if(this.state.flash == 'on') {
            this.setState({flash: 'off', flash_icon: 'flash-off'})
        } else {
            this.setState({flash: 'auto', flash_icon: 'flash-auto'})
        }
    }
    
    render() {
        const { isFocused } = this.props;
        return(
            <View style={styles.camera_container}>
                {isFocused && <RNCamera
                    style={{height: this.state.width, width: this.state.width}}
                    ref={ref => {this.camera = ref;}}
                    zoom={this.state.zoom}
                    flashMode={this.state.flash}
                />}
                <TouchableOpacity onPress={()=>{}} style={styles.flash_button} onPress={() => this.flash()}>
                    <Icon
                        name={this.state.flash_icon}
                        type='material-community'
                        color='white'
                        size={45}
                        />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Settings')} style={styles.settings_button}>
                    <Icon
                        name='settings'
                        color='white'
                        size={45}
                        />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.takePicture} style={styles.capture_button}>
                    <Icon  
                        name='camera'
                        color={this.state.capture_button_color}
                        size={60}
                        />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Gallery')} style={styles.gallery_button}>
                    <Icon 
                        name='photo-album'
                        color='white'
                        size={60}
                        />
                </TouchableOpacity>
                <View style={styles.zoom_slider}>
                    <Slider
                        value={this.state.zoom}
                        onValueChange={value => this.setState({zoom: value})}
                        minimumValue={0}
                        maximumValue={.99}
                        orientation={'vertical'}
                        style={{height: 200}}
                        />
                </View>
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

    gallery_button: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    },

    settings_button: {
        position: 'absolute',
        top: 15,
        right: 15
    },

    zoom_slider: {
        position: 'absolute',
        right: 15
    },

    flash_button: {
        position: 'absolute',
        top: 15,
        left: 15
    },

})

export default function Camera(props) {
    const isFocused = useIsFocused();
    return <CameraView {...props} isFocused={isFocused} />;
}
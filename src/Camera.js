import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';

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

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    componentDidMount() {
        this.setState({
            height: Dimensions.get('window').height, 
            width: Dimensions.get('window').width
        });
    }

    swapMode = () => {
        if (this.state.swap_icon == 'camera-alt')
            this.setState({swap_icon: 'videocam', capture_mode: 'video'});
        else
            this.setState({swap_icon: 'camera-alt', capture_mode: 'picture'})
    }

    takePicture = async() => {
        if (this.camera) {
            const data = await this.camera.takePictureAsync();
            Alert.alert(data.uri);
        } else {
            Alert.alert('Camera Unavailable');
        }
    }

    takeVideo = async() => {
        if (this.camera) {
            if (this.state.recording == false) {
                this.setState({recording: true, capture_button_color: 'red'});
                const data = await this.camera.recordAsync();
                Alert.alert(data.uri)
            } else {
                this.setState({recording: false, capture_button_color: 'white'});
                await this.camera.stopRecording();
            }
        } else {
            Alert.alert('Camera Unavailable');
        }
    }

    capture = async() => {
        if (this.state.capture_mode == 'picture')
            await this.takeVideo();
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
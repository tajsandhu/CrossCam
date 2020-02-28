import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements';
import CameraRoll from "@react-native-community/cameraroll";
import { RNFetchBlob } from 'rn-fetch-blob';
import { Storage } from 'aws-amplify';

export default class FullImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            width: Dimensions.get('window').width,
            ratio: 0
        };
    }

    componentDidMount() {
        //gets the image url from the previous screen
        this.setState({img: this.props.route.params.link});
        Image.getSize(this.props.route.params.link, (width, height) => {
            this.setState({ratio: (height/width)});
        });
    }

    deleteImage = async() => {
        await Storage.remove(this.props.route.params.name)
            .then(() => this.props.route.params.refreshFunction())
            .then(() => this.props.navigation.navigate('Gallery'))
            .catch(() => Alert.alert('Deletion Failed'));
    }

    downloadImage = () => {
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                path: dirs.DownloadDir + "/path-to-file.png",
                fileCache: true,
            }).fetch('GET', this.props.route.params.link)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <ReactNativeZoomableView 
                    maxZoom={1.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    style={styles.image_container}>
                    <FastImage
                        style={{width: this.state.width, height: (this.state.width*this.state.ratio)}}
                        source={{uri: this.state.img}}/>
                </ReactNativeZoomableView>
                <TouchableOpacity style={styles.delete_button} onPress={() => this.deleteImage()}>
                    <Icon
                        name='delete-outline'
                        type='material-community'
                        color='white'
                        size={30}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.download_button} onPress={() => this.downloadImage()}>
                    <Icon
                        name='download-outline'
                        type='material-community'
                        color='white'
                        size={30}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent:'center'
    },
    image_container: {
        flex: 1
    },
    delete_button: {
        position: 'absolute',
        right: 15,
        bottom: 15
    },
    download_button: {
        position: 'absolute',
        left: 15,
        bottom: 15
    }
})
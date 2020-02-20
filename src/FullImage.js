import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import FastImage from 'react-native-fast-image';

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
    }
})
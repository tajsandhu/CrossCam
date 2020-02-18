import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BaseRouter } from '@react-navigation/native';

export default class FullImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            width: Dimensions.get('window').width
        };
    }

    componentDidMount() {
        //gets the image url from the previous screen
        this.setState({img: this.props.route.params.link});
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FastImage
                    style={{width: this.state.width, height: (this.state.width*4/3)}}
                    source={{uri: this.state.img}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'black'
    }
})
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends React.Component {
    render() {
        return(
            <View style={styles.camera_container}>
                <RNCamera
                    ref=>/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    camera_container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
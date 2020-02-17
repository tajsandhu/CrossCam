import React from 'react';
import { S3Album } from 'aws-amplify-react-native';
import { View, StyleSheet } from 'react-native';

export default class Gallery extends React.Component {
    render() {
        return(
            <View style={styles.gallery_container}>
                <S3Album path={''} picker />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    gallery_container: {
        flex: 1,
        flexDirection: 'column'
    }
})
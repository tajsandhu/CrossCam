import React from 'react';
import { S3Image } from 'aws-amplify-react-native';
import { Storage } from 'aws-amplify';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
        }
        this.images = [];
    }

    async componentDidMount() {
        await this.getList();
        await this.getImage(0);
    }

    getImage = async(url) => {
        const data = await Storage.get(url);
        return data;
    }

    getList = async() => {
        await Storage.list('', { level: 'public' })
            .then((result) => {
                for (var i in result) {
                    this.images.push(result[i]['key']);
                };
            });
    }

    

    render() {
        const list = this.images.map(image => {
            const URI = this.getImage(image);
            console.log(image);
            return (
                <FastImage
                    style={{width: 500, height: 500}}
                    source={{uri: URI}}
                    />
            )
        })
        return(
            <ScrollView>
                {list}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    gallery_container: {
        flex: 1,
        flexDirection: 'column'
    }
})
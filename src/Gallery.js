import React from 'react';
import { S3Image } from 'aws-amplify-react-native';
import { Storage } from 'aws-amplify';
import { View, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

export default class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: '',
        }
        this.images = [];
        this.list = [];
    }

    async componentDidMount() {
        //gets the names off all the images
        await this.getList();
        //gets a url for al of the images
        const getList = async() => {
            return Promise.all(this.images.map( image =>this.getImage(image)));
        }
        //appends these urls to a list
        await getList().then(data => {
            for (var d in data) {
                this.list.push(data[d])
            }
            this.setState({images: this.list})
        })
    }

    //obtains a url for an image based on the name
    getImage = async(name) => {
        const data = await Storage.get(name);
        return data;
    }

    //creates a list of the names of all images
    getList = async() => {
        //returns a promise with a list of image names
        await Storage.list('', { level: 'public' })
            .then((result) => {
                //appends the names to a list
                for (var i in result) {
                    this.images.push(result[i]['key']);
                };
            });
    }

    

    render() {
        return(
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.images}
                    renderItem={({item}) => (
                        <FastImage
                            style={{width: 500, height: 500}}
                            source={{uri:item}}
                        />
                    )}
                />
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
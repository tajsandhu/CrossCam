import React from 'react';
import { Storage } from 'aws-amplify';
import { View, StyleSheet, Alert, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';

class GalleryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: '',
            width: Dimensions.get('window').width,
        }
        this.images = [];
    }

    async componentDidMount() {
        await this.refreshList()
    }

    refreshList = async() => {
        //gets the names off all the images
        await this.getList();
        //gets a url for al of the images
        const getList = async() => {
            return Promise.all(this.images.map( image =>this.getImage(image)));
        }
        //appends these urls to a list
        await getList().then(data => {
            var list = []
            for (var d in data) {
                list.push(data[d])
            }
            this.setState({images: list})
            console.log(list.map(image => image[0]))
        })
    }

    //obtains a url for an image based on the name
    getImage = async(name) => {
        const img = await Storage.get(name);
        const data = [name, img]
        return data;
    }

    //creates a list of the names of all images
    getList = async() => {
        this.images = []
        //returns a promise with a list of image names
        await Storage.list('', { level: 'public' })
            .then((result) => {
                //appends the names to a list
                for (var i in result) {
                    this.images.push(result[i]['key']);
                };
            });
    }

    expandImage = (data) => {
        this.props.navigation.navigate('Image', {name: data[0], link: data[1], refreshFunction: this.refresh});
    }

    refresh = async() => {
        await this.refreshList()
        .catch(() => Alert.alert('Refresh Failed'))
    }

    render() {
        return(
            <FlatList
                data={this.state.images}
                numColumns={3}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.expandImage(item)}
                        style={[{width: (this.state.width/3), height: (this.state.width/3)}, styles.image_pane]}>
                        <FastImage
                            style={styles.image}
                            source={{uri:item[1]}}
                        />
                    </TouchableOpacity>
                )}
            />

        )
    }
}

const styles = StyleSheet.create({
    gallery_container: {
        flex: 1,
        flexDirection: 'column'
    },
    image_pane: {
        alignItems: 'center',
        justifyContent: 'center'
    },   
    image: {
        width: '95%',
        height: '95%'
    }
})


export default function Gallery(props) {
    const isFocused = useIsFocused();
    return <GalleryView {...props} isFocused={isFocused} />;
}
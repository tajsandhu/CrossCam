import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Auth } from 'aws-amplify'

export default class Settings extends React.Component {

    logout = async() => {
        await Auth.signOut().then(data => this.props.navigation.navigate('Login'));
    }
    render() {
        return (
            <View style={styles.settings_list}>
                <ListItem
                    title='Logout'
                    titleStyle={{ color: 'red'}}
                    onPress={() => this.logout()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settings_list: {
        flex: 1
    },

    logout_button: {
        textDecorationColor: 'red'
    }
})
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.main_view}>
                <Input containerStyle={styles.input}/>
                <Button title='Login' 
                    containerStyle={{width: '100%'}}
                    buttonStyle={styles.button}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#364f6b'
    },
    input: {
        backgroundColor: '#f0f0f0'
    },
    button: {
        backgroundColor: '#fc5185',
    }
})
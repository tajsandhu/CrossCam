import React from 'react';
import { View, StyleSheet, ToastAndroid, Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    signIn = async() => {
        if (this.state.email != '' && this.state.password != '') {
            await Auth.signIn(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('Camera'))
                .catch(() => Alert.alert('Invalid Username or Password'));
        } else {
            Alert.alert('Please fill all fields');
        }
    }

    render() {
        return (
            <View style={styles.main_view}>
                <Input 
                    placeholder='email@address.com'
                    placeholderTextColor='#b3b3b3'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    onChangeText={data => {this.setState({email: data})}}
                    containerStyle={styles.input_container} 
                    inputStyle={styles.input_style} 
                    leftIcon={
                        <Icon
                            type='material-community'
                            name='email-outline'
                            color='#f0f0f0'/>}
                    />
                <Input 
                    placeholder='Password'
                    placeholderTextColor='#b3b3b3'
                    secureTextEntry={true}
                    autoCompleteType='off'
                    onChangeText={data => {this.setState({password: data})}}
                    containerStyle={styles.input_container} 
                    inputStyle={styles.input_style}
                    leftIcon={
                        <Icon
                            type='material-community'
                            name='lock-outline'
                            color='#f0f0f0'/>}
                    />
                <Button title='Login'
                    onPress={() => this.signIn()} 
                    containerStyle={{width: '95%'}}
                    buttonStyle={styles.button}/>  
                <Text  style={styles.text}>Forgot Password?</Text>
                <Text style={[styles.text, styles.register_text]}>Need an account? Register</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#364f6b',
        padding: 15
    },
    input_container: {
        marginBottom: 5
    },
    input_style: {
        color: '#f0f0f0'
    },
    button: {
        backgroundColor: '#fc5185',
    },
    text: {
        color: '#f0f0f0',
    },
    forgot_text: {
        alignSelf: 'flex-end',
        right: 8,
        marginVertical: 5
    },
    register_text: {
        bottom: 15,
        position: 'absolute'
    }

})
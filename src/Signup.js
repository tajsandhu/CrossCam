import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Icon, Text, Image } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm: ''
        }
    }

    //attempts to sign up the user
    signup = async() => {
        //confirms all needed fields are filled
        if (this.state.email != '' && this.state.password != '' && this.state.confirm == this.state.password) {
            //returns a promise if the sign in is successful
            //otherwise an error is thrown
            await Auth.signUp({
                username: this.state.email,
                password: this.state.password})
                .then(() => this.props.navigation.navigate('Confirm'))
                .catch(() => Alert.alert('Sign up unsuccessful'));
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
                <Input 
                    placeholder='Confirm Password'
                    placeholderTextColor='#b3b3b3'
                    secureTextEntry={true}
                    autoCompleteType='off'
                    onChangeText={data => {this.setState({confirm: data})}}
                    containerStyle={styles.input_container} 
                    inputStyle={styles.input_style}
                    leftIcon={
                        <Icon
                            type='material-community'
                            name='lock-outline'
                            color='#f0f0f0'/>}
                    />
                <Button title='Sign Up'
                    onPress={() => this.signup()} 
                    containerStyle={{width: '95%'}}
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
})
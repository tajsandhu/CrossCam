import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Icon, Text, Image } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            code: ''
        }
    }

    //confirms a code to complete user sign up
    confirm = async() => {
        if (this.state.email != '' && this.state.code != '') {
            //returns a promise if the email and the code match
            //otherwise an error is thrown
            await Auth.confirmSignUp(
                this.state.email,
                this.state.code)
                .then(() => this.props.close())
                .catch(() => Alert.alert('Code and email do not match'));
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
                    placeholder='Code'
                    placeholderTextColor='#b3b3b3'
                    autoCompleteType='off'
                    onChangeText={data => {this.setState({code: data})}}
                    containerStyle={styles.input_container} 
                    inputStyle={styles.input_style}
                    leftIcon={
                        <Icon
                            type='material-community'
                            name='pound'
                            color='#f0f0f0'/>}
                    />
                <Button title='Confirm'
                    onPress={() => this.confirm()} 
                    containerStyle={{width: '95%'}}
                    buttonStyle={styles.button}/>  
                <Button title='Cancel'
                    onPress={() => this.props.close()} 
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
        marginBottom: 5
    },
})
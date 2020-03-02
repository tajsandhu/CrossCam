import React from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Input, Button, Icon, Text, Image, Overlay } from 'react-native-elements';
import { Auth } from 'aws-amplify';

import Confirm from './Confirm';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            overlayVisible: false,
            confirmVisible: false,
            screenWidth: Dimensions.get('screen').width
        }
    }

    //Signs in the user
    signIn = async() => {
        if (this.state.email != '' && this.state.password != '') {
            this.setState({overlayVisible: true}, async() => {
                await Auth.signIn(this.state.email, this.state.password)
                    .then(() => this.props.navigation.navigate('Camera'))
                    .then(() => this.setState({overlayVisible: false}))
                    .catch(() => {
                        this.setState({overlayVisible: false}, () =>
                        Alert.alert('Invalid Username or Password')
                        )});
            })
        } else {
            Alert.alert('Please fill all fields');
        }
    }

    //displays the email confirmation popup
    showConfirmation = () => {
        this.setState({confirmVisible: true});
    }

    // closes the email confirmation popup
    closeConfirmation = () => {
        this.setState({confirmVisible: false});
    }

    //displays a spinner while the login process is occuring
    Login = async() => {
        this.setState({overlayVisible: true}, () => {
            this.signIn()
        });
    }

    render() {
        return (
            <View style={styles.main_view}>
                <Overlay 
                    overlayStyle={styles.loading_container}
                    isVisible={this.state.overlayVisible}>
                    <ActivityIndicator size='large'/>
                </Overlay>
                <Image 
                    source={require('../res/camera_icon.png')}
                    style={{width: 150, height: 150}}/>
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
                <Text style={styles.text}>Forgot Password?</Text>
                <Text style={styles.text} onPress={()=>this.showConfirmation()}>Need to confirm a code?</Text>
                <Overlay isVisible={this.state.confirmVisible}>
                    <Confirm close={this.closeConfirmation}/>
                </Overlay>
                <Text style={[styles.text, styles.register_text]} onPress={()=>{this.props.navigation.navigate('Signup')}} >Need an account? Register</Text>
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
    },
    loading_container: {
        alignItems: 'center', 
        justifyContent: 'center',
        height: 60,
        width: 60
    }

})
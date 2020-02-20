import React from 'react'
import { View, Text } from 'react-native'
import { Auth } from 'aws-amplify';

export default class AuthLoading extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.getAuthStatus()
            .then(res => {
                if (res == true) {
                    this.props.navigation.navigate('Camera')
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
    }

    getAuthStatus = async() =>{
        return Auth.currentAuthenticatedUser()
            .then(() => {return true})
            .catch(() => {return false})
    }



    render() {
        return(
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>Loading</Text>
            </View>
        )
    }
}
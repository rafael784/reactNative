import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
//import { createAppContainer} from 'react-navigation';

//import styles from '/../styles/index';
import { render } from 'react-dom';
import { useNavigation } from '@react-navigation/native';


function TextLink({ screenName }) {
    const navigation = useNavigation();
  
    return (
        
        <Text
            style = {styles.donotRegister}
            onPress={() => navigation.navigate("Signup")}
        >
            Do you not register ? Signup.
        </Text>
      
    );
  }


export default function HomeScreen(props) {
    const n = useNavigation();


  return (
    <View style = {styles.backgroun} >
    <Index {...props} navigation  = {n}></Index>
    </View>
  );
}

class Index extends Component{

    
    clicou = (value, navigation) => {
      console.log(value);
      
      fetch("http://localhost:3001/auth/authenticate", {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email:value['email'],
          password:value['password'] 
        })
      })
      .then((response)=> response.json())
      .then((responseData)=>{
        if(responseData['error'])
        {
            alert(responseData.error);
        }  
        else
        {
            //console.log(response);
            alert('Login com sucesso!');
            localStorage.setItem('jwt', responseData.token);
            navigation.navigate('Main');
        }
      })
  
    }
  
    state = {
      email: '',
      password: ''
    }
  
    alternar = () =>{
  
      this.setState({
        slogan:this.state.slogan ? '': 'cana'
      });
    }
      
    render(){
        const { navigation } = this.props
        return(<View>
                <Image
                    source={require('./../assets/todo3.png')}
                    style = {styles.logo}      
                />
                <Text style = {styles.email}>
                  Email
                </Text >
                <TextInput
                  style = {styles.emailInput}
                  placeholder = "________________________________________________________________"
                  onChangeText = {text => this.state.email = text}
                >

                </TextInput>
                <Text style = {styles.password}>
                  Password
                </Text>
                <TextInput
                  style = {styles.passwordInput}
                  onChangeText = {text => this.state.password = text}
                  placeholder = "______________________________________________________________"
                  secureTextEntry = {true}
                >
                </TextInput>

                <TextLink />
                <TouchableOpacity
                    style = {styles.button}
                    // onPress = {()=>{this.clicou(navigation)}}
                    // onPress={() => navigation.navigate("Signup")}
                    onPress = {() =>{this.clicou({'email': this.state.email, 'password': this.state.password}, navigation)}}
                 
                >
                  <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
  
  
      )
    }
  }
  
const styles = StyleSheet.create({
    backgroun:{
        backgroundColor: 'white'
    },
    logo:{
      position: 'absolute',
      width: '140px',
      height: '140px',
      left: '117px',
      top: '119px'
    },
    input:{
      //marginTop: 10,
      width: 500,
      fontSize: 20,
      fontWeight: 'bold',
      borderRadius: 3,
      fontFamily:  'Montserrat Alternates',
      color: '138A72'
    },
  
    email:{
      position: 'absolute',
      width: '160px',
      height: '23px',
      left: '61px',
      top: '371px',
  
      fontFamily: 'Montserrat Alternates',
      fontStyle: 'normal',
      fontWeight:' normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#138A72',
      fontWeight: 'bold'
    },
    emailInput:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '422px',
    },
  
    password:{
      position: 'absolute',
      width: '160px',
      height: '23px',
      left: '61px',
      top: '455px',
  
      fontFamily: 'Montserrat Alternates',
      fontStyle: 'normal',
      fontWeight:' normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#138A72',
      fontWeight: 'bold'
  
    },
  
    passwordInput:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '506px',
    },
  
    button:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '590px',
      backgroundColor: '#138A72', /* Green */
      
      padding: '20px',
      alignItems: 'center',
      display: 'inlineblock',
      cursor: 'pointer',
      borderRadius: '15px',
      justifyContent:'center'
    },
  
    buttonText:{
      fontSize: '20px',
      color: 'white',
    },
  
    donotRegister:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '550px',
  
    }
  
  
  











})
  
  


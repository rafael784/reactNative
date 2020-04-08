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
            onPress={() => navigation.navigate("Home")}
        >
            Login
        </Text>
    );
  }

export default function SinupScreen({ navigation }) {
  return (
    <View style = {styles.backgroun}  navi = {navigation}>
    <Index></Index>
    </View>
  );
}


class Index extends Component{    
    clicou = (value) => {

      if(value['name'] == '' || value['email'] == '' || value['password'] == '' )
      {
        alert('campos inválidos');
      }
      else{      
      fetch("http://localhost:3001/auth/register", {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name:value['name'],
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
              alert('Cadastro feito com sucesso!');
          }
        })
      }
    }
  
    state = {
      name:'',
      email: '',
      password: '',
      passwordB: ''
    }
  
    alternar = () =>{
  
      this.setState({
        slogan:this.state.slogan ? '': 'cana'
      });
    }
      
    render(){

      return(<View>
                <Image
                  source={require('./../assets/todo3.png')}
                  style = {styles.logo}      
                />
                
                <Text style = {styles.name}> Name </Text>

                <TextInput
                  style = {styles.nameInput}
                  placeholder = "________________________________________________________________"
                  onChangeText = {text => this.state.name = text}
                >

                </TextInput>

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
                  //onPress = {()=>{this.clicou()}}
                  onPress = {() =>{this.clicou({'name':this.state.name,'email': this.state.email, 'password': this.state.password})}}
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
    name:{
      position: 'absolute',
      width: '160px',
      height: '23px',
      left: '61px',
      top: '281px',
  
      fontFamily: 'Montserrat Alternates',
      fontStyle: 'normal',
      fontWeight:' normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: '#138A72',
      fontWeight: 'bold'

    },
    nameInput:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '311px',
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
  
    passwordInputB:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '506px',
    },

    passwordB:{
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

    donotRegister:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '550px',
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
    
})
  
  


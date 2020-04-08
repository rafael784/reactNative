import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
//import { createAppContainer} from 'react-navigation';

//import styles from '/../styles/index';
import { render } from 'react-dom';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';



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


function exclude (value)
{
    console.log(value);
}


export default function MainScreen(props) {

    
    const n = useNavigation();

    fetch("http://localhost:3001/projects/", {
          method: 'GET',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('jwt')
          },
        })
        .then((response)=> response.json())
        .then((responseData)=>{
          if(responseData['error'])
          {
              n.navigate('Home');
          }  
          else
          {
              console.log("está logado")
          }
    })

    
    const resp =  fetch("http://localhost:3001/projects/listInfo", {
          method: 'GET',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('jwt')
          },
        })
        .then((response)=> response.json())
        .then((responseData)=>{
            return responseData;
        })
        
        let rows = [];
        resp.then(function(value){
            value.infos.forEach(element => {
                if(element['content']){
                    rows.push({content: element.content},{id: element._id}, {linha:'___________________'},{exclude: 'X'});
                }
            });
        })
    
       console.log(rows);
       
  return (
    <View >
        <Index {...props} navigation  = {n} name></Index>
        <FlatList style={styles.container}
          data={rows}
          renderItem={({item}) => 
          <View   key = {item.id}>
                {/* <Text style = {styles.info}>_____________ </Text> */}
           <Text style={styles.item}>  {item.content} </Text>
           
          </View>
 
          }
                 />
      </View>

  );
}

class Index extends Component{


    clicou = (value, navigation) => {

        console.log(localStorage.getItem('jwt'));
        fetch("http://localhost:3001/projects/createInfo", {
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('jwt')
          },
          body: JSON.stringify({
            content:value['content']
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
              alert('Comentário postado com sucesso!');
              //.navigate('Home');
          }
        })
    
      }
    
      state = {
        content: '',
      }
  
    render(){

        const { navigation } = this.props
        return(<View>
                <Image
                    source={require('./../assets/todo3.png')}
                    style = {styles.logo} 
                         
                />

                <Text style = {styles.content}>
                  What you have todo?
                </Text >

                <TextInput
                  style = {styles.contentInput}
                  placeholder = "________________________________________________________________________"
                  onChangeText = {text => this.state.content = text}
                >
                
                
                </TextInput> 
                

                <TouchableOpacity
                    style = {styles.button}
                    // onPress = {()=>{this.clicou(navigation)}}
                    // onPress={() => navigation.navigate("Signup")}
                    onPress = {() =>{this.clicou({'content': this.state.content}, navigation)}}
                 
                >
                  <Text style = {styles.buttonText}>></Text>
                </TouchableOpacity>
                </View> 
                
      )
    }
  }

const styles = StyleSheet.create({
    
    logo:{
      position: 'absolute',
      width: '140px',
      height: '140px',
      left: '117px',
      top: '119px'
    },
  
    content:{
      position: 'absolute',
      width: '160px',
      height: '23px',
      left: '61px',
      top: '371px',
  
      fontFamily: 'Montserrat Alternates',
      fontStyle: 'normal',
      fontWeight:' normal',
      
      lineHeight: '22px',
      color: '#138A72',
      fontWeight: 'bold'
    },
    contentInput:{
      position: 'absolute',
      width: '252px',
      height: '23px',
      left: '61px',
      top: '422px',
    },
  
    button:{
      position: 'absolute',
      width: '40px',
      height: '23px',
      left: '290px',
      top: '400px',
      backgroundColor: 'none', /* Green */
      
      padding: '20px',
      alignItems: 'center',
      display: 'inlineblock',
      cursor: 'pointer',
      borderRadius: '15px',
      justifyContent:'center'
    },
  
    buttonText:{
       fontSize: '20px',
      color: 'green',
    },
    container: {
        top: '500px',
        left: '60px',
        flex: 1,
        paddingTop: 10,
        
       },
       item: {
         padding: 5,
         fontSize: 18,
         height: 5,
         color: '#138A72'
       },
       info:{
        fontFamily: 'Montserrat Alternates',
        fontStyle: 'normal',
        fontWeight:' normal',
        fontSize: '18px',
        lineHeight: '22px',
        color: '#138A72',
        fontWeight: 'bold'

       },

       buttonExclude:{
        padding: 5,
        fontSize: 18,
        height: 5,
        backgroundColor: 'none', /* Green */
        color: '#138A72',
        padding: '20px',
        alignItems: 'center',
        display: 'inlineblock',
        cursor: 'pointer',
        borderRadius: '15px',
        justifyContent:'center'
      },
    
})
  
  


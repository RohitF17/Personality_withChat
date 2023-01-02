import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import GLOBAL from '../global';
const backImage = require("../assets/backImage.png");

export default function Question4({ navigation }) {

    const[question4,setquestion]=useState(null);

    function validationAnswer() {
        if (!question4.trim()) {
            alert("Please Enter The Question");
            return;
          }
          GLOBAL.Question4=question4;
          console.log("globalVeriable",GLOBAL.Question4);
          navigation.navigate("Result");
      }
      
  
  
  
    return(
        <View>
            <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Question-4</Text>
        <Text style={styles.bodyquestion}>What do you prefer movies or books?Please Justify Your Answer </Text>
         <TextInput
        style={styles.input}
        placeholder="Enter Your response"
        autoCapitalize="none"
        multiline={true}
            underlineColorAndroid='transparent'
        autoFocus={true}
        value={question4}
        onChangeText={(text) => {setquestion(text)}}
      />
   
      <TouchableOpacity style={styles.button} onPress={validationAnswer} >
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Send</Text>
      </TouchableOpacity>
      
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
        </View>
    )
 
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
    flex:1,
    position: "absolute",
    top: 0,
    resizeMode: 'strech',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  bodyquestion:{
    fontSize: 13,
    fontWeight : "bold",
    color: "black",
    alignSelf: "center",
    
  }
});
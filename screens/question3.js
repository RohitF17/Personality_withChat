import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import GLOBAL from '../global';
const backImage = require("../assets/backImage.png");

export default function Question3({ navigation }) {

    const[question3,setquestion]=useState(null);

    function validationAnswer() {
        if (!question3.trim()) {
            alert("Please Enter The Question");
            return;
          }
          GLOBAL.Question3=question3;
          console.log("globalVeriable",GLOBAL.Question3);
          navigation.navigate("Question4");
      }
      
  
  
  
    return(
        <View>
            <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Question-3</Text>
        <Text style={styles.bodyquestion}>Whats your favorite thing to do in your free time and why do you like it? </Text>
         <TextInput
        style={styles.input}
        placeholder="Enter Your response"
        autoCapitalize="none"
        multiline={true}
            underlineColorAndroid='transparent'
        autoFocus={true}
        value={question3}
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
import { async } from '@firebase/util';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert,Dimensions } from "react-native";
import GLOBAL from '../global';
const backImage = require("../assets/backImage.png");
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


export default function ResultPage({ navigation }) {
    const[openness,setopenness]=useState(null);
    const[neuroticism,setneuroticism]=useState(null);
    const[extraversion,setextraversion]=useState(null);
    const[agreebleness,setagreebleness]=useState(null);
    const[conscientiousness,setconscientiousness]=useState(null);
    const[loading,setloading]=useState(true);
    function roundToTwo(num) {
        return +(Math.round(num + "e+3")  + "e-3");
    }

    const op1=roundToTwo(openness);
    const op2=roundToTwo(neuroticism);
    const op3=roundToTwo(extraversion);
    const op4=roundToTwo(agreebleness);
    const op5=roundToTwo(conscientiousness);
    var avg=roundToTwo( (((op1+op2+op3+op4+op5)/5)*10) -1 ) ;
    const numbers = [
        {label: 'openness', value: openness},
        {label: 'neuroticism', value: neuroticism},
        {label: 'extraversion', value: extraversion},
        {label: 'agreebleness', value: agreebleness},
        {label: 'conscientiouness', value: conscientiousness},
      ];
      
      const max = Math.max.apply(null, numbers.map(v => v.value));
      console.log(max);
      
      const maxObject = numbers.find(n => n.value === max);
      
    const data1 = {
        labels: ["agreeableness", "openness", "neuroticism", "extraversion", "conscientiousness"],
        datasets: [
          {
            data: [agreebleness, openness, neuroticism,extraversion, conscientiousness],
            color: (opacity = 1) => `black`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Personality Analysis"] // optional
      };
      const data = [
        {
          name: "agreebleness",
          population: op4*100,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "openness",
          population: op1*100,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "neuroticism",
          population: op2*100,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "extraversion",
          population: op3*100,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "conscientiousness",
          population: op5*100,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];
      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 4, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
 async function Posting(){
   var fullText=GLOBAL.Question1+GLOBAL.Question2+GLOBAL.Question3+GLOBAL.Question3;
  
   const url = 'https://big-five-personality-insights.p.rapidapi.com/api/big5';

   const options = {
     method: 'POST',
     headers: {
       'content-type': 'application/json',
       'X-RapidAPI-Key': '9d94f3d055msh97b0d9954c3b612p1bc649jsn967059b948bb',
       'X-RapidAPI-Host': 'big-five-personality-insights.p.rapidapi.com'
     },
     body: `[{"id":"1","language":"en","text":"${fullText}"}]`
   };
   
   fetch(url, options)
       .then(res => res.json())
       .then(json =>{ console.log(json[0])
        setagreebleness(json[0].agreeableness)
        setextraversion(json[0].extraversion)
        setneuroticism(json[0].neuroticism)
        setopenness(json[0].openness)
        setconscientiousness(json[0].conscientiousness)
        setloading(false);
     }
       )
       .catch(err => console.error('error:' + err));

 }
    useEffect(() => {
      console.log("Iam here");
      Posting();
      
},[loading])

  
  
  
    return(
        <View>
            <View style={styles.container}>
     
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Personality-Result</Text>
        <Text style={styles.bodyquestion}>Your Personality Score is </Text>
       {(loading)?<Text style={styles.bodyquestion1}>Score is updating</Text>:
       <View>
       <Text style={styles.bodyquestion1}> {avg} </Text> 
       <Text style={styles.bodyquestion1}>{maxObject.label}</Text>
       <View style={{paddingTop:20}}>
       

</View>
<View style={{paddingTop:20}}>
<LineChart
  data={data1}
  width={240}
  height={220}
  chartConfig={chartConfig}
  bezier={true}
  xLabelsOffset={2}
  withVerticalLabels={false}
/>
</View>
<TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Home")}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Home</Text>
      </TouchableOpacity>
       </View>
        } 
         
       
       
         
   
      
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
    color: "Red",
    alignSelf: "center",
    
  },
  bodyquestion1:{
    fontSize: 25,
    fontWeight : "bold",
    color: "Blue",
    alignSelf: "center",
    
  }
});
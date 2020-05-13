import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import{ Camera }from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';
import Quiz from './screens/index'



class App extends Component {
  render(){
    return(
      <Quiz />
    )
 }
}

export default App;
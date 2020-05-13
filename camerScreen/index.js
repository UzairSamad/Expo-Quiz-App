import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import{ Camera }from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';


class Camera extends Component {
  constructor(props){
    super(props)

  this.state = { hasCameraPermission : null,
            type: Camera.Constants.Type.back,
            camera:false,
            photo:'',
            flashmode: Camera.Constants.FlashMode.on, 
            faces: []
          };


  this.onFacesDetected = this.onFacesDetected.bind(this)
  this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
        }

async componentDidMount(){
const {status} = await Permissions.askAsync(Permissions.CAMERA);
this.setState({hasCameraPermission : status === 'granted'})
}

snap=async()=>{
  let  photo  = await this.camera.takePictureAsync() 
  this.setState({photo:photo.uri, isCamera: false })
  console.log(photo.uri);

  const {imageUri} = photo.uri;
  detectFaces = async imageUri =>{
    const { options } = {mode: FaceDetector.detectFacesAsync(imageUri , options)}
    console.log(options)
    console.log('detected face function worked')
  }

  }

//   try{
//   if(this.camera){
//   let photo = await this.camera.takePictureAsync({base64:true});
//    if(!faceDetected){
//      alert('no face detected')
//      return;
//    }
//    const{userId} = makeId();
//    const{base64} = photo;
//    this[recognize ? 'recognize' : 'enroll']({userId, base64});
//   }
//   }
//   catch(e){
//     console.log('error on snap' , e);
//   }
 }
  


onFacesDetected=({newfaces})=>{
    this.setState({faces:newfaces})
    console.log(newfaces);

  }


onFaceDetectionError=(error)=>{
  console.log(error);
}


handleFlip=()=>{
if (this.state.type === Camera.Constants.Type.back){
  return (this.setState({type:Camera.Constants.Type.front}))
}else{
  return (this.setState({type:Camera.Constants.Type.back}))
}
}


render()
 {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null){
      return <View />
    }else if(hasCameraPermission === false ){
      return <View> <Text>No acces to camera</Text></View>
    }else if (this.state.camera=== false){
    return ( 
        <View style={{flex:1}}>
            <Camera style={{flex:1}}  flashMode={this.state.flashmode}
             faceDetectorSettings={
               {
                 mode: FaceDetector.Constants.Mode.fast,
                 detectLandmarks:FaceDetector.Constants.Mode.all,
                 runClassifications:FaceDetector.Constants.Mode.all,
                 tracking:true,
                 minDetectionInterval:100

               }
             }
             onFacesDetected={this.onFacesDetected}
             onFaceDetectionError={this.onFaceDetectionError}
             type={this.state.type}
              ref={ref=>{this.camera=ref}}>
            <View style={{flex:1, background: 'transparent',flexDirection:'row', }} >
              <TouchableOpacity style={{flex:0.2, alignItems:'center', alignSelf:'flex-end', backgroundColor:'orange'}}  onPress={this.handleFlip} >
                <Text style={{color:'white',marginBottom:10,fontSize:16}}>Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.snap} style={{flex:0.2, alignSelf:"flex-end",alignItems:'center', backgroundColor:'red', alignContent:'space-around'}}>
                <Text style={{color:'white' , marginBottom:10, fontSize:16}}>Capture</Text>
              </TouchableOpacity>
              

             
            </View>
            </Camera>
            
            {!this.state.camera && !!this.state.photo &&
            <View style={{ flex:1 , alignItems:'center' , justifyContent:"center"}}>
              <Image style={{width:300 , height: 600}}
              source={{uri:this.state.photo}}
              style={{width:300 , height :300}}
              
              />
            </View>
            }
            
       </View>
     

     );
  }
 }


export default App;
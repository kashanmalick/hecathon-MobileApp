import { useNavigation } from '@react-navigation/native'
import  React,{useState} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,SafeAreaView,ScrollView } from 'react-native'
import Logo from '../assets/Image/LogoKSK.png'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { Authentication } from '../config/firbase/Firebase';
import { db } from '../config/firbase/Firebase';
import {doc,setDoc } from "firebase/firestore"; 
import avtar from '../assets/Image/img.jpg';
// import { storage } from '../firebase';
// import {ref} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedImage, setSelectedImage] = useState('');

    const navigation = useNavigation()

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        if (pickerResult.cancelled === true) {
            return;
          }
        setSelectedImage({localUri: pickerResult.uri})
        console.log(pickerResult);
      };

    const goToLogin = () => {
        navigation.navigate("Login")
    }
    const Register = () => {
        createUserWithEmailAndPassword(Authentication,email,password)
        .then (async(userCredential)=>{
            const user = userCredential.user;
            alert(user.email + " Sucessfully Register")
            await setDoc(doc(db, "Users", user.uid), {
                Email:email,
                password:password,
              });
            
        })
        .catch((error)=>{
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }
    const handleUpload=()=>{
        
    }
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.container} behavior="padding">
                <Image source={Logo} style={{ width: 205, height: 100,marginBottom:10,marginTop:'20%' }} /> 
                <Text style={{fontSize:18,textAlign:'center',fontWeight:'bold',marginTop:'5%',marginBottom:'10%'}}>
                        REGISTER YOUR SELF
                    </Text>
                <Image
                    source={selectedImage.localUri === undefined
                    ? avtar :{uri: selectedImage.localUri}} 
                    style={{width:100,height:100,
                    borderColor:'black',borderWidth:1,borderRadius:80,justifyContent:'center',alignItems:'center'}} 
                 />
                <View style={styles.inputContainer}>

                    <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Pick a photo</Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Enter Email Address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                      
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={Register}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={goToLogin}
                        style={[styles.button,styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Go to Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleUpload}
                        style={[styles.button,styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Upload Image</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'80%',
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:15
    },
    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    },
    button:{
        backgroundColor:'#0782F9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center',
        marginTop:5,
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    buttonOutline:{
        backgroundColor:'white',
        borderColor:'#0782F9',
        borderWidth:2
    },
    buttonOutlineText:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16,
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
      }
})

import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View,Image,SafeAreaView } from 'react-native'
import { Authentication, db } from '../config/firbase/Firebase';
import {signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/Image/LogoKSK.png';
import {doc,getDoc} from "firebase/firestore"; 

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = Authentication.onAuthStateChanged(user =>{
            if(user){
                navigation.navigate("Map")
            }
        })
        return unsubscribe
    },[])
  
    const RegisterUser = () => {
        navigation.navigate("Register")
    }

    const SignIn = () => {
    
        signInWithEmailAndPassword(Authentication,email,password)
        .then((re)=>{
             alert("Sign in Sucessfully")
        })
        .catch((err)=>{
         alert(err)
             console.log(err)
        })
     }
    
     const branchManager = () =>{
         navigation.navigate("BMLogin");
     }

    return (
        
                <SafeAreaView style={styles.container} behavior="padding">
                    <Image source={Logo} style={{ width: 205, height: 100,marginBottom:50 }} /> 
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                        onPress={SignIn}
                        style={styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={RegisterUser}
                        style={[styles.button,styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Register Your Self</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={branchManager}
                        style={[styles.button,styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Login As Branch Manager</Text>
                        </TouchableOpacity>

                    </View>
                {/* </KeyboardAvoidingView> */}
            </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'80%'
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:15,
        // borderWidth:2,
        borderColor:'black',
        borderRadius:10,
        marginTop:10
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
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#0782F9',
        borderWidth:2
    },
    buttonOutlineText:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16,
    },
    
})

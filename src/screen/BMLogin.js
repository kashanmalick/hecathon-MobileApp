import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, SafeAreaView } from 'react-native'
import { db } from '../config/firbase/Firebase';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/Image/LogoKSK.png';
import { docs, getDocs, collection } from "firebase/firestore";


const BMLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")

    const navigation = useNavigation()


    const SignIn = async () => {
        const userCol = collection(db, 'Branch_User');
        const userSnapshot = await getDocs(userCol)
        const userList = userSnapshot.docs.map(doc => doc.data());
        userList.map((v) => {
            setUserEmail(v.Email)
            setUserPass(v.password)
        })
        if (userEmail === email && userPass === password){
            alert("login Sucessfull")
            navigation.replace("BMPage")
        }else{
            alert("login failed")
        }
     }


    const userLogin = () => {
        navigation.navigate("Login");
    }

    return (

        <SafeAreaView style={styles.container} behavior="padding">
            <Image source={Logo} style={{ width: 205, height: 100, marginBottom: 50 }} />
            <View style={styles.inputContainer}>
                <Text style={{ fontWeight: 'bold' }}>Branch Manger Login Screen</Text>
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
                    onPress={userLogin}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>User Login</Text>
                </TouchableOpacity>

            </View>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    )
}

export default BMLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        // borderWidth:2,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 10
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },

})

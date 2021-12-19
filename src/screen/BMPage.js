import React from 'react'
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function BMPage() {


    const navigation = useNavigation()

    const QrPage =()=>{
        navigation.navigate("QR")
    }
    const searchPage = () =>{
        navigation.navigate("Search")
    }
    const LogOut = () =>{
        navigation.navigate("BMLogin")
    }

    return (
            <View style={styles.container}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Welcome  Branch Manager</Text>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                        onPress={QrPage}
                        style={styles.button}
                        >
                            <Text style={styles.buttonText}>Scan By Qr Code</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={searchPage}
                        style={[styles.button,styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Search By User ID</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={LogOut}
                        style={[styles.button,styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
            </View>
    )
}

export default BMPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

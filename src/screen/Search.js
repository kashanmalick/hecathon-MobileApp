import React,{useState} from 'react'
import { View,TextInput,TouchableOpacity,Text,StyleSheet } from 'react-native'

function Search() {
    const [userID,setId]=useState("")
    return (
        <View styles={styles.container}>
            <Text style={{fontSize:40,fontWeight:'bold',textAlign:'center',color:'#0782F9'}}>Search By User ID</Text>
            
            <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Seach By User ID"
                            value={userID}
                            onChangeText={text => setId(text)}
                            style={styles.input}
                        />
                </View>
            <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                        onPress={()=>{}}
                        style={[styles.button,styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Search</Text>
                        </TouchableOpacity>

                    </View>
        </View>
    )
}

export default Search


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
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
})
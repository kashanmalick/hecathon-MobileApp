import React,{useState,useEffect} from 'react';
import { View,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,ScrollView,Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Logo from '../assets/Image/LogoKSK.png';
import { Authentication } from '../config/firbase/Firebase';
import { db } from '../config/firbase/Firebase';
import {doc,setDoc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native'


function UserScreen() {
    const [name, setName] = useState("")
    const [father, setFather] = useState("")
    const [cnicNo, setCnic] = useState("")
    const [contact, setContact] = useState("")
    const [dofissue, setIssue] = useState("")
    const [dofexpirey, setExpirey] = useState("")
    const [mIncome, setMIncome] = useState("")
    // const [dob, setDob] = useState("")
    const [fMember, setFMember] = useState("")
    const navigation = useNavigation()

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Daily 1', value: 'Daily 1'},
        {label: 'Daily 2', value: 'Daily 2'},
        {label: 'Daily 3', value: 'Daily 3'}
    ]);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    //   console.log(currentDate)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    const handleSignOut = () => {
        Authentication
        .signOut()
        .then(()=>{
        navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
    // console.log(date);
    const [myUser,setuser]=useState("")
    useEffect(() => {
        const unsubscribe = Authentication.onAuthStateChanged(user =>{
            setuser(user.uid)
        })
        return unsubscribe
    },[])
    
    const  submitData = async() => {
        console.log(myUser)
        if(myUser){
            await setDoc(doc(db, "UsersData", myUser), {
                Name: name,
                Father_Name: father,
                CNIC: cnicNo,
                DateOFIssue:dofissue,
                DateOfExpirey:dofexpirey,
                Contact: contact,
                MIncome:mIncome,
                FMember:fMember,
                Ration:value,
                DateOfBirth:date,
                Status:"Unverified"
    
              });
              alert("Record Sucessfully added")
              navigation.navigate("Card")
        }else{
            alert("Getting Some Issue")
        }
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container} behavior="padding">
            <Image source={Logo} style={{ width: 200, height: 100,marginBottom:20,marginTop:20 }} /> 
                <Text style={{fontSize:15,fontWeight:'bold'}}>REGISTER YOUR RASHAN PACKAGE</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Father Name"
                    value={father}
                    onChangeText={text => setFather(text)}
                    style={styles.input}
                    
                />
                <TextInput
                    placeholder="CNIC Number"
                    value={cnicNo}
                    onChangeText={text => setCnic(text)}
                    style={styles.input}
                    
                />
                    <TextInput
                        placeholder="Date of Issue"
                        value={dofissue}
                        onChangeText={text => setIssue(text)}
                        style={styles.input}
                        
                    />
                    <TextInput
                        placeholder="Date of Expirey"
                        value={dofexpirey}
                        onChangeText={text => setExpirey(text)}
                        style={styles.input}
                        
                    />
                <TextInput
                    placeholder="Contact Number"
                    value={contact}
                    onChangeText={text => setContact(text)}
                    style={styles.input}
                    
                />
                <TextInput
                    placeholder="Monthly Income"
                    value={mIncome}
                    onChangeText={text => setMIncome(text)}
                    style={styles.input}
                    
                />
                 <TextInput
                    placeholder="Family Member"
                    value={fMember}
                    onChangeText={text => setFMember(text)}
                    style={styles.input}
                    
                />
                <Text style={{fontWeight:'bold'}}>Select Monthly Ration</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                /> 
            </View>
            <View>
        <View style={{marginTop:15}}>
                <TouchableOpacity 
                onPress={showDatepicker}
                style={styles.buttonPicker}
                >
                    <Text style={{color:'white'}}>SELECT DATE OF BIRTH ^</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={submitData}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
            onPress={handleSignOut}
            style={styles.button}
            >
                <Text style={styles.buttonText}> Sign Out</Text>
            </TouchableOpacity>

            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer:{
        width:'80%'
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:15,
        borderWidth:1,
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
        alignItems:'center',
        marginTop:10
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
    buttonPicker:{
        backgroundColor:'#0782F9',
        width:'100%',
        padding:10,
        borderRadius:10,
        // alignItems:'flex-start',
        
    }
  });


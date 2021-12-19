import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg';
import { Authentication } from '../config/firbase/Firebase';
// import { TouchableOpacity } from 'react-native-web';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import {doc,getDoc} from "firebase/firestore"; 
import { db } from '../config/firbase/Firebase';

function Card() {
  let mydata;
  let Name;
  let Fname;
  let cnic;
  let contact;
  let di;
  let de;
  let [UserName,setUserName]=useState();
  let [FatherName,setFname]=useState();
  let [userCNIC,setuserCNIC]=useState();
  let [userContact,setuserContact]=useState();
  let [UserDi,setUserDi]=useState();
  let [UserDe,setUserDe]=useState();
  const [myUser,setuser]=useState("")
  useEffect(() => {
      const unsubscribe = Authentication.onAuthStateChanged(user =>{
          setuser(user.uid)
      })
      return unsubscribe
  },[])

  useEffect(async() => {
      const docRef = doc(db, "UsersData","C8XOI4RlBhPRXZDjqi3NXUCDaw93");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      mydata=docSnap.data()
       Name = mydata.Name;
       Fname = mydata.Father_Name;
       cnic=mydata.CNIC;
       contact=mydata.Contact;
       di=mydata.DateOFIssue;
       de=mydata.DateOfExpirey
      setUserName(Name);
      setFname(Fname)
      setuserCNIC(cnic)
      setuserContact(contact)
      setUserDi(di)
      setUserDe(de)

        console.log("Document data:", di);
      } else {
        console.log("No such document!");
      }
},[Name])


    let Simple= ()=> {
      return <SvgQRCode value={userCNIC} />;
    }
    return (
        <View style={styles.container}>
          <View style={styles.frondcard}>
            <Text style={{fontWeight:'bold',textAlign:'center',marginTop:10}}>KHANA SUB K LIAY</Text>
            <Text>_______________________________________</Text>
            <Text style={styles.frontText}>Name: {UserName}</Text>
            <Text style={styles.frontText}>Father Name: {FatherName}</Text>
            <Text style={styles.frontText}>CNIC NO: {userCNIC}</Text>
            <Text style={styles.frontText}>Contact Number: {userContact}</Text>
            <Text style={styles.frontText}>Date of Issue: {UserDi}</Text>
            <Text style={styles.frontText}>Date of Expirey: {UserDe}</Text>
            <View style={{alignItems:'center',marginTop:10}}>
              <Text style={{textDecorationLine:'underline',fontWeight:'bold'}}>Food Bank Branch Name:</Text>
              <Text>Saylani Gulshan Campus,Near Mumtaz</Text>
              <Text>Mobile Mall Gulshan Chowrangi Karachi</Text>
            </View>
          </View>
          <View style={styles.backcard}>
            <Simple style={styles.brcode} />
            <Text style={{marginTop:20}}>S.NO:______________</Text>
            <Text style={{marginTop:'28%'}}>_____________________</Text>
            <Text style={{marginTop:5}}>Authorized Signature</Text>
          </View>
      </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        // justifyContent:'center',
        alignItems:'center'
    },
    frondcard:{
      borderWidth:1,
      // alignItems:'center'
    },
    frontText:{
      fontWeight:'bold',
      // marginTop:10,
      padding:8
    },
    backcard:{
      marginTop:25,
      borderWidth:1,
      alignItems:'center',
      width:'60%',
      height:'45%',
      paddingTop:'20%'
    }
})
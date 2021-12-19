import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions,TouchableOpacity,Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


function Map() {
    const [myLocation, setLocation] = useState(null);

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("MyLocation==>F", location.coords);
            setLocation(location.coords)

        })();
    }, []);
    // console.log("My Location************",myLocation.latitude)
    const SylaniPoint = [
        {
            id: '1',
            coordinate: {
                latitude: 24.9200172,
                longitude: 67.0612345,
            },
            title: "Aliabad",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '2',
            coordinate: {
                latitude:24.8732834,
                longitude: 67.0337457,
            },
            title: "Numaish chowrangi",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '3',
            coordinate: {
                latitude:24.8278999,
                longitude: 67.0688257,
            },
            title: "Saylani house phase 2",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '4',
            coordinate: {
                latitude:24.8138924,
                longitude: 67.0677652,
            },
            title: "Touheed commercial",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '5',
            coordinate: {
                latitude:24.8949528,
                longitude: 67.1767206,
            },
            title: "Jinnah avenue",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '6',
            coordinate: {
                latitude:24.9132328,
                longitude: 67.1246195,
            },
            title: "Johar chowrangi",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '7',
            coordinate: {
                latitude:24.9100704,
                longitude: 67.1208811,
            },
            title: "Johar chowrangi 2",
            icon: require('../assets/Image/marker.png')
        },
        {
            id: '8',
            coordinate: {
                latitude:24.8673515,
                longitude: 67.0724497,
            },
            title: "Hill park",
            icon: require('../assets/Image/marker.png')
        },
    ]
    let moveNext = () =>{
        navigation.navigate("UserScreen")
    }
    return (
        <View style={styles.container}>
            <MapView showsUserLocation
                style={styles.map}>
                {SylaniPoint.map(marker => (
                    <MapView.Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                    >
                        {/* <Image source={marker.icon} style={{height:20,width:20}}/> */}
                    </MapView.Marker>
                ))}
            </MapView>
            <View style={styles.buttonView}>
                <Text style={{fontWeight:'bold',color:'white'}}>Sylani Center</Text>
                <TouchableOpacity style={styles.button}
                onPress={moveNext}>
                    <Text>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    buttonView:{
        position:'absolute',
        bottom:17,
        backgroundColor:'#1976D2',
        height:'8%',
        width:'65%',
        left:35,
        borderRadius:10,
        alignItems:'center'
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:'40%',
        height:'55%',
        borderRadius:10,
        // marginTop:5,
        // marginLeft:'50%'
    }
})
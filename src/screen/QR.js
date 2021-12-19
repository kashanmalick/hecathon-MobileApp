import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';

function QR() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);


    BarCodeScanner
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return (
        <View style={styles.container}>
            <Text style={{fontSize:40,fontWeight:'bold',textAlign:'center',color:'#0782F9'}}>Scan QR</Text>
                        <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}

export default QR

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        // justifyContent:'center',
        // alignItems:'center'
        },
})
import React from 'react'
import { TouchableOpacity, View ,StyleSheet,Text} from 'react-native-web'

function Button() {
  return (
    <View styles={styles.container}>
      <TouchableOpacity>
        <Text>Click Here</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button

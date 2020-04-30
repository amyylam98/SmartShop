//Documentation:  https://docs.expo.io/versions/latest/sdk/imagepicker/
import * as React from 'react';
import { Button, Text, View, StyleSheet, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class Trip extends React.Component {
  state = {
    image: null,
    total: 0,
  };

  render() {
    let { image } = this.state;

  return (  
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
    <Text style= {styles.otherText}>Attach Receipt</Text>
        <Button title="Take Photo..." onPress={this.pickCamera} />
        <Button title="Choose from Library..." onPress={this.pickImage} />

        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        
    <Text style= {styles.otherText}>Total Cost</Text>
        <TextInput style = {styles.input}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
        <Button
            title = 'Enter'
            onPress={() => this.submitTotal() }
        />
    </View>
    );
  }

  submitTotal() {
    global.custLoc = this.state.total;
    }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Error: Enable camera roll permissions.');
      }
    }
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

    pickCamera = async () => {
    let result = await await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1.0,
     allowsMultipleSelection: true,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#47ba71'
  },
  title: {
    color: 'white',
    fontSize: 50,
    textAlign: "center",
    position:"absolute",
    top:150,
  },
  otherText: {
    color: 'darkgrey',
    fontSize: 25,
  },
  input: {
    height: 27,
    backgroundColor: 'white',
    width:100,
    borderRadius:10
  },
  error:{
    fontSize: 15,
    color: "red"
  }
})

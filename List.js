import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, AsyncStorage } from 'react-native';
import {CheckBox} from 'react-native-elements';

export default class List extends Component {
  state = {
	  items: [
    { text: 'item 1', key: 0, status: false },
    { text: 'item 2', key: 1, status: true },
    { text: 'item 3', key: 2, status: false },
	],
	nextkey: 3,
	replacekey: [],
	newitem: ''
  };
  
  pressHandler = (key) => {
   var arr = this.state.items;
   arr = arr.filter(item => item.key != key);
   var keyarr = [...this.state.replacekey];
   keyarr.push(key);
	this.setState({items: arr});
	this.setState({replacekey: keyarr});
	/*this.updateStorage();*/
  };
  
  switchCheck = (key) => {
	  var arr = this.state.items;
	  var ind = arr.findIndex(item => item.key ==key);
	  arr[ind].status = !this.state.items[ind].status;
	  this.setState({items: arr});
	  /*this.updateStorage();*/ 
  }
  
  handleText = (text) => {
      this.setState({ newitem: text });
   }
  
  submitHandler = (text) => {
	  var t = this.state.newitem;
	  var n;
	  var i = -1;
	  if(this.state.replacekey.length)
	  {
		  i = 1;
		  n = this.state.replacekey[0];
		  var arr = this.state.replacekey;
		  arr.splice(0,1);
		  this.setState({replacekey: arr});
	  }
	  else{
		  n = this.state.nextkey;
	  }
      var arr = [...this.state.items];
	  arr.push({text: t, key: n, status: false});
	  this.setState({items: arr});
	  if(i != 1){  
		  n = n+1;
		this.setState({nextkey: n});
	  }
	  this.setState({newitem: ''});
	  /*this.updateStorage();*/
  };
  
  async updateStorage() {
	  await AsyncStorage.setItem("ItemList", JSON.stringify(this.state.items));
	  await AsyncStorage.setItem("NextKey", this.state.nextkey);
	  await AsyncStorage.setItem("KeyArr", JSON.stringify(this.state.replacekey));
	  
  };
  
  async componentDidMount() {
	  //Alert.alert("App is going to check if there is anything in storage");
	  //await asyncStorage.clear();
	  /*if( await AsyncStorage.getItem("ItemList") != null)
	  {
		Alert.alert("app is about to try to fetch from async");
		var arr = await AsyncStorage.getItem("ItemList");
		var parsed_arr = JSON.parse(arr);
		var nkey = await AsyncStorage.getItem("NextKey");
		var keyarr = await AsyncStorage.getItem("KeyArr");
		var parsed_keyarr = JSON.parse(keyarr);
		this.setState({items: parsed_arr});
		this.setState({nextkey: nkey});
		this.setState({replacekey: parsed_keyarr});
	  } */
	  
  }; 
	  
  
  render() {
  return (
	  <View style={styles.container}>
		<View style={styles.content}>
		  <TextInput placeholder="Enter Item" onChangeText= {this.handleText} value={this.state.newitem}/>
		  <Button title='Add Item' onPress={this.submitHandler}/>
		  <FlatList 
			  data={this.state.items}
			  renderItem={({ item }) => (
						<ListEntry item={item} pressHandler={this.pressHandler} switchCheck={this.switchCheck}/>
			  )}
			  extraData={this.state}
				/>
		</View>
	  </View>
  );}
}

class ListEntry extends Component{
	render(){
		return(
			<View style={styles.item}>
			<CheckBox checked={this.props.item.status} onPress={() => this.props.switchCheck(this.props.item.key)}/>
			<Text>{this.props.item.text}	</Text>
			<Button title='X' onPress={() => this.props.pressHandler(this.props.item.key)}/>
			</View>
		)
		
	}
	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 10,
  },
  item: {
	flex: 1,
	flexDirection: 'row',
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  }
});


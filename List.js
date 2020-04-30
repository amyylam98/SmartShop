import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, AsyncStorage } from 'react-native';
import {CheckBox} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';


export default class App extends Component {
  state = {
	  items: [
	{ text: 'soy sauce', key: 0, status: false },
    { text: 'pepper', key: 1, status: true },
    { text: 'milk', key: 2, status: false },
	],
	nextkey: 3,
	newitem: '',
	recommendations: [],
	recDb: require('./recommendations.json'),
	isDialogVisible: false,
	headername: ''
  };
  
  pressHandler = (key) => {
   var arr = this.state.items;
   arr = arr.filter(item => item.key != key);
	this.setState({items: arr});
  };
  
  switchCheck = (key) => {
	  var arr = this.state.items;
	  var ind = arr.findIndex(item => item.key ==key);
	  arr[ind].status = !this.state.items[ind].status;
	  this.setState({items: arr});
	  this.updateStorage();
  }
  
  handleText = (text) => {
      this.setState({ newitem: text });
   }
  
  submitHandler = (text) => {
	  var t = this.state.newitem;
	  var n;
	  var i = -1;
	  n = this.state.nextkey;
      var arr = [...this.state.items];
	  arr.push({text: t, key: n, status: false});
	  this.setState({items: arr});
	  n = n+1;
	  this.setState({nextkey: n});
	  this.setState({newitem: ''});
  };
  
  getRecs = () => {
	  var listOfFoods = [];
	  var recDb = this.state.recDb;
	  for( const item of this.state.items)
	  {
		  var i = item.text;
		  i = i.toLowerCase();
		  listOfFoods.push(i);
	  }
	  listOfFoods.sort();
	  var combos = []
		for (let i = 0; i < listOfFoods.length; i++) {
			for (let j = i + 1; j < listOfFoods.length; j++) {
				combos.push(listOfFoods[i] + ',' + listOfFoods[j])
			}
		}
		// Union all recs from DB
		var recs = new Set()
		for (let c of combos) {
			if (recDb[c]) {
				for (let rec of recDb[c]) {
					recs.add(rec)
				}
			}
		}
		var arr = [];
		arr = Array.from(recs).filter(r => !listOfFoods.includes(r)).sort();
		var arr2 = [];
		var keyc = 0;
		for( const item of arr)
		{
			arr2.push({text: item, key: keyc});
			keyc++;
		}
		this.setState({recommendations: arr2});
  }
  
  recSubmitHandler = (key) => {
	  var arr = this.state.recommendations;
	  var ind = arr.findIndex(item => item.key ==key);
	  var x = arr[ind].text;
	  var t = x;
	  var n;
	  var i = -1;
	  n = this.state.nextkey;
      var arr = [...this.state.items];
	  arr.push({text: t, key: n, status: false});
	  this.setState({items: arr});
	  n= n+1;
	  this.setState({nextkey: n});
	  //delete rec in rec list since its in main list
	  var arr3 = this.state.recommendations;
	   arr3 = arr3.filter(item => item.key != key);
		this.setState({recommendations: arr3});
  };
  
  recDeleteHandler = (key) => {
	   var arr = this.state.recommendations;
	   arr = arr.filter(item => item.key != key);
		this.setState({recommendations: arr});
  };
	  
  
  async updateStorage() {
	  var arr1 = this.state.items;
	  await AsyncStorage.setItem("ItemList", JSON.stringify(arr1));
	  await AsyncStorage.setItem("NextKey", this.state.nextkey.toString());
	  await AsyncStorage.setItem("Header", this.state.headername);
  };
  
  sendInput = (input) => {
	  this.setState({headername: input});
	  this.setState({isDialogVisible: false});
  }
  
  async componentDidMount() {
	  //this.setState({isDialogVisible: true});
	  //await AsyncStorage.clear();
	  if( await AsyncStorage.getItem("ItemList") != null)
	  {
		//this.setState({isDialogVisible: true});
		var arr = await AsyncStorage.getItem("ItemList");
		var parsed_arr = JSON.parse(arr);
		var nkey = await AsyncStorage.getItem("NextKey");
		var nkey_parsed = parseInt(nkey, 10);
		var title = await AsyncStorage.getItem("Header");
		this.setState({items: parsed_arr});
		this.setState({nextkey: nkey_parsed});
		this.setState({headername: title});
	  }
	  else
	  {
		  this.setState({isDialogVisible: true});
		  
	  }
  }; 
	  
  render() {
  return (
	  <View style={styles.container}>
	  <DialogInput isDialogVisible={this.state.isDialogVisible}
					title={"New List"}
					message={"Input name of new list"}
					submitInput={ (inputText) => {this.sendInput(inputText)}}
					closeDialog={ () => {this.setState({isDialogVisible: false})}}
					>
		</DialogInput>
		<View style={styles.header}>
		<Text style={styles.title}>{this.state.headername}</Text>
		</View>
		<View style={styles.content}>
		  <TextInput placeholder="Enter Item" onChangeText= {this.handleText} value={this.state.newitem}/>
		  <Button title='Add Item' onPress={this.submitHandler}/>
		  <Text></Text>
		  <Button title='Save List' onPress={this.updateStorage.bind(this)}/>
		  <FlatList 
				 data={this.state.items}
				 renderItem={({ item }) => (
					<ListEntry item={item} pressHandler={this.pressHandler} switchCheck={this.switchCheck}/>
				 )}
				 extraData={this.state}
				 keyExtractor={(item, index) => index.toString()}
				/>
			<Text>Recommendations:</Text>
			<FlatList
				data={this.state.recommendations}
				renderItem={({item }) => (
					<RecEntry item={item} recSubmitHandler={this.recSubmitHandler} recDeleteHandler={this.recDeleteHandler}/>
				)}
				extradata={this.state}
				keyExtractor={item => item.key.toString()}
				/>
			<Button title='Get Recommendations' onPress={this.getRecs}/>
			<Text></Text>
		</View>
	  </View>
  );}
}

class ListEntry extends Component{
	render(){
		return(
			<View style={styles.item}>
			<CheckBox checked={this.props.item.status} onPress={() => this.props.switchCheck(this.props.item.key)}/>
			<Text>{this.props.item.text}</Text>
			<Button title='X' onPress={() => this.props.pressHandler(this.props.item.key)}/>
			</View>
		)
	}
}

class RecEntry extends Component{
	render(){
		return(
			<View style={styles.item}>
			<Text>{this.props.item.text}</Text>
			<Button title='Y' onPress={() => this.props.recSubmitHandler(this.props.item.key)}/>
			<Button title='N' onPress={() => this.props.recDeleteHandler(this.props.item.key)}/>
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
    marginTop: 10,
	marginBottom: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  },
  header: {
	  height: 60,
	  paddingTop: 30,
	  
  },
  title: {
	  textAlign: 'center',
	  fontSize: 20,
	  fontWeight: 'bold'
	  
  }
});
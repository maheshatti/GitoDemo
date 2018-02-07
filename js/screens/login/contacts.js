import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  BackAndroid,
  BackHandler,
  Image,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import {
  RkStyleSheet,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import {Avatar} from '../../components';
import {FontAwesome} from '../../assets/icons';
let moment = require('moment');
var memberslength;
var wsmembers=[];
var chats;

export class Contacts extends React.Component {
  static navigationOptions = {
    title: 'Contacts List'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.renderHeader = this._renderHeader.bind(this);
    this.renderItem = this._renderItem.bind(this);
    this.state = {
      data: [],
      
    }
debugger

  }

  componentDidMount() {
    this._loadInitialState().done();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  onBackPress () {
      
   if(this.props.navigation.state.routeName == "Contacts"){
     BackHandler.exitApp();
     return true;
   }

    return true;
  }
  _filter(text) {
    let pattern = new RegExp(text, 'i');
    let chats = _.filter(this.chats, (chat) => {

      if (chat.name.search(pattern) != -1 || chat.text.search(pattern) != -1)
        return chat;
    });

    this.setState({data: chats});
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }


  _loadInitialState = async () => {
    debugger
    try{
      var url ='https://reqres.in/api/users?page=0';
      
      fetch(url, {
          method: 'Get',
           headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With"
  },
})
          .then((response) => response.json())
          .then((responseJson) => {
              //console.log(responseJson);
              var valuejson = responseJson;
              wsmembers = [];           
              var data = responseJson.data;    
              debugger
          for (var k = 0; k <data.length; k++) {
                 
                      var contactID = data[k].id;
                      var WFirstName = data[k].first_name;
                      var WLastName = data[k].last_name;
                      var image = data[k].avatar;

                      var FirstName, LastName;
                          if (WFirstName!=null && WLastName!=null) {
                               Name = WFirstName + " " + WLastName;
                          } 
                
                      var membersdata = {
                          "name": Name,
                          "id": contactID,
                          "image":image,
                          "text":"Hello My dear",
                    }
                      wsmembers.push(membersdata);
                    
              }          
              this.chats=wsmembers;   
              this.setState({
      data: this.chats,
      animating: true 
     });
    

          })
          .catch((error) => {
              console.error(error);
          });


}catch(error){
console.log(error)
}
  }
  _renderHeader() {
    return (
      
        <RkTextInput autoCapitalize='none'
                     autoCorrect={false}
                     onChange={(event) => this._filter(event.nativeEvent.text)}
                     label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
                     rkType='row'
                     placeholder='Search here'/>
    )
  }

  _renderItem(info) {
    let name = `${info.item.name}`;
    let message ="Haihow you";
    let last = message[message - 1];
    var pimage = info.item.image; 

    debugger
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {"user": info})}>
        <View style={styles.container}>
          <Avatar rkType='circle' style={styles.avatar} img={pimage}/>
          <Image source={{ uri: pimage}} style={styles.photo} />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{name}</RkText>
              <RkText rkType='secondary4 hintColor'>
                {moment().add(2, 'seconds').format('LT')}
              </RkText>
            </View>
            <RkText numberOfLines={2} rkType='primary3 mediumLine'>{info.item.text}</RkText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}/>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  searchContainer: {
    backgroundColor: theme.colors.border.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,

    flexDirection: 'row'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
}));
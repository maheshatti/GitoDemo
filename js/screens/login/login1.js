import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ToastAndroid,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
console.disableYellowBox = true;
export class LoginV1 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password:''
    }
  }

  _renderImage(image) {

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image]}
                      source={require('../../assets/images/download.png')}/>);
    else
      image = (<Image style={[styles.image]}
                      source={require('../../assets/images/download.png')}/>);
    return image;
  }

onSubmitLogin(){
  var uname = this.state.username;
  var password = this.state.password;
 
  if (uname.length<=0) {
    ToastAndroid.show("please enter email",ToastAndroid.SHORT);
      }  
      else if(password.length<=0){
        ToastAndroid.show("please enter password",ToastAndroid.SHORT);
        
      }
  else {
      fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Requested-With"
      },
      body: JSON.stringify({
        email: uname,
        password: password
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
  
        if(responseJson.token){
        this.props.navigation.navigate('List');
        }
      else{
           ToastAndroid.show('Something went wrong',ToastAndroid.SHORT);
      }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

  render() {
    let image = this._renderImage();
    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}
        <View style={styles.container}>
          <RkTextInput rkType='rounded'
          ref="username"
           placeholder='Username'
            inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onChange={(event) => this.setState({ username: event.nativeEvent.text })}/>
          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} 
          inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType={'go'}
            onChange={(event) => this.setState({ password: event.nativeEvent.text })}/>
          <RkButton onPress={this.onSubmitLogin.bind(this)} rkType='large' style={styles.save}>LOGIN</RkButton>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('Second')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginVertical: scaleVertical(27),
    height: scaleVertical(77),
    resizeMode: 'contain'
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));
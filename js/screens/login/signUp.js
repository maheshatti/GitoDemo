import React from 'react';
import {
  View,
  Image,
  Keyboard,
  ToastAndroid
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';

export class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Create Account'.toUpperCase()
  };

  constructor(props) {
    super(props);
  this.state={
    firstname:'',
    lastname:'',
    username:'',
    Password:'',
    email:''
  }
  }

onSubmitregister(){
  var fname = this.state.firstname;
  var lname =this.state.lastname;
  var email = this.state.email;
  var uname = this.state.username;
  var pass = this.state.Password;

debugger
  if (email.length == 0 ) {
    ToastAndroid.show("please enter email",ToastAndroid.SHORT);
      } else if(pass.length==0){

     ToastAndroid.show("please enter email",ToastAndroid.SHORT);
      } 
  else {
      fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Requested-With"
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
  

        this.props.navigation.navigate('First');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

  render() {
    
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={styles.content}>
          <View>
          
            <RkTextInput rkType='rounded' placeholder='FirstName'  inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onChange={(event) => this.setState({ firstname: event.nativeEvent.text })}/>

            <RkTextInput rkType='rounded' placeholder='LastName'  inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onChange={(event) => this.setState({ lastname: event.nativeEvent.text })}/>

            <RkTextInput rkType='rounded' placeholder='Username'  inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onChange={(event) => this.setState({ username: event.nativeEvent.text })}/>

            <RkTextInput rkType='rounded' placeholder='Email Address' secureTextEntry={true}  inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onChange={(event) => this.setState({ email: event.nativeEvent.text })}/>

            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true}
            inputStyle={{ textAlign: 'center'}}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType={'go'}
            onChange={(event) => this.setState({Password : event.nativeEvent.text })}
            />
            <View style={styles.loginButtonSection}>
            <RkButton  style={styles.loginButton} rkType='large' onPress={this.onSubmitregister.bind(this)}>SIGN UP</RkButton>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('First')}>
                <RkText rkType='header6'> Sign in now </RkText>
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
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 9,
   alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginButtonSection: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
 }
}));
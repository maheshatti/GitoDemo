import React from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {
  RkSwitch,
  FindFriends
} from '../../components';
import {Avatar} from '../../components';
import {FontAwesome} from '../../assets/icons';
var firstName,image;
import {SocialSetting} from '../../components';
export class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: 'Profile Settings'.toUpperCase()
  };

  constructor(props) {
    super(props);
debugger
  fName=this.props.navigation.state.params.user.item.name;
  image=this.props.navigation.state.params.user.item.image;
 
 


    this.state = {
      firstName: fName,
      lastName: 'Mahi',
      email: 'test@gmail.com',
      country: 'India',
      phone: '9900808080',
      sendPush: true,
      twitter: true,
      google: false,
      facebook: false
       }
  }

  render() {
  
    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard>
          <View style={styles.header}>
          <Image source={{ uri: image}} style={styles.photo} />
          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='header6 primary'>INFO</RkText>
            </View>
            <View style={styles.row}>
              <RkTextInput label='First Name'
                           value={this.state.firstName}
                           rkType='right clear'
                           onChangeText={(text) => this.setState({firstName: text})}/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Last Name'
                           value={this.state.lastName}
                           onChangeText={(text) => this.setState({lastName: text})}
                           rkType='right clear'/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Email'
                           value={this.state.email}
                           onChangeText={(text) => this.setState({email: text})}
                           rkType='right clear'/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Country'
                           value={this.state.country}
                           onChangeText={(text) => this.setState({country: text})}
                           rkType='right clear'/>
            </View>
            <View style={styles.row}>
              <RkTextInput label='Phone'
                           value={this.state.phone}
                           onChangeText={(text) => this.setState({phone: text})}
                           rkType='right clear'/>
            </View>

          </View>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='primary header6'>CONNECT YOUR ACCOUNT</RkText>
            </View>
            <View style={styles.row}>
            <RkText rkType='header6'>Send Push Notifications</RkText>
            <RkSwitch style={styles.switch}
                      value={this.state.sendPush}
                      name="Push"
                      onValueChange={(sendPush) => this.setState({sendPush})}/>
          </View>
            <View style={styles.row}>
              <SocialSetting name='Twitter' icon={FontAwesome.twitter} tintColor={RkTheme.current.colors.twitter}/>
            </View>
            <View style={styles.row}>
              <SocialSetting name='Google' icon={FontAwesome.google} tintColor={RkTheme.current.colors.google}/>
            </View>
            <View style={styles.row}>
              <SocialSetting name='Facebook' icon={FontAwesome.facebook} tintColor={RkTheme.current.colors.facebook}/>
            </View>
          </View>
        </RkAvoidKeyboard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 20,
    alignItems: 'center'
  },
}));
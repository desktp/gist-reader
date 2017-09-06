import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import OAuthManager from 'react-native-oauth';


export default class AuthScreen extends Component {
  componentWillMount() {
    const config = {
      github: {
        callback_url: `http://localhost/github`,
        client_id: 'd38f51462899fbf69edb',
        client_secret: 'e1959389be6dba164092011d28353db1afc4c8b7'
      }
    }

    this.manager = new OAuthManager('gistreader')

    this.manager.configure(config);
    // console.log(this.manager);
  }

  login() {
    console.log('login');
    this.manager.authorize('github', {scopes: 'user:email gist'})
      .then((res) => {
        console.log('success');
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Auth Screen!
        </Text>
        <Text style={styles.welcome}>
          
        </Text>
        <Button
          title='Login with Github'
          onPress={() => this.login()}
        />
        <Button 
          title='To Reader >'
          onPress={() => this.props.navigation.navigate('Reader')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
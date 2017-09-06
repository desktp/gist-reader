import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button
} from 'react-native';
import OAuthManager from 'react-native-oauth';

import { login } from '../actions';

class AuthScreen extends Component {
  componentWillMount() {
    const config = {
      github: {
        client_id: 'd38f51462899fbf69edb',
        client_secret: 'e1959389be6dba164092011d28353db1afc4c8b7'
      }
    }

    this.manager = new OAuthManager('gistreader')

    this.manager.configure(config);
  }

  login() {
    this.manager.authorize('github', {scopes: 'user:email gist'})
      .then(res => this.props.login(res))
      .catch(err => this.props.login(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Auth Screen!
        </Text>
        <Text style={styles.welcome}>
          { this.props.error }
        </Text>
        <Button
          title='Login with Github'
          onPress={() => this.login()}
        />
      </View>
    );
  }
}

const styles = {
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
};

const mapStateToProps = ({ app }) => {
  const { error } = app;
  return { error };
}

export default connect(null, { login })(AuthScreen);
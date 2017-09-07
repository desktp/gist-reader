import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ActivityIndicator, UIManager, LayoutAnimation } from 'react-native';
import {
  Text,
  Container,
  Content,
  Button,
  Icon
} from 'native-base';
import OAuthManager from 'react-native-oauth';

import { login, loggingIn } from '../actions';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const gistreader = require('../assets/images/gistreader.png');

class AuthScreen extends Component {
    // static navigationOptions = {
  //   header: {
  //     visible: false,
  //   }
  // }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

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

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  login() {
    this.manager.authorize('github', {scopes: 'gist'})
      .then(res => {
        this.props.loggingIn();
        this.props.login(res);
      })
      .catch(err => this.props.login(err));
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <ActivityIndicator animating={this.props.loading} />
      );
    }

    return (
      <Button
        block
        onPress={() => this.login()}
        iconLeft
        dark
      >
        <Icon name='logo-github' />
        <Text>Login with GitHub</Text>
      </Button>
    );
  }

  render() {
    console.log(`loading: ${this.props.loading}`);

    return (
      <Container style={styles.container}>
        <Content>
          <Image source={gistreader} style={styles.logo} />
          { this.renderButton() }
          <Text style={styles.welcome}>
            { this.props.error }
          </Text>
        </Content>
      </Container>
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
  logo: {
    flexGrow: 1,
    alignItems: 'center',
    height: 150,
    resizeMode: 'contain',
    paddingTop: 300
  }
};

const mapStateToProps = ({ app }) => {
  const { error, loading } = app;
  return { error, loading };
}

export default connect(null, { login, loggingIn })(AuthScreen);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Image } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { readQR } from '../actions/AppActions';

class ReaderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => this.props.readQR(e, this.props.credentials)}
          topContent={
            <View>
              <Image 
                source={{ uri: this.props.user.avatar_url }} 
                style={styles.thumbnail}
              />
              <Text style={styles.welcome}>
                { this.props.user && `Logged in as ${this.props.user.login}` }
              </Text>
            </View>
          }
          bottomContent={
            <View>
              <Text>{ this.props.error }</Text>
              <Button 
                title='< To Auth'
                onPress={() => this.props.navigation.navigate('Auth')}
              />
            </View>
          }
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
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 100
  }
};

const mapStateToProps = ({ app }) => {
  const { user, error, credentials } = app;

  return { user, error, credentials };
}

export default connect(mapStateToProps, { readQR })(ReaderScreen);

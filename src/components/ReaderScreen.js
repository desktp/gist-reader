import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, Image, UIManager, LayoutAnimation } from 'react-native';
import { Icon } from 'native-base';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { readQR } from '../actions/AppActions';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


class ReaderScreen extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => this.props.readQR(e, this.props.credentials)}
          cameraStyle={styles.container}
          showMarker
          fadeIn
          reactivate={this.props.isScanActive}
        />
        <View style={styles.loginInfo}>
          <Image 
            source={{ uri: this.props.user.avatar_url }} 
            style={styles.thumbnail}
          />
          <Text style={styles.text}>
            { this.props.user && `Logged in as ${this.props.user.login}` }
          </Text>
        </View> 
        <View style={styles.gistInfo}>
          
          {
            this.props.error 
            ? 
            <Text style={{...styles.text, ...styles.error}}>
              {this.props.error}
            </Text> 
            : this.props.isScanActive ?
            <Text style={styles.text}>
              Scan a Gist's QR Code!
            </Text>
            :
            <Text style={{...styles.text, ...  styles.success}}>
              Success <Icon name='checkmark' />
            </Text>

          }
        </View> 
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
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: 'grey',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 100,
    // padding: 10
  },
  loginInfo: {
    // backgroundColor: 'rgba(0,0,255,0)',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 100,  
    position: 'absolute',
    top: 50,
    flexDirection: 'row'
  },
  gistInfo: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'white',
    bottom: 50,
    flexDirection: 'column',
    borderRadius: 100
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  }
};

const mapStateToProps = ({ app }) => {
  const { user, error, credentials, isScanActive } = app;

  return { user, error, credentials, isScanActive };
}

export default connect(mapStateToProps, { readQR })(ReaderScreen);

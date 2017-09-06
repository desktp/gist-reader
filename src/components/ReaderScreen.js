import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { readQR } from '../actions/AppActions';

class ReaderScreen extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => this.props.readQR(e)}
          topContent={
            <Text style={styles.welcome}>
              Reader Screen!
            </Text>
          }
          bottomContent={
            <View>
              <Button 
                title='< To Auth'
                onPress={() => this.props.navigation.navigate('Auth')}
              />
              <Button 
                title='To Gist >'
                onPress={() => this.props.navigation.navigate('Gist')}
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};

const mapStateToProps = ({ app }) => {
  const { gist } = app;
  return { gist };
}

export default connect(mapStateToProps, { readQR })(ReaderScreen);

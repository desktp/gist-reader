import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

class GistScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Gist Screen!
        </Text>
        <Text style={styles.welcome}>
          Gist: { JSON.stringify(this.props.gist) }
        </Text>
        <Button 
          title='< To Reader'
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

const mapStateToProps = ({ app }) => {
  const { gist } = app;
  return { gist };
};

export default connect(mapStateToProps, null)(GistScreen);
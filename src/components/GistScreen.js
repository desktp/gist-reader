import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, ActivityIndicator } from 'react-native';
import { 
  Container, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Button, 
  Icon, 
  Left,
  Right, 
  Body,
  Item,
  Input,
  ListItem
} from 'native-base';

import { inputChanged, submitComment } from '../actions';

class GistScreen extends Component {
  onInputChange(text) {
    this.props.inputChanged(text);
  }

  submitComment() {
    this.props.submitComment(this.props.comment, this.props.credentials, this.props.gist.id, this.props.gist.comments_url);
  }

  renderFiles(files) {
    return Object.keys(files).map(file => (
      <CardItem key={file}>
        <Body>
          <ListItem>
            <Icon name='ios-document-outline' />
            <Text style={styles.gistFileName}>
              { file }
            </Text>
          </ListItem>
          <ListItem>
            <Text style={styles.gistContent}>{ files[file].content }</Text>
          </ListItem>
        </Body>
      </CardItem>
    ));
  }

  render() {
    if (!this.props.gist) {
      return <View />
    }

    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.props.gist.owner.avatar_url}} />
                <Body>
                  <Text>{ this.props.gist.description }</Text>
                  <Text note>{ this.props.gist.owner.login }</Text>
                </Body>
              </Left>
            </CardItem>
            { this.renderFiles(this.props.gist.files) }
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>{ this.props.gist.comments } comments</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Item regular>
                <Input 
                  placeholder='Leave a comment...' 
                  onChangeText={this.onInputChange.bind(this)}
                />
              </Item>
            </CardItem>
            <CardItem>
              { this.props.loading &&
                <ActivityIndicator />
              }
              { !this.props.loading &&
                <Button 
                  success 
                  style={styles.button}
                  onPress={() => this.submitComment()}
                >
                  <Text>Comment</Text>
                </Button>
              }
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  gistFileName: {
    color: '#87838B'
  },
  gistContent: {
    fontFamily: 'Consolas',
    fontSize: 14
  },
  button: {
    alignSelf: 'flex-end'
  }
};

const mapStateToProps = ({ app }) => {
  const { gist, user, comment, credentials, loading } = app;
  return { gist, user, comment, credentials, loading };
};

export default connect(mapStateToProps, { inputChanged, submitComment })(GistScreen);
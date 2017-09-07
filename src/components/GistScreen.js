import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, ActivityIndicator, UIManager, LayoutAnimation    } from 'react-native';
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
  ListItem,
  Header,
  Title
} from 'native-base';

import { inputChanged, submitComment } from '../actions';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class GistScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Gist Details',
  });

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  onInputChange(text) {
    this.props.inputChanged(text);
  }

  submitComment() {
    this.props.submitComment(this.props.comment, this.props.credentials, this.props.gist.id, this.props.gist.comments_url);
  }

  renderFiles(files) {
    return Object.keys(files).map(file => (
      <View key={file}>
        <CardItem style={styles.gistFile}>
          <Left>
            <Icon name='ios-document-outline' />
            <Text style={styles.gistFileName}>
              { file }
            </Text>
          </Left>
        </CardItem>
        <CardItem>
          <Body style={{ flexGrow: 1 }}>
            <Text style={styles.gistContent}>{ files[file].content }</Text>
          </Body>
        </CardItem>
      </View>
    ));
  }

  renderComments(comments) {
    return comments.map(comment => (
      <Card key={comment.id}>
        <CardItem header style={styles.commentHeader}>
          <Left>
            <Thumbnail source={{ uri: comment.user.avatar_url }} style={styles.commentAvatar}/>
            <Body>
              <Text>{comment.user.login}</Text>
              <Text note>{comment.created_at}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{ comment.body }</Text>
          </Body>
        </CardItem>
      </Card>
    ));
  }

  render() {
    if (!this.props.gist) {
      return (
        <View style={styles.full}>
          <ActivityIndicator />
        </View>
      );
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
          </Card>

          <Card>
            <CardItem>
              <Item regular>
                <Input 
                  placeholder='Leave a comment...' 
                  onChangeText={this.onInputChange.bind(this)}
                  value={this.props.comment}
                />
              </Item>
            </CardItem>
            <CardItem>
              { this.props.loading &&
                <ActivityIndicator style={{ alignSelf: 'center' }}/>
              }
              { !this.props.loading &&
                <Button 
                  success 
                  // style={styles.button}
                  onPress={() => this.submitComment()}
                >
                  <Text>Comment</Text>
                </Button>
              }
            </CardItem>
          </Card>
          
          { this.renderComments(this.props.gistComments) }

        </Content>
      </Container>
    );
  }
}

const styles = {
  gistFileName: {
    color: 'dodgerblue',
    fontWeight: 'bold'
  },
  gistContent: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: 'grey'
  },
  gistFile: {
    flexGrow: 1, 
  },
  commentAvatar: {
    width: 35,
    height: 35
  },
  commentHeader: {
    padding: 10
  },
  full: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: 'black'
  }
};

const mapStateToProps = ({ app }) => {
  const { gist, user, comment, credentials, loading, gistComments } = app;
  return { gist, user, comment, credentials, loading, gistComments };
};

export default connect(mapStateToProps, { inputChanged, submitComment })(GistScreen);
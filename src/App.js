import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

// import RootNavigator from './navigation/RootNavigator';

import routes from './navigation/config/routes';
import getStore from './store';

const RootNavigator = StackNavigator(routes, {
	headerMode: 'none'
});

// Set Navigation Reducer
const NavigationReducer = (state, action) => {
    const newState = RootNavigator.router.getStateForAction(action, state);
    return newState || state;
};

class RootNav extends Component {
	render() {
		return(
			<RootNavigator
				navigation={addNavigationHelpers({
					dispatch: this.props.dispatch,
					state: this.props.nav
				})}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const RootNavWithState = connect(mapStateToProps)(RootNav);

const store = getStore(NavigationReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<RootNavWithState />
      </Provider>
    );
  }
}

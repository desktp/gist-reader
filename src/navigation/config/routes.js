import AuthScreen from '../../components/AuthScreen';
import ReaderScreen from '../../components/ReaderScreen';
import GistScreen from '../../components/GistScreen';

export default routes = {
	Auth: { screen: AuthScreen, path: 'github' },
	Reader: { screen: ReaderScreen },
	Gist: { screen: GistScreen },
};

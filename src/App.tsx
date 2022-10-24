import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { UIDReset } from 'react-uid';
import { renderRoutes } from 'react-router-config';
import routeConfig from './app/router/routeConfig';
import { Provider } from 'react-redux';
import createAppStore from './app/redux/createAppStore';
import { BrowserRouter } from 'react-router-dom';

const App = (): JSX.Element => {
  const history = createBrowserHistory();
  // const store = createAppStore({
  //   history,
  // });

  return (
    <BrowserRouter>
      <UIDReset>
        {renderRoutes(routeConfig())}
      </UIDReset>
    </BrowserRouter>
  )
}

export default App;

import { UIDReset } from 'react-uid';
import { renderRoutes } from 'react-router-config';
import routeConfig from './app/router/routeConfig';
import { BrowserRouter } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <UIDReset>
        {renderRoutes(routeConfig())}
      </UIDReset>
    </BrowserRouter>
  )
}

export default App;

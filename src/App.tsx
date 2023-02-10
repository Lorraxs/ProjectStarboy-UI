import { Provider } from 'react-redux';
import { store } from './store';
import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { cRequest } from './utils/request';
import pages from './page';
import { SettingsConsumer, SettingsProvider } from './@core/context/settingsContext';
import ThemeComponent from './@core/theme/ThemeComponent';
import Page from './page';


const request = new cRequest()

function App() {

  useEffect(() => {
    request.post('Ready')
  }, [])
  

  return (
    <Provider store={store}>
      <SettingsProvider>
        <SettingsConsumer>
          {({settings})=>{
            console.log(settings)
            return(
              <ThemeComponent settings={settings}>
                <Page />
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>

      </SettingsProvider>
    </Provider>
  );
}

export default App;

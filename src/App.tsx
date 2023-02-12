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
import toast, { Toaster } from 'react-hot-toast';
import { INUINotificationMessage } from './shared/interfaces';
import MessageIcon from '@mui/icons-material/Message';
import { Grid } from '@mui/material';

const request = new cRequest()

function App() {

  useEffect(() => {
    request.post('Ready')
  }, [])
  
  useEffect(() => {
    toast((t)=>{
      return <Grid container alignItems={'center'}>
        <Grid xs={2} item>
          <MessageIcon/>
        </Grid>
        <Grid xs={10} item>
          asdasdasdasdasdsd asdasd asd asdasd asd asd 
        </Grid>
      </Grid>
    }, {
      duration: 5000
    })
    const messageHandler = (e: MessageEvent<INUINotificationMessage>) => {
      const component = e.data.component;
      const type = e.data.type;
      const message = e.data.message;
      if (component !== "Notification") return;
      switch (type) {
        case "success":
          return toast
        case "error":
          return toast;
        case "warning":
          return toast;
        case "info":
          return toast;
        default:
          break;
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <SettingsProvider>
        <SettingsConsumer>
          {({settings})=>{
            console.log(settings)
            return(
              <ThemeComponent settings={settings}>
                <Page />
                <Toaster />
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>

      </SettingsProvider>
    </Provider>
  );
}

export default App;

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
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';

const request = new cRequest()

function App() {

  useEffect(() => {
    request.post('Ready')
  }, [])
  
  useEffect(() => {
    toast.custom((t)=>{
      setTimeout(()=>toast.dismiss(t.id), 1000)
      return <Grid 
        container 
        alignItems={'center'} 
        sx={{
          bgcolor: '#1f1f1f', 
          color: 'white', 
          maxWidth: '25%', 
          width:'auto',
          borderRadius: '1vw',
          px: 5,
          py: 2,
          border: '1px solid #0BFF33'
        }}
      >
        <Grid xs={1} item sx={{
          color: '#0BFF33'
        }}>
          <CheckCircleIcon/>
        </Grid>
        <Grid xs={1} item/>
        <Grid xs={10} item>
          {'Chào mừng bạn đến với ProjectStarboy'} 
        </Grid>
      </Grid>
    }, {
      duration: 5000
    })
    const messageHandler = (e: MessageEvent<INUINotificationMessage>) => {
      const component = e.data.component;
      if (component !== "Notification") return;
      const type = e.data.type;
      const message = e.data.message;
      const duration = e.data.duration || 5000;
      switch (type) {
        case "success":
          return toast.custom((t)=>{
            setTimeout(()=>toast.dismiss(t.id), duration)
            return <Grid 
              container 
              alignItems={'center'} 
              sx={{
                bgcolor: '#1f1f1f', 
                color: 'white', 
                maxWidth: '25%', 
                width:'auto',
                borderRadius: '1vw',
                px: 5,
                py: 2,
                border: '1px solid #0BFF33'
              }}
            >
              <Grid xs={1} item sx={{
                color: '#0BFF33'
              }}>
                <CheckCircleIcon/>
              </Grid>
              <Grid xs={1} item/>
              <Grid xs={10} item>
                {message} 
              </Grid>
            </Grid>
          }, {
            duration: duration
          })
        case "error":
          return toast.custom((t)=>{
            setTimeout(()=>toast.dismiss(t.id), duration)
            return <Grid 
              container 
              alignItems={'center'} 
              sx={{
                bgcolor: '#1f1f1f', 
                color: 'white', 
                maxWidth: '25%', 
                width:'auto',
                borderRadius: '1vw',
                px: 5,
                py: 2,
                border: '1px solid #FF0B2F'
              }}
            >
              <Grid xs={1} item sx={{
                color: '#FF0B2F'
              }}>
                <ErrorIcon/>
              </Grid>
              <Grid xs={1} item/>
              <Grid xs={10} item>
                {message} 
              </Grid>
            </Grid>
          }, {
            duration: duration
          });
        case "warning":
          return toast.custom((t)=>{
            setTimeout(()=>toast.dismiss(t.id), duration)
            return <Grid 
              container 
              alignItems={'center'} 
              sx={{
                bgcolor: '#1f1f1f', 
                color: 'white', 
                maxWidth: '25%', 
                width:'auto',
                borderRadius: '1vw',
                px: 5,
                py: 2,
                border: '1px solid #FDBE42'
              }}
            >
              <Grid xs={1} item sx={{
                color: '#FDBE42'
              }}>
                <WarningIcon/>
              </Grid>
              <Grid xs={1} item/>
              <Grid xs={10} item>
                {message} 
              </Grid>
            </Grid>
          }, {
            duration: duration
          });
        case "info":
          return toast.custom((t)=>{
            setTimeout(()=>toast.dismiss(t.id), duration)
            return <Grid 
              container 
              alignItems={'center'} 
              sx={{
                bgcolor: '#1f1f1f', 
                color: 'white', 
                maxWidth: '25%', 
                width:'auto',
                borderRadius: '1vw',
                px: 5,
                py: 2,
                border: '1px solid #26C6F9'
              }}
            >
              <Grid xs={1} item sx={{
                color: '#26C6F9'
              }}>
                <InfoIcon/>
              </Grid>
              <Grid xs={1} item/>
              <Grid xs={10} item>
                {message} 
              </Grid>
            </Grid>
          }, {
            duration: duration
          });
        default:
          break;
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
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

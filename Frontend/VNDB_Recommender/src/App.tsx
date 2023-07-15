import './App.css';
import { MantineProvider } from '@mantine/core';
import LandingPage from './pages/LandingPage';
import HeaderBar from './components/HeaderBar';
import { useState } from 'react';
import Search from './pages/Search';

//TODO: Search VN Page
//      Firebase Sign Up
//      Firebase Log In
//      Firebase Account Management
//      Unlock filter options with verified account

function App() {
  const [uid, setUID] = useState(-1);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{colorScheme: 'dark'}}
    >
      <HeaderBar/>
      {uid < 0 ? <LandingPage onSearch={setUID}/> : <Search ReturnCallback={()=>{setUID(-1)}} uid={uid}/>}
    </MantineProvider>
  )
}

export default App
import './App.css';
import { MantineProvider } from '@mantine/core';
import LandingPage from './pages/LandingPage';
import HeaderBar from './components/HeaderBar';
import { auth } from './api/firebase';

//TODO: Search VN Page
//      Firebase Sign Up
//      Firebase Log In
//      Firebase Account Management
//      Unlock filter options with verified account

function App() {

  const user = auth.currentUser;
  console.log(user);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{colorScheme: 'dark'}}
    >
      <HeaderBar/>
      <LandingPage/>
    </MantineProvider>
  )
}

export default App
import './App.css';
import { MantineProvider } from '@mantine/core';
import LandingPage from './pages/LandingPage';
import HeaderBar from './components/HeaderBar';
import { useState } from 'react';
import Search from './pages/Search';
import { GetRecommendationsProps } from './api/main';

/*
Todo:
  Search Page and Functionality
  Skeleton on Search Results
  Skeleton To Hide Initial Account Load
  Make UI Prettier If Needed
*/

function App() {
  const [search, setSearch] = useState<GetRecommendationsProps>();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{colorScheme: 'dark'}}
    >
      <HeaderBar ReturnToHomepage={()=>{setSearch(undefined)}}/>
      {typeof search === "undefined" ? 
      <LandingPage onSearch={setSearch}/> : 
      <Search ReturnCallback={()=>{setSearch(undefined)}}
        req={search}
        />
      }
    </MantineProvider>
  )
}

export default App
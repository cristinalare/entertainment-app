import './App.css';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Homepage/Home';
import {Routes, Route, Switch} from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import HomeTemplate from './components/HomeTemplate/HomeTemplate';


function App() {
  return (
    <div>
      <Navigation />
      <main>
        
        <Routes>
         
          <Route path=":type" element={<HomeTemplate />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />}/>
          </Route>
          
          <Route path="/" element={<HomeTemplate />} >
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

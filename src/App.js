import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import ScreenPage from './screens/ScreenPage';
import Home from './screens/Home'
import Collections from './screens/Collections'
import Details from './components/Details';
import ThreedModel from './screens/ThreedModel';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
              <Routes>
                      <Route path='/' element={<ScreenPage/>}>
                          <Route path='/' element ={<ThreedModel/>}/>
                          <Route path='/home' element={<Home/>}/>
                          <Route path='/collection' element={<Collections/>}/>
                          <Route path='/collections/:id' element={<Details/>}/>
                          <Route path='/crypto' element={<ThreedModel/>}/>
                      </Route>
                      
              </Routes>
           
      </BrowserRouter>
    </div>
  );
}

export default App;

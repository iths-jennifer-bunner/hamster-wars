import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link,  NavLink }from 'react-router-dom';
import Start from './components/Start';
import Battle from './components/Battle';
import Stats from './components/Stats';
import Upload from './components/Upload';
import Matchup from './components/Matchup';
import Catalouge from './components/Catalouge'

function App() {
    return (
        <div className='wrapper'>
        <Router>
            <Switch>
                <Route path="/">
                <header className="App-header">
                    <h1 >Fab Hamster Wars</h1>
                    <nav>
                        <Link to='/'>Start</Link>
                        <NavLink to='/battle' activeClassName='active'>Battle</NavLink>
                        <NavLink to='/stats' activeClassName='active'>Stats</NavLink>
                        <NavLink to='/upload' activeClassName='active'>Upload</NavLink>
                        <NavLink to='/catalouge' activeClassName='active'>Catalouge</NavLink>
                    </nav>
                </header>
                </Route>
            </Switch>
            <main>
                <Switch>
                    <Route path='/battle/:id1/:id2' ><Battle /></Route>
                    <Route path='/battle' ><Battle /></Route>
                    <Route path='/stats'><Stats /></Route>
                    <Route path='/upload'><Upload /></Route>
                    <Route path='/catalouge'><Catalouge /></Route>
                    <Route path='/matchup/:winner/:looser'><Matchup /></Route>
                    <Route path='/'><Start /></Route>
                </Switch>
            </main>
            <footer onClick={() => scrollUp()}><p>Back to top</p></footer>
        </Router>
        </div>
    );
}

function scrollUp(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

export default App;

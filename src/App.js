import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link,  NavLink }from 'react-router-dom';
import Start from './components/Start';
import Battle from './components/Battle';
import Statistics from './components/Stats';
import Upload from './components/Upload';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                <header className="App-header">
                    <h1>Fab Hamster Wars</h1>
                    <nav>
                        <Link to='/'>Start</Link>
                        <NavLink to='/battle' activeClassName='active'>Battle</NavLink>
                        <NavLink to='/stats' activeClassName='active'>Stats</NavLink>
                        <NavLink to='/upload' activeClassName='active'>Upload</NavLink>
                    </nav>
                </header>
                </Route>
            </Switch>
            <main>
                <Switch>
                    <Route path='/battle'><Battle /></Route>
                    <Route path='stats'><Statistics /></Route>
                    <Route path='/upload'><Upload /></Route>
                    <Route path='/'><Start /></Route>
                </Switch>
            </main>
            <footer>footer...</footer>
        </Router>
    );
}

export default App;

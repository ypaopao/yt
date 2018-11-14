import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Case from './case/index.js'

class App extends Component{

    render(){
        return(
            <Router>
                <div>
                    <Case/>
                </div>
            </Router>
        )
    }
}
export default App;

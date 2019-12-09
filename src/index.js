import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Cue from './components/Cue';

ReactDOM.render(
    <Router>
        <Cue />
    </Router>
    , document.getElementById('root'));

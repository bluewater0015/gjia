import './css/common.css';
import './css/reset.css';
import React,{ Component } from 'react';
import { render } from 'react-dom';
import Main from './pages/main';

class App extends Component{
    render(){
        return (
            <div className="app">
                <Main />
            </div>
        )
    }
}
render(<App />,document.getElementById('root'));
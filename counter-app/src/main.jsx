import React from 'react'
import ReactDOM from 'react-dom/client';
import PrimoApp from './PrimoApp';
import CounterApp from './Counter-app';
//import { counterApp } from './counter-app';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <PrimoApp titulo="Hola soy JMC" subtitulo="2024"/> */}
        <CounterApp value={0}/>
    </React.StrictMode>
);
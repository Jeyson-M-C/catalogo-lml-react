/* export function App(){
    return (<h1>Hola mundo</h1>);
} */

import { useState } from "react";
import PropTypes from "prop-types";

const CounterApp = ({value}) => {

  const [ contador, setContador ] = useState(value);

  const aumentar = () => {
    //setContador( contador + 1 )
    setContador( (c) => c + 10 )
  }

  return (
        <div>
            <h1>CounterApp</h1>
            <h2> { contador } </h2>
            <button onClick={aumentar}>
            +
            </button>
        </div>
  );
}
  
export default CounterApp

CounterApp.PropTypes = {
  value: PropTypes.number.isRequired,
}

CounterApp.defaultProps = {
  value:'Sin valor'
}

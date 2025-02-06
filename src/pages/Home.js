import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <section>

          <ul>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/enlaces">Enlaces</Link></li>
          </ul>
    </section>
  );
};

export default Home;

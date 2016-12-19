import React from 'react';
import { Link } from 'react-router';

type Props = {
  children: Object;
};

const App = (props: Props) => (
  <div>
    <h1>App Homepage</h1>
    <Link to="/">Home</Link>
    <Link to="/foo">Foo</Link>
    <div>{props.children}</div>
  </div>
);

export default App;

import React from 'react';
import { render } from 'react-dom';
import DevTools from './containers/DevTools';

export default function showDevTools(store) {
  const settings = `
  menubar=no,
  location=no,
  resizable=yes,
  scrollbars=no,
  status=no,
  width=450,
  height=700`;
  const popup = window.open(null, 'Redux DevTools', settings);
  popup.location.reload();

  setTimeout(() => {
    popup.document.write('<div id="react-devtools-root"></div>');
    render(
      <DevTools store={store} />,
      popup.document.getElementById('react-devtools-root'),
    );
  }, 10);
}

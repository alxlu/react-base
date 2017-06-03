/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';
import Home from '../Home';
import TestPage from '../TestPage';

describe('containers', () => {
  describe('component rendering', () => {
    it('<App /> renders correctly', () => {
      const tree = renderer.create(
        <App />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('<Home /> renders correctly', () => {
      const tree = renderer.create(
        <Home />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('<TestPage /> renders correctly', () => {
      const tree = renderer.create(
        <TestPage />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

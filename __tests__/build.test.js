/* eslint-env jest */
import webpack from 'webpack';
import del from 'del';
import fs from 'fs';
import { join } from 'path';

import { setOptions, createConfig } from '../webpack.config.babel';

const distpath = join(__dirname, '../dist');
const expectedOutput = ['index.html', 'index.js'];

describe('webpack build', () => {
  beforeAll(() => {
    del([`${distpath}/**`]);
  });
  afterEach(() => {
    del([`${distpath}/**`]);
  });

  it('builds dev setup successfully', (done) => {
    const options = setOptions();
    const config = createConfig(options);
    webpack(config, (err, stats) => {
      expect(stats.hasErrors()).toEqual(false);
      fs.readdir(distpath, (err, files) => {
        expect(err).toBeFalsy();
        expect(files).toEqual(expect.arrayContaining(expectedOutput));
        done();
      });
    });
  }, 30000);

  it('builds production setup successfully', (done) => {
    const options = setOptions(true);
    const config = createConfig(options);
    webpack(config, (err, stats) => {
      expect(stats.hasErrors()).toEqual(false);
      fs.readdir(distpath, (err, files) => {
        expect(err).toBeFalsy();
        expect(files).toEqual(expect.arrayContaining(expectedOutput));
        done();
      });
    });
  }, 50000);
});

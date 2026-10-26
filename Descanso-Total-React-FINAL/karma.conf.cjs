
const path = require('path');
const esbuild = require('esbuild');
const { createInstrumenter } = require('istanbul-lib-instrument');

module.exports = async function(config) {
  const destino = path.join(__dirname, '.karma-bundle.js');
  const instrumenter = createInstrumenter({
    esModules: true,
    compact: false
  });

  const coberturaPlugin = {
    name: 'cobertura-descanso-total',
    setup(build) {
      build.onLoad({ filter: /\.(js|jsx)$/ }, async (args) => {
        if (!args.path.includes(`${path.sep}src${path.sep}`)) {
          return;
        }

        const fs = require('fs');
        const codigo = fs.readFileSync(args.path, 'utf8');
        const loader = args.path.endsWith('.jsx') ? 'jsx' : 'js';

        const transformado = await esbuild.transform(codigo, {
          loader,
          format: 'esm',
          jsx: 'automatic'
        });

        return {
          contents: instrumenter.instrumentSync(
            transformado.code,
            args.path
          ),
          loader: 'js'
        };
      });
    }
  };

 await esbuild.build({
    entryPoints: ['tests/index.js'],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    outfile: destino,
    jsx: 'automatic',
    define: {
      'process.env.NODE_ENV': '"test"'
    },
    plugins: [coberturaPlugin]
  });

  config.set({
    frameworks: ['jasmine'],
    files: [destino],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    client: {
      captureConsole: true
    },
    browserNoActivityTimeout: 60000
  });
};

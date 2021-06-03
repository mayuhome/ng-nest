export default {
  $schema: './node_modules/@angular/cli/lib/config/schema.json',
  version: 1,
  newProjectRoot: 'projects',
  projects: {
    demo: {
      root: '',
      sourceRoot: 'src',
      projectType: 'application',
      prefix: 'app',
      schematics: {
        '@schematics/angular:component': {
          style: 'scss'
        },
        '@schematics/angular:application': {
          strict: true
        }
      },
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:browser',
          options: {
            outputPath: 'dist/demo',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            tsConfig: 'tsconfig.app.json',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['node_modules/@ng-nest/ui/style/core/index.css', 'src/styles.scss']
          },
          configurations: {
            production: {
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '500kb',
                  maximumError: '1mb'
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '2kb',
                  maximumError: '4kb'
                }
              ],
              fileReplacements: [
                {
                  replace: 'src/environments/environment.ts',
                  with: 'src/environments/environment.prod.ts'
                }
              ],
              outputHashing: 'all'
            },
            development: {
              buildOptimizer: false,
              optimization: false,
              vendorChunk: true,
              extractLicenses: false,
              sourceMap: true,
              namedChunks: true
            }
          },
          defaultConfiguration: 'production'
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          configurations: {
            production: {
              browserTarget: 'demo:build:production'
            },
            development: {
              browserTarget: 'demo:build:development'
            }
          },
          defaultConfiguration: 'development'
        }
      }
    }
  },
  defaultProject: 'demo'
};

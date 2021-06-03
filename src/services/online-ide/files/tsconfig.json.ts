export default {
  compileOnSave: false,
  compilerOptions: {
    baseUrl: './',
    outDir: './dist/out-tsc',
    forceConsistentCasingInFileNames: true,
    strict: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    sourceMap: true,
    declaration: false,
    downlevelIteration: true,
    experimentalDecorators: true,
    moduleResolution: 'node',
    importHelpers: true,
    target: 'es2017',
    module: 'es2020',
    lib: ['es2018', 'dom']
  },
  angularCompilerOptions: {
    enableI18nLegacyMessageIdFormat: false,
    strictInjectionParameters: true,
    strictInputAccessModifiers: true,
    strictTemplates: true,
    enableIvy: true
  }
};

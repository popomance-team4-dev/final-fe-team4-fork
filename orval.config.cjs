// eslint-disable-next-line no-undef
module.exports = {
  api: {
    input: './openapi.json',
    output: {
      mode: 'split',
      target: './src/api-sample-new',
      override: {
        mutator: {
          path: './src/api/axios-client-new.ts',
          name: 'customInstance',
        },
        operations: {
          vcSave: {
            mock: true,
          },
        },
      },
    },
  },
};

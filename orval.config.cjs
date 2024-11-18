/* eslint-disable no-undef */
module.exports = {
  api: {
    input: './openapi.json',
    output: {
      mode: 'split',
      target: './src/api',
      override: {
        mutator: {
          path: './src/api/custom-client.ts',
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

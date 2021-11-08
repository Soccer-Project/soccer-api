module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
        "babel-plugin-transform-typescript-metadata",
        [
            'module-resolver', {
                alias: {
                '@config': './src/config',
                '@models': './src/models',
                '@controllers': './src/controllers',
                '@views': './src/views'
                }
            }
        ],
        [
            "@babel/plugin-proposal-decorators", { 
                legacy: true 
            }
        ]
    ],
    ignore: [
      '**/*.test.ts'
    ]
}

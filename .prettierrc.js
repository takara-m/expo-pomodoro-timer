module.exports = {
  // 基本設定
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,

  // 改行設定
  printWidth: 80,
  endOfLine: 'lf',

  // JSX設定
  jsxSingleQuote: true,
  bracketSameLine: false,

  // React Native / Expo 特有の設定
  bracketSpacing: true,
  arrowParens: 'avoid',

  // ファイル種別の個別設定
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 120,
        proseWrap: 'always',
      },
    },
  ],
};

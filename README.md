# Expo + Tamagui テンプレートリポジトリ 👋

このリポジトリは、**Expo +
Tamagui開発用のテンプレートリポジトリ**として設計されており、今後の様々なプロジェクトで汎用的に使用することを目的としています。コード品質の向上、テスト環境の整備、開発効率化のための設定など、実プロジェクトですぐに使える状態を目指して構築されています。

[`create-expo-app`](https://www.npmjs.com/package/create-expo-app)をベースに作成された[Expo](https://expo.dev)プロジェクトに、[Tamagui](https://tamagui.dev)のユニバーサルUIシステムを統合しています。

## ✨ 主要機能

- 🎨 **Tamagui UI System**: React Native と Web で同一コンポーネントを使用
- 🌓 **ダーク/ライトモード**: 自動テーマ切り替え機能
- 📱 **クロスプラットフォーム**: iOS、Android、Web に対応
- 🎭 **アニメーション**: 組み込みのスプリングアニメーション
- 🎯 **Design Tokens**: 統一されたデザインシステム
- 📝 **TypeScript**: 完全な型安全性
- 🔧 **開発体験**: ESLint + Prettier + Husky による品質管理

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses
[file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you
can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our
  [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll
  create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

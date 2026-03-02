---
marp: true
theme: default
paginate: true
---

# Firebaseで

# SNSを作ってみよう

### 〜 BaaSを活用したWebアプリ開発 〜

---

# 自己紹介

## 矢部大智

<div style="display: flex; align-items: center; gap: 40px;">
<div>

- **出身**: 福井県
- **所属**: コンピュータシステム専攻 2 年生
- **技術領域**: TypeScript, Kotlin, Go, AWS
- **趣味**: 絶叫系, ゲーム, 食べること
  ![bg right:40%](./image/yabe.jpg)

---

## 今日のゴール

- バックエンド/フロントエンドとは何か分かる
- Firebaseで何ができるか分かる
- webアプリ開発がなんとなくわかるようになる
- 「これなら作れそう」と思えるようになる

---

## バックエンドとは

YouTubeで例えると…

- **バックエンド**
  - 動画を保存している
  - 「この動画ください」というリクエストを受け取る
  - 動画データを送り返す

- **フロントエンド**
  - 再生ボタンを表示する
  - 「この動画欲しい」というリクエストを送る
  - 動画を再生する
  - コメントやいいねを表示する

---

## マクドナルドで例えると

- **バックエンド** = 厨房（ハンバーガーを作る）
- **フロントエンド** = カウンター（お会計・注文を受ける・商品の受け渡し）

厨房がないとハンバーガーは出てこない。
カウンターがないとハンバーガーを購入できない。

---

## SNSアプリにはどんな機能がある？

- ユーザー登録・ログイン
- 投稿
- タイムライン表示
- いいね・コメント

---

## 普通に作ろうとすると…

- サーバー構築
- 認証
- API実装
- セキュリティ

👉**初心者にはハードルが高い**

---

## Firebaseとは？

Googleが提供する  
**「アプリ開発に必要なもの全部入り」サービス**

特徴：

- バックエンド開発のめんどくさいところは全部Googleが用意してくれてる
  - サーバー管理不要
  - フロントエンド中心で開発できる

---

## Firebaseでできること

- 🔐Authentication（ログインのための認証機能）
- Firestore / Realtime DB（データ保存）
- Storage（画像や動画などのファイルを保存）
- etc...

**SNSに必要な機能全部ある**

---

## 今回使うFirebase機能

今回の勉強会では👇

- Authentication（ログイン）
- Firestore（投稿データ）

---

## アプリ完成イメージ

---

## 今回使うファイルのダウンロード

- 以下のURLからダウンロードできます
- ダウンロードが終わったらvscodeで開いてください。
  https://github.com/nrak126/firebase-tutorial/archive/refs/heads/main.zip

---

- vscodeのターミナルで以下の三つのコマンドを実行

```
cd before
```

```
npm i
```

```
npm run dev
```

- サーバーが立ち上がったらhttp://localhost:5173/ にアクセス

---

## firebaseプロジェクトの作成

- firebase のURL
  https://firebase.google.com/?hl=ja
- ログインした後コンソールへ移動
  ![width:1000px](./image/2.png)

---

- firebaseプロジェクトを設定して開始をクリック

![width:850px](./image/3.png)

---

- プロジェクト名を入力して続行

![width:850px](./image/4.png)

---

- AIアシスタントは今回使わないのでどちらでも

![width:850px](./image/5.png)

---

- アナリティクスはオフでプロジェクトを作成

![width:700px](./image/6.png)

---

- アプリを追加 → ウェブを選択

![width:700px](./image/7.png)
![width:700px](./image/8.png)

---

- アプリのニックネームを入力してアプリを登録

![width:700px](./image/9.png)

---

- `npm install firebase`をコピー

![width:700px](./image/10.png)

- vscodeにのターミナルに貼り付けて実行

![width:700px](./image/11.png)

---

- このコードをコピー

![width:400px](./image/12.png)

- firebase.jsの中に貼り付け

![width:300px](./image/13.png)

- 貼り付け終わったらコンソールに進む

---

### ログイン機能のための設定

- 左側にある「構築」の中の「Authentication」をクリック

![width:700px](./image/14.png)

---

- 始めるをクリック

![width:700px](./image/15.png)

---

- Googleを選択

![width:700px](./image/16.png)

---

- 有効にするスイッチをオンにする
- サポートメールを追加して保存をクリック

![width:700px](./image/17.png)

---

- firebase.jsにコードを追加

![width:700px](./image/18.png)

---

```js
import { getAuth, GoogleAuthProvider } from "firebase/auth";
```

```js
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
```

---

- app.jsxに移動
- import文を追加

```js
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./firebase/config";
```

---

- app.jsxの`handleLogin`関数を以下をコピーして差し替え

```js
const handleLogin = () => {
  signInWithPopup(auth, provider).then((result) => {
    setCurrentUser(result.user);
  });
};
```

---

- app.jsxの下の方へ移動
- この2行を修正
  ![width:700px](./image/19.png)

```jsx
<span>ようこそ、{currentUser.displayName}さん</span>
<img src={currentUser.photoURL} className="user-avatar" />
```

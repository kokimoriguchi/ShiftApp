# ShiftHub

<img alt="ShiftHubTop" src="https://github.com/kokimoriguchi/ShiftApp/assets/105916391/d9bcb669-82ea-4947-ac6b-7109b0ce2872">
<br>

## ⚪︎**サービス URL**

[ShiftHub](https://web.realworld-demo.com)

<br>

## ⚪︎ 開発のきっかけ

前職での経験から、スタッフが毎月末に次月のシフトを指定の紙に記入し、出勤時に提出するという煩雑な作業を目の当たりにしていました。マネージャーも、それらの提出された紙を逐一確認し、シフトの調整を行っていました。このような業務フローが効率的でないと感じ、一括で確認・調整できる方法はないかと考えていました。
そんな折、ある高校生が自らのアルバイト先のためにシフト管理アプリを開発したという記事を目にしました。その記事に深く感銘を受け、私自身もプログラミングの学習を開始する決意をしました。その結果、私が掲げていた目標の 1 つ、シフト管理アプリ「ShiftHub」の開発を実現することができました。

<br>

## ⚪︎ ユーザーの課題

### ⚪︎ マネージャーサイド

- 40 人以上の従業員のシフトを紙で管理することの大変さ。
- A3 サイズに 40 人以上の名前と出勤日が記載された確定シフトは字が小さく、一覧性が低い。
- 繁忙期などの特定の時間帯における人員配置の確認が、単日のシフト表（31 枚分）を全て印刷して行う効率の悪さ。
- スタッフの持つ特定の技能や資格が不明確で、必要なスキルを持つスタッフが出勤していない日が発生する可能性。
- Excel を完璧に操作できないため、スクロール時に縦軸の名前が見えなくなり、位置を記憶しながら作業を進める必要がある。

### ⚪︎ スタッフサイド

- 出勤が少ない月であっても、シフトを記述した紙を月末までに提出する義務がある。
- 確定シフトが A3 サイズの紙に印刷されて掲示されており、字が小さく、自分の名前やシフトの確認が困難。
- 月の後半部分のシフトを確認する際、左側の名前部分との参照が難しい。
- 自分のシフトを確認するために、掲示されているシフト表の写真を撮影して参照することの手間。

<br>

## ⚪︎ 機能一覧

| トップ画面                                                                                                  | ダークモード画面                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ![Top画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/ca4fc924-765f-4532-9c37-a631f793e11d) | ![ダークモード](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/4802aa58-a907-497d-89c3-67f6a68aed76) |
| ログイン画面、新規店舗登録、利用規約の画面に遷移できる様になっています。                                    | ハンバーガーメニュー内でダークモードの切り替えができ、全画面でダークモードが適用されるように実装しました。       |

| 新規店舗登録画面                                                                                                     | マネージャー作成画面                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![新規店舗登録画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/a9521855-ff5c-40a7-ae07-2f9d7512641c) | ![マネージャー作成画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/38ec42bb-6c0a-42bc-ab1d-3477802c86ba) |
| 店名と店番を入力することで新規店舗登録可能にしています。                                                             | 店舗登録を行うとこの画面に遷移し 1 店舗に対して 1 人マネージャーを登録できる様にしています。                             |

| マネージャーログイン画面                                                                                                     | マネージャートップ画面                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![マネージャーログイン画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/2bcfea84-93e1-4944-814b-0da71787b36f) | ![ マネージャートップ画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/d173a9e0-aab5-40e6-9fe6-8155678242a3) |
| 登録した社員番号とパスワードを入力することでログイン可能にしています。                                                       | header 部分に店舗名:従業員登録名表示する様実装しています。この画面からマネージャー権限のある作業画面に遷移できます。        |

| 新規スタッフ登録画面                                                                                                     | スタッフ一覧画面                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![新規スタッフ登録画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/07edec35-639e-4061-8ad8-695b8193b9eb) | ![ スタッフ一覧画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/7d064b68-0d47-4c3a-9279-cedf2d7daaee)                                            |
| マネージャートップ画面から新規スタッフ登録可能です。                                                                     | スタッフ一覧画面でログインしている店舗に所属しているスタッフの氏名・社員番号を確認できます。また、スタッフの削除・可能スキルのアタッチできる様に実装しています。 |

| スキル登録                                                                                                               | スキル一覧画面                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| ![スキル登録](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/24cf655d-1bee-4636-81bf-d1eb157da268)           | ![スキル一覧画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/5e111484-ebc9-4bb1-a128-84bd377cc37f) |
| スキル登録ボタンクリックすることでモーダルが開き、ログインしている店舗に必要スキルを登録することがで切る様実装しました。 | 店舗に登録されているスキル一覧を確認できます。スタッフ一覧と同様チェックボックスで削除可能にしています。           |

| マネージャーシフト編集画面                                                                                                                                                                                                                         | 単日シフト確認画面                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![シフト編集画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/7d1ac287-cb2d-4a9a-b530-31878f214649)                                                                                                                                 | ![ 単日シフト確認画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/5a4aea9e-012b-4162-994e-0b5d2075f545)                                                      |
| ⚪︎ 印がシフト提出されている日付になっておりクリックするとモーダルにて出勤時間の登録ができます。確定ボタン押すまでは何度でも編集可能です。登録されているスキルが満たされない日付は ✖️ マークで表示しておりモーダルにて不足スキルの確認ができます。 | シフト編集画面にて日付を押すことで単日表示のこの画面に遷移します。ユーザーからの要望により実現しました。出勤登録したスタッフの勤務時間を視覚的にみやすい様に実装しています。 |

| スタッフログイン画面                                                                                                     | スタッフトップ画面                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| ![スタッフログイン画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/27231597-361e-4f76-8b9d-02ed8f0e5cd9) | ![ スタッフトップ画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/b41b6319-03ae-42ed-a688-f94c9ce4866f) |
| スタッフログイン画面でマネージャーログインと同様です。                                                                   | スタッフのトップ画面でシフトの提出・確定したシフトの確認ができるよう実装しています。                                    |

| スタッフシフト提出画面                                                                                                                                                             | スタッフシフト入力モーダル                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ![シフト提出画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/7b2f9c41-f28d-4d0e-b5c1-63df9d0dceba)                                                                 | ![ シフト入力モーダル](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/5710a9da-aa37-4b26-a6a2-9454ad6aae75) |
| 日付部分クリックすることで出勤・退勤時間の入力ができるモーダルが表示され登録ができます。一時保存と削除で入力内容の保持と削除・送信ボタンで入力内容の送信ができる様実装しています。 | シフト入力画面のモーダル表示です。                                                                                      |

| シフト確認モーダル                                                                                                     | 確定シフト確認画面                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![シフト確認モーダル](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/af28ba08-08b4-4531-b93a-83b2453c08e4) | ![ 確定シフト確認画面](https://github.com/kokimoriguchi/ShiftApp/assets/105916391/2017ea3a-d56b-4a8c-9278-696d996bccf6)                                                |
| シフト確認ボタンを押すことで現在確定されている年月を選択しシフトの確認画面に遷移します。マネージャー画面共通です。     | 確定したシフトを確認できます。カレンダー部分は画面内スクロールで確認でき、日付をクリックすると単日表示ができます。不足スキルも確認できます。マネージャー画面共通です。 |

<br>

## ⚪︎ER 図

<img src="https://github.com/kokimoriguchi/ShiftApp/assets/105916391/2f3cbce6-4b26-4025-accc-0cd3d199c537">

<br>

## ⚪︎ インフラ構成図

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2741017/bbd67865-9989-766c-dfe9-cb297a26ca7b.png">

<br>

## ⚪︎ 主な使用技術

| Category       | Technology Stack                                     |
| -------------- | ---------------------------------------------------- |
| Frontend       | React(18.2.0), Tailwind(3.3.2)                       |
| Backend        | Ruby(3.1.0), Ruby on Rails(6.1.7)                    |
| Infrastructure | Amazon Web Services                                  |
| Database       | MySQL(8.0)                                           |
| Environment    | Docker(23.0.5), Docker compose                       |
| CI/CD          | GitHub Actions                                       |
| library        | Axios, react-icons(4.10.1), react-router-dom(6.14.1) |
| Gem            | dotenv-rails, jwt, unicorn                           |
| etc.           | ESLint, Prettier, rubocop, Git, GitHub, nginx        |

<br>

## ⚪︎ 工夫した点

<details>
<summary>### １. データベースの最適化</summary>

- 複数のテーブル (`shift_dates`, `shift_times`, `employee`) と中間テーブル (`employer_shifts`) を効率的に扱い、トランザクションで保存するように設計しました。
</details>

<details>
<summary>### ２. セキュリティの強化</summary>

- 認証に jwt トークンを使用し、cookie に保存。これによりフロントエンド側で認証情報を扱わないようにしました。
- cookie には`http only`属性と`secure true`を設定。これによりフロントエンドからの編集を不可にし、HTTPS 通信のみを許可するようにしました。
</details>

<details>
<summary>### ３. シフト管理のユーザビリティ向上</summary>

- シフト提出の際、一時保存機能をローカルストレージに実装。ユーザーが自身のシフトを自分で確認できるようにしました。
- 提出されたシフトは ⚪︎ 印で表示し、確定した場合に具体的な時間を表示する機能を追加。
- 「スキルチェック」機能で、スタッフの持つスキルを瞬時に確認可能。不足しているスキルも可視化され、クリック一つで詳細が見えるようにしました。
- ユーザーの要望を反映し、スタッフの出勤時間をグラフ形式で表示。これにより時間の空きや重複を直感的に捉えられるようにしました。
- カレンダーデザインは、前職で使用されていた Excel のレイアウトを参考にして自作しました
</details>

<details>
<summary>### ４. ユーザビリティとデザインの工夫</summary>

- ダークモードを実装し、利用環境に応じて目に優しい表示に切り替え可能に。
- 前職のメインカラーである青を基調にデザイン。これにより、店舗や事務所での違和感を減少させるよう心掛けました。
- ページの要所にアニメーションを加え、視覚的にも魅力的な UI を追求しました。

</details>

<br>

## ⚪︎ 今後の課題

<details>
<summary>1. スタッフ詳細の確認機能</summary>

- 各スタッフの詳細情報を確認できる機能を導入する。
</details>

<details>
<summary>2. CSV 出力と Excel 連携</summary>

- CSV 出力を可能にし、現場で使用している Excel との連携をスムーズに行えるようにする。
</details>

<details>
<summary>3. 通知機能の強化</summary>

- お知らせ機能を追加し、シフトが公開された際にスタッフへの通知を自動で行う。
</details>

<details>
<summary>4. 担当部門の表示</summary>

- カレンダー表示において、左側に各スタッフの担当部門を明示的に表示する。
</details>

<details>
<summary>5. スキルレベルの可視化</summary>

- スタッフごとのスキルの習熟度を表示できるようにし、スキルレベルの差を明確にする。
</details>

<details>
<summary>6. シフト変更リクエスト機能</summary>

- シフトが確定した後でも、変更希望をマネージャーに向けてリクエストできる機能を追加する。
</details>

<details>
<summary>7. 確定シフトの変更機能</summary>

- 確定後のシフトに対しても変更をリクエストし、マネージャーがそれを承認する流れを実装する。
</details>

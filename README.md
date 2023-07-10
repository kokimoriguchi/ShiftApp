# シフト管理アプリ

## 工夫した点

- 出勤可能日保存する際に出勤日の shift＿dates テーブルと出勤時間の shift_times テーブル、そして employee テーブルとの中間テーブルの employer_shifts テーブルをトランザクションで保存するようにした点
- 認証に jwt トークンを使用し、cookie に保存することで認証可能にした点
- cookie に保存したデータは http only 属性と secure true を設定し front 側からの編集を不可にして https 通信のみ許可するように設定し backend の Rails 側からしか cookie にアクセスできないようにし、セキュリティ対策を行なっている点
- react 側でユーザからの入力を受け取る際に useRe を採用し useState 利用した際に発生する再レンダリングを防止している点
- テーブルに is から始まる Boolean 型のカラムを随時セットしており、true・false で認可されたかどうかの判定を行うようにしている点

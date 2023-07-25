#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# # データベースの作成、マイグレーション、シードデータの投入。createとseedはfargateの初回のみ実行する。
# bundle exec rails db:create
# bundle exec rails db:migrate
# bundle exec rails db:seed

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"

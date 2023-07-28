class Employee < ApplicationRecord
  has_secure_password
  belongs_to :store
  has_many :employer_shifts
  has_many :shift_dates, through: :employer_shifts
  validates :number, format: { with: /\A\d+\z/, message: "半角数字を入力してください" }
  validates :number, length: { minimum: 5, message: "5桁以上で入力してください" }
  validates :password, format: { with: /\A[a-zA-Z0-9.-]+\z/, message: "半角英数字を入力してください" }
  validates :password, length: { minimum: 5, message: "パスワードは5文字以上で設定してください" }
  validates :name, format: { with: /\A[\p{Hiragana}\p{Katakana}\p{Han}a-zA-Zー\s]+\z/, message: "全角ひらがな、全角カタカナ、漢字、英語のいずれかを入力してください" }
end

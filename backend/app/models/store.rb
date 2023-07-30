class Store < ApplicationRecord
  has_secure_password
  has_many :employees
  has_many :approve_months
  has_many :skills
  validates :name, format: { with: /\A[\p{Hiragana}\p{Katakana}\p{Han}a-zA-Zー\s]+\z/, message: "全角ひらがな、全角カタカナ、漢字、英語のいずれかを入力してください" }
  validates :number, format: { with: /\A\d+\z/, message: "半角数字を入力してください" }
  validates :number, length: { minimum: 5, message: "5桁以上で入力してください" }
end

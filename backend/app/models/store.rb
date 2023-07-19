class Store < ApplicationRecord
  has_secure_password
  has_many :employees
  has_many :approve_months
end

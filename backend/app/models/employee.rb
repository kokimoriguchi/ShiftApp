class Employee < ApplicationRecord
  has_secure_password
  belongs_to :store
  has_many :employer_shifts
end

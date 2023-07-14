class Employee < ApplicationRecord
  has_secure_password
  belongs_to :store
  has_many :employer_shifts
  has_many :shift_dates, through: :employer_shifts
end

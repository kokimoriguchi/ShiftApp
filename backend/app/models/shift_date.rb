class ShiftDate < ApplicationRecord
  has_one :shift_time, dependent: :destroy
  has_many :employer_shifts
  has_many :employees, through: :employer_shifts, dependent: :destroy
end

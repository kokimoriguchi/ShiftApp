class ShiftDate < ApplicationRecord
  has_one :shift_time
  has_many :employer_shifts
  has_many :employees, through: :employer_shifts
end

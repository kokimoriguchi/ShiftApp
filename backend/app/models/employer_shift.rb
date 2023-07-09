class EmployerShift < ApplicationRecord
  belongs_to :employer
  belongs_to :shift_date
end

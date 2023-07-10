class EmployerShift < ApplicationRecord
  belongs_to :employee
  belongs_to :shift_date
end

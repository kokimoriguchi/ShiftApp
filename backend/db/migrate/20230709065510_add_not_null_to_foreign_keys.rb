class AddNotNullToForeignKeys < ActiveRecord::Migration[6.1]
  def change
    change_column_null :employer_shifts, :shift_date_id, false
    change_column_null :employer_shifts, :employee_id, false
    change_column_null :shift_times, :shift_date_id, false
  end
end

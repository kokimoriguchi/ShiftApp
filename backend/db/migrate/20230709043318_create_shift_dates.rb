class CreateShiftDates < ActiveRecord::Migration[6.1]
  def change
    create_table :shift_dates do |t|
      t.date :work_day,null: false
      t.boolean :is_attendance, null: false, default: false

      t.timestamps
    end
  end
end

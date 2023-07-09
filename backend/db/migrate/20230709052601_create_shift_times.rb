class CreateShiftTimes < ActiveRecord::Migration[6.1]
  def change
    create_table :shift_times do |t|
      t.time :start_time
      t.time :end_time
      t.references :shift_date, foreign_key: true
      t.timestamps
    end
  end
end

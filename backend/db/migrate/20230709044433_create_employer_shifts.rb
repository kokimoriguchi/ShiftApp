class CreateEmployerShifts < ActiveRecord::Migration[6.1]
  def change
    create_table :employer_shifts do |t|
      t.references :shift_date, foreign_key: true
      t.references :employee, foreign_key: true

      t.timestamps
    end
  end
end

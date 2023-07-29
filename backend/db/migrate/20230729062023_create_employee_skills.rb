class CreateEmployeeSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_skills do |t|
      t.references :skill, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true
      t.integer :level, null: false

      t.timestamps
    end
  end
end

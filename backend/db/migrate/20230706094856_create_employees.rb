class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.integer :number, null: false
      t.string :password_digest, null: false
      t.boolean :is_manager, null: false, default: false

      t.timestamps
    end
    add_index :employees, :number, unique: true
    add_reference :employees, :store, foreign_key: true
  end
end

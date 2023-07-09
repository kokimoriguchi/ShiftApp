class CreateApproveMonths < ActiveRecord::Migration[6.1]
  def change
    create_table :approve_months do |t|
      t.references :store, null: false, foreign_key: true
      t.integer :year, null: false
      t.integer :month, null: false
      t.boolean :is_approve, null: false, default: false

      t.timestamps
    end
    add_index :approve_months, [:year, :month], unique: true
  end
end

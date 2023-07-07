class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :name, null: false, unique: true
      t.integer :number, null: false, unique: true
      t.string :password_digest, null: false, unique: true

      t.timestamps
    end
  end
end

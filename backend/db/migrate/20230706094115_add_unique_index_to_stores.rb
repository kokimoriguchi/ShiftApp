class AddUniqueIndexToStores < ActiveRecord::Migration[6.1]
  def change
    add_index :stores, :name, unique: true
    add_index :stores, :number, unique: true
    add_index :stores, :password_digest, unique: true
  end
end

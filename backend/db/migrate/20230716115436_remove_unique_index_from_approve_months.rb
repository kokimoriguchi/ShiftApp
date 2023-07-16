class RemoveUniqueIndexFromApproveMonths < ActiveRecord::Migration[6.1]
  def change
    remove_index :approve_months, column: [:year, :month], name: 'index_approve_months_on_year_and_month', unique: true
  end
end

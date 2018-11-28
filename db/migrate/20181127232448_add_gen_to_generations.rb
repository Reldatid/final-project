class AddGenToGenerations < ActiveRecord::Migration[5.2]
  def change
    add_column :generations, :gen, :integer
  end
end

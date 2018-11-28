class CreateGenerations < ActiveRecord::Migration[5.2]
  def change
    create_table :generations do |t|
      t.float :average_fitness

      t.timestamps
    end
  end
end

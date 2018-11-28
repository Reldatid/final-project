class CreateGenomes < ActiveRecord::Migration[5.2]
  def change
    create_table :genomes do |t|
      t.text :strand
      t.float :fitness
      t.integer :generation_id

      t.timestamps
    end
  end
end

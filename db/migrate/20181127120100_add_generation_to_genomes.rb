class AddGenerationToGenomes < ActiveRecord::Migration[5.2]
  def change
    add_column :genomes, :generation_number, :integer
  end
end

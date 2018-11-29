class ViewsController < ApplicationController
  def welcome

  end

  def simulation
  end

  def graphs
    fitnesses = Generation.pluck(:average_fitness)
    generation_numbers = Generation.pluck(:gen)
    generation_id = Generation.pluck(:id)
    data = {}
    generation_numbers.each_with_index {|k,i| data[k] = {fitness: fitnesses[i], id: generation_id[i]}}
    data = data.sort.to_h


    @db_generation_fitness = []
    @db_generation_numbers = []
    @db_generation_id = []
    data.each {|k,i|
      @db_generation_numbers << k
      @db_generation_fitness << data[k][:fitness]
      @db_generation_id << data[k][:id]
    }
    puts @db_generation_fitness
    puts @db_generation_numbers
    puts @db_generation_id
  end
end

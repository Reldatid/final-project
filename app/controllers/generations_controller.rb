class GenerationsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    gen = Generation.create generation_params
    genomes = params.require(:genomes)
    genomes.each do |genome|
      Genome.create(
        strand: genome[1][:strand],
        fitness: genome[1][:fitness],
        generation_number: genome[1][:generation],
        generation_id: gen.id
      )
    end
  end

  def index
    render json: Generation.all
  end

  def show
    @generation = Generation.find(params[:id])
    render json: @generation.as_json(include:[:genomes])
  end

  def destroy
    Generation.destroy_all
    Genome.destroy_all
  end

  private

  def generation_params
    params.require(:generation).permit(:average_fitness, :gen)
  end

end

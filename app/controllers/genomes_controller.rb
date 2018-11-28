class GenomesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    parms = genome_params
    g = Genome.new( genome_params )
    g.generation_id = Generation.last.id
    g.save
  end

  def get
    @genome = Genome.find(params[:id])
    render json: @genome
  end

  def destroys
  end

  private

  def genome_params
    params.require(:genome).permit(:generation, :strand, :fitness)
  end

end

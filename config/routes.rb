Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/welcome' => 'views#welcome'
  get '/simulation' => 'views#simulation'
  get '/graphs' => 'views#graphs'

  get '/genomes/:id' => 'genomes#get'
  post '/genomes/new' => 'genomes#create'
  delete '/genomes/:id' => 'genomes#destroy'

  get '/generations' => 'generations#index'
  get '/generations/:id' => 'generations#show'
  post '/generations/new' => 'generations#create'
  delete '/generations' => 'generations#destroy'

end

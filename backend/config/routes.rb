Rails.application.routes.draw do
  get "/hello", to: "hello#index"
  namespace :api do
    namespace :v1 do
      resources :registrations, only: %i[create]
    end
  end
end

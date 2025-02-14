Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  get "/hello", to: "hello#index"
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        sessions: "api/v1/auth/sessions",
      }

      namespace :current do
        resource :user, only: [:show]
      end

      resources :drafts, only: [:index, :create, :update, :show, :destroy]
    end
  end
end

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :employees, only: %i[create]
      get 'employees/me', to: 'employees#show'
      resources :managers, only: %i[create]
      resources :stores, only: %i[create]
      resources :approve_months, only: %i[create]
      post "/sign_in", to: "sessions#create"
      delete 'sign_out', to: 'sessions#destroy'
    end
  end
end

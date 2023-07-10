Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      #employeesの作成のコントローラーのroutes
      resources :employees, only: %i[create]
      get 'employees/me', to: 'employees#show'

      #managerの作成のコントローラーのroutes
      resources :managers, only: %i[create]

      #storeの作成のコントローラーのroutes
      resources :stores, only: %i[create]

      #approve_monthの作成のコントローラーのroutes
      resources :approve_months, only: %i[create]

      #sign_inとoutのコントローラーのroutes
      post "/sign_in", to: "sessions#create"
      delete 'sign_out', to: 'sessions#destroy'

      #shift登録のroutesとシフト提出可能な月の取得のroutes
      get "unapprove_month", to: "employee_shifts#unapprove_month"
      resources :employee_shifts, only: %i[create]
    end
  end
end

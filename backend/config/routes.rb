Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      #employeesの作成のコントローラーのroutes
      resources :employees, only: %i[create]
      get 'employees/me', to: 'employees#show'
      put 'employees/destroy', to: 'employees#destroy'

      #managerの作成のコントローラーのroutes
      resources :managers, only: %i[create]

      #storeの作成のコントローラーのroutes
      resources :stores, only: %i[create]

      #approve_monthの作成のコントローラーのroutes
      resources :approve_months, only: %i[create]
      #managerのシフト確定のroutes
      patch "confirm_shift/:store_number", to: "approve_months#confirm_shift"

      #sign_inとoutのコントローラーのroutes
      post "/sign_in", to: "sessions#create"
      post "/manager_sign_in", to: "sessions#manager_create"
      delete 'sign_out', to: 'sessions#destroy'

      #shift登録のroutesとシフト提出可能な月の取得のroutes
      get "get_submit_month", to: "employee_shifts#get_submit_month"
      resources :employee_shifts, only: %i[create]

      #managerのシフト確認のroutes
      get "get_employee", to: "manager_shifts#get_employee"
      get "get_employee_shifts", to: "manager_shifts#get_employee_shifts"
      get "get_shifts_by_month", to: "manager_shifts#get_shifts_by_month"
      get "get_shift_by_day/:id", to: "manager_shifts#get_shift_by_day"

      #managerのシフトupdateのroutes
      put "update_shift/:id", to: "manager_shifts#update_shift"

      #managerの従業員一覧取得のroute
      get "get_employees/:store_number", to: "managers#get_employees"

      #確定しているシフトの取得のroutes
      get "get_approve_month/:store_number", to: "confirm_shifts#get_approve_month"

      # skillコントローラーのroutes
      post "skill_create/:store_number", to: "skills#create"
      get "skills/:store_number", to: "skills#index"
      get "employee_index_skills/:employee_id", to: "skills#employee_index_skills"
      post "employee_add_skills/:employee_id", to: "skills#employee_add_skills"
      put "skills/destroy", to: "skills#destroy"

      # 単日のシフトの取得のroutes
      get "get_daily_calenders/:store_number/:date", to: "daily_calenders#get_daily_calender"

      # 従業員の出勤情報の取得のroutes
      get "employee_shift_detail/:store_number/:employee_name/:year/:month", to: "employee_shift_details#get_employee_shift_detail"
      #ヘルスチェックのroutes
      get "health_check", to: "health_check#index"
    end
  end
end

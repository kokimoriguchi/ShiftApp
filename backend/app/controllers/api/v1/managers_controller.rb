class Api::V1::ManagersController < ApplicationController
  include Authentication
  before_action :authenticate_manager, only: [:get_employees]
  before_action :set_store, only: [:create]

  def create
    # storeが存在し、そのstoreにmanagerが存在しない場合はemployeesに保存しトークンを返す
    if @store.employees.where(is_manager: true).exists?
      render json: { status: "error", message: "The store already has a manager" }
    else
      @manager = @store.employees.new(manager_params.except(:store_number).merge(is_manager: true))
      if @manager.save
        token = JwtService.encode(@manager.id)
        cookies[:token] = { value: token, httponly: true, domain: ".realworld-demo.com", same_site: :none }
        render json: {status: "create", data: @manager}
      else
        render json: { status:"error", message: @manager.errors.full_messages}
      end
    end
  end

  def get_employees
    store = Store.find_by(number: params[:store_number])
    employees = store.employees.where(is_manager: false)
    render json: { status: "success", employees: employees }
  end

  private

  def set_store
    # store_numberを元にstoreを取得
    @store = Store.find_by(number: manager_params[:store_number])
    unless @store
      render json: { status: "error", message: "The store does not exist" }
    end
  end

  def manager_params
    params.require(:manager).permit(:name, :number, :password, :store_number)
  end
end

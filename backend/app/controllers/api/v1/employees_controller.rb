class Api::V1::EmployeesController < ApplicationController
  include Authentication
  before_action :authenticate_manager, only: [:show, :destroy]

  def show
    # employeesが取得できた場合はユーザー情報を返す
    employee = Employee.find(@current_employee_id)
    render json: {status: "success", data: employee}
  end

  def create
    # store_numberを元にstoreを取得
    store = Store.find_by(number: employee_params[:store_number])
    if store
      employee_params_with_store_id = employee_params.except(:store_number).merge({store_id: store.id})
      employee = Employee.new(employee_params_with_store_id)
      # storeが存在しemployeeが保存できた場合はトークンを返す
      if employee.save
        token = JwtService.encode(employee.id)
        cookies[:token] = { value: token, httponly: true }
        render json: {status: "create", data: employee}
      else
        render json: {status: "error", message: employee.errors.full_messages}
      end
    else
      render json: {status: "error", message: "The store does not exist"}
    end
  end

  # employees/destroy
  def destroy
    ActiveRecord::Base.transaction do
      employee_ids = params[:employee_ids]
      Employee.where(id: employee_ids).destroy_all

      render json: {status: "success", message: "Employees deleted successfully."}, status: 200
    end
  end

  private
  def employee_params
    params.require(:employee).permit(:name, :number, :password, :store_number)
  end
end

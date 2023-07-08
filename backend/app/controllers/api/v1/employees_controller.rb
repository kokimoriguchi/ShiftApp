class Api::V1::EmployeesController < ApplicationController
  include Authentication
  before_action :authenticate_employee, only: [:show]

  def show
    # employeesが取得できた場合はユーザー情報を返す
    employee = Employee.find(@current_employee_id)
    render json: {status: "success", data: employee}
  end

  def create
    store = Store.find_by(name: employee_params[:store_name])
    if store
      employee_params_with_store_id = employee_params.except(:store_name).merge({store_id: store.id})
      employee = Employee.new(employee_params_with_store_id)
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

  private
  def employee_params
    params.require(:employee).permit(:name, :number, :password, :store_name)
  end
end

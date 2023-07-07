class Api::V1::EmployeesController < ApplicationController
  include Authentication
  before_action :authenticate_employee, only: [:show]

  def show
    # employeesが取得できた場合はユーザー情報を返す
    employee = Employee.find(@current_employee_id)
    render json: {status: "success", data: employee}
  end

  def create
    employee = Employee.new(employee_params)
    if employee.save
      token = JwtService.encode(employee.id)
      cookies[:token] = { value: token, httponly: true }
      render json: {status: "create", data: employee}
    else
        render json: {status: "error"}
    end
  end

  private
  def employee_params
    params.require(:employee).permit(:name, :number, :password, :store_id)
  end
end

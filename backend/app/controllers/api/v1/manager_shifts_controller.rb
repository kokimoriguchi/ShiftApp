class Api::V1::ManagerShiftsController < ApplicationController
  #受け取ったストアナンバーをもとに、そのストアナンバーに所属する従業員を取得する
  def get_employee
    store = Store.find_by(number: params[:store_number])
    if store
      @employees = store.employees
      render json: {status: "success", data: @employees}
    end
  end

  #employee_idをもとに、その従業員のシフトを取得する
  def get_employee_shifts
    employee = Employee.find(params[:employee_id])
    if employee
      @shifts = employee.employer_shifts
      render json: {status: "success", data: @shifts}
    end
  end
end

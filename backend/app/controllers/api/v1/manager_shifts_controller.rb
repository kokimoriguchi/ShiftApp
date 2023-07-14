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

  def get_shifts_by_month
    store_number = params[:number]
    year = params[:year].to_i
    month = params[:month].to_i
    # Store numberからstoreを取得
    store = Store.find_by(number: store_number)
    # Storeに紐づくemployeesを取得
    employees = store.employees
    # 指定した年月の範囲を作成
    date_range = Date.new(year, month)..Date.new(year, month).end_of_month

    shifts = []
    # EmployeeごとにShiftを取得
    employees.each do |employee|
      shifts << employee.shift_dates.where(work_day: date_range)
      # ここで、shiftsを使って何か処理を行う...
    end
    render json: {status: "success", data: shifts}
  end
end

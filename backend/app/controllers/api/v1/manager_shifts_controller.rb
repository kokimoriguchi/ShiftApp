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
    begin
      begin
        store_number = params[:store_number]
        year = params[:year].to_i
        month = params[:month].to_i
      rescue => e
        return render json: {status: "error", message: e.message}
      end
      # Store numberからstoreを取得
      begin
        store = Store.find_by(number: store_number)
        # Storeに紐づくemployeesを取得
        employees = store.employees
      rescue => e
        return render json: {status: "error", message: e.message}
      end
      # 指定した年月の範囲を作成
      date_range = Date.new(year, month)..Date.new(year, month).end_of_month

      employee_shifts = {}
      # EmployeeごとにShiftを取得
      employees.each do |employee|
        employee_shifts[employee.name] = employee.shift_dates.where(work_day: date_range)
      end
    rescue => e
      return render json: {status: "error", message: e.message}
    end
    render json: {status: "success", data: employee_shifts}
  end
end

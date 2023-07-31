class Api::V1::ManagerShiftsController < ApplicationController
  include Authentication
  before_action :authenticate_manager

  # sift_dateテーブルのIDを受け取りその日のシフトを返す
  # get_shift_by_day/:id
  def get_shift_by_day
    shift_time = ShiftTime.find_by(shift_date_id: params[:id])
    shift_date = ShiftDate.find(params[:id])
    render json: {start_time: shift_time.start_time, end_time: shift_time.end_time, date: shift_date}
  end

  # 店番と年月を受け取り、その店の従業員の名前とその従業員の持つshift_dateテーブルを返す
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
        employee_shifts[employee.name] = employee.shift_dates.where(work_day: date_range).includes(:shift_time).as_json(include: :shift_time)
      end
    rescue => e
      return render json: {status: "error", message: e.message}
    end
    render json: {status: "success", data: employee_shifts}
  end

  def update_shift
    ActiveRecord::Base.transaction do
      begin
        shift_date = ShiftDate.find(params[:id])
        shift_date.update!(is_attendance: :true)

        shift_time = ShiftTime.find_by(shift_date_id: params[:id])
        shift_time.update!(shift_time_params)

        render json: { status: "success", message: "Shift time updated successfully." }, status: 200
      rescue => e
        return render json: {status: "error", message: e.message}
      end
    end
  end

  private

  def shift_time_params
    params.require(:shift_time).permit(:start_time, :end_time)
  end

end

class Api::V1::DailyCalendersController < ApplicationController
  include Authentication
  # before_action :authenticate_employee
  before_action :set_store

  # get_daily_calenders/:store_number/:date
  def get_daily_calender
    employees = @store.employees.all
    date = params[:date]
    results = []
    employees.each do |employee|
      shift_dates = ShiftDate.joins(:employer_shifts).where('employer_shifts.employee_id = ? AND work_day = ?', employee.id, date)
      shift_dates.each do |shift_date|
        shift_times = ShiftTime.where(shift_date_id: shift_date.id)
        shift_times.each do |shift_time|
          # shift_timesには、特定の従業員の指定された日付の出勤時間が含まれています
          results << {
            employee_name: employee.name,
            shift_date_id: shift_date.id,
            start: shift_time.start_time,
            end: shift_time.end_time
          }
        end
      end
    end
    render json: { status: "success", shifts: results }
  end

  private

  def set_store
    # store_numberを元にstoreを取得
    @store = Store.find_by(number: params[:store_number])
    unless @store
      render json: { status: "error", message: "The store does not exist" }
    end
  end

end

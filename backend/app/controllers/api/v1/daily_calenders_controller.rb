class Api::V1::DailyCalendersController < ApplicationController
  include Authentication
  # before_action :authenticate_employee
  before_action :set_store

  # get_daily_calenders/:store_number/:date
  def get_daily_calender
    employees = @store.employees.all
    date = params[:date]
    results = []
    # 従業員をid、出勤日、trueかどうか判定し一致する一人ずつ取り出す
    employees.each do |employee|
      shift_dates = ShiftDate.joins(:employer_shifts)
      .where('employer_shifts.employee_id = ? AND work_day = ? AND is_attendance = ?', employee.id, date, true)
      # 日付の一致する出勤日を一つずつ取り出す
      shift_dates.each do |shift_date|
        shift_times = ShiftTime.where(shift_date_id: shift_date.id)
        # 出勤日に対応する出勤時間を一つずつ取り出すとともに、従業員名、出勤日、出勤時間の開始時刻と終了時刻をresultsに追加
        shift_times.each do |shift_time|
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

class Api::V1::EmployeeShiftDetailsController < ApplicationController
  # include Authentication
  # before_action :authenticate_employee
  before_action :set_store

  # employee_shift_detail/:store_number/:employee_name/:year/:month
  def get_employee_shift_detail
    employee = @store.employees.find_by(name: params[:employee_name])
    year = params[:year].to_i
    month = params[:month].to_i

    # 指定された年月の最初と最後の日付を取得
    start_date = Date.new(year, month, 1)
    end_date = Date.new(year, month, -1)

    # 指定した期間内でattendanceがtrueのworkdayを取得
    workdays =
    employee.employer_shifts
    .includes(:shift_date)
    .where("shift_dates.is_attendance = ?", true)
    # ?部分はプレースホルダーで、?の部分にstart_dateとend_dateが入り、以上以下の条件で検索される
    .where("shift_dates.work_day >= ? AND shift_dates.work_day <= ?", start_date, end_date)
    # shift_dates.workdayに検索結果全て入っているのでpluckメソッドで指定したカラムの値を配列で返す
    .pluck("shift_dates.work_day")
    workdays_count = workdays.length

    render json: { status: "success", workdays: workdays_count }
  end

  private
  def set_store
    @store = Store.find_by(number: params[:store_number])
    unless @store
      render json: { status: "error", message: "The store does not exist" }
    end
  end

end

class Api::V1::EmployeeShiftsController < ApplicationController
  include Authentication
  before_action :authenticate_employee, only: [:index, :create, :unapprove_month]

  #approve_monthテーブルのfalseのレコードを取得
  #この年月のデータをreact側に渡してworkdayと一緒に保存するようにする
  def get_submit_month
    @get_submit_month = ApproveMonth.where(is_approve: false)
    render json: {status: "success", data: @get_submit_month}
  end


  #ShiftDataとShiftTimeを作成し、それらをトランザクションで保存する
  #.save!とすることで保存に失敗した場合は例外を発生させる為、トランザクションでロールバックする
  def create
    ActiveRecord::Base.transaction do
      @shift_date = ShiftDate.new(shift_date_params)
      @shift_date.save!
      @shift_time = ShiftTime.new(shift_time_params.merge(shift_date_id: @shift_date.id))
      @shift_time.save!
      @employer_shifts = EmployerShift.new(shift_date_id: @shift_date.id, employee_id: @current_employee_id)
      @employer_shifts.save!
      render json: {status: "success", data: {shift_date: @shift_date, shift_time: @shift_time}}
    rescue ActiveRecord::RecordInvalid => e
      render json: {status: "error", message: e.message}
    end
  end

  private
  def shift_date_params
    params.require(:shift_date).permit(:work_day)
  end

  def shift_time_params
    params.require(:shift_time).permit(:start_time, :end_time)
  end

end

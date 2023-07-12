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
      params[:shiftDates].each do |shift|
        @shift_date = ShiftDate.new(shift_date_params(shift))
        @shift_date.save!
        @shift_time = ShiftTime.new(shift_time_params(shift).merge(shift_date_id: @shift_date.id))
        @shift_time.save!
        @employer_shifts = EmployerShift.new(shift_date_id: @shift_date.id, employee_id: @current_employee_id)
        @employer_shifts.save!
      end
      render json: {status: "create", data: {shift_date: params[:shiftDates], shift_time: params[:shiftTimes]}}
    rescue ActiveRecord::RecordInvalid => e
      render json: {status: "error", message: e.message}
    end
  end

  private
  def shift_date_params(shift)
    shift.require(:shift_date).permit(:work_day)
  end

  def shift_time_params(shift)
    shift.require(:shift_time).permit(:start_time, :end_time)
  end

end

class Api::V1::EmployeeShiftsController < ApplicationController
  include Authentication
  before_action :authenticate_employee, only: [:index, :create, :unapprove_month, :get_submit_month]

  #approve_monthテーブルのfalseのレコードを取得
  #この年月のデータをreact側に渡してworkdayと一緒に保存するようにする
  #get_submit_month
  def get_submit_month
    Rails.logger.debug "Current employee ID: #{@current_employee_id}"
    employee = Employee.find(@current_employee_id)
    store = Store.find(employee.store_id)
    if employee.present?
      @get_submit_month = ApproveMonth.where(is_approve: false,  store_id: employee.store.id)
      render json: {status: "success", data: @get_submit_month}
    else
      render json: {status: "error", message: "store_numberが不正です"}
    end
  end

  def create
    # Start transaction
    ActiveRecord::Base.transaction do
      params[:shiftDates].each do |shift|
        begin
          # EmployerShiftシフトレコードにemployee_idとwork_day（shift_dateテーブルを結合）が一致するレコードを取得
          @employer_shift = EmployerShift.joins(:shift_date).find_by(employee_id: @current_employee_id, shift_dates: {work_day: shift_date_params(shift)[:work_day]})

          # EmployerShiftテーブルにレコードが存在しない場合は、ShiftDateとShiftTimeを作成し、EmployerShiftを作成する
          if @employer_shift.nil?
            @shift_date = ShiftDate.create!(shift_date_params(shift))
            @shift_time = ShiftTime.create!(shift_time_params(shift).merge(shift_date_id: @shift_date.id))
            @employer_shift = EmployerShift.create!(employee_id: @current_employee_id, shift_date_id: @shift_date.id)
          else
            # EmployerShiftテーブルにレコードが存在する場合は、ShiftDateとShiftTimeを更新する
            @shift_time = ShiftTime.find_by(shift_date_id: @employer_shift.shift_date_id)
            @shift_time.update!(shift_time_params(shift))
          end
        rescue ActiveRecord::RecordInvalid => e
          render json: {status: "error", message: e.message}
          return
        end
      end
      render json: {status: "create", data: {shift_date: params[:shiftDates], shift_time: params[:shiftTimes]}}
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

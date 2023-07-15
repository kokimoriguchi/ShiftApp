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
        begin
          # find_or_initialize_byメソッドで、既に存在する場合は取得、存在しない場合は新規作成する
          @shift_date = ShiftDate.find_or_initialize_by(shift_date_params(shift))
          @shift_date.is_attendance = true
          @shift_date.save!
        rescue ActiveRecord::RecordInvalid => e
          render json: {status: "error", message: "ShiftDate error: #{e.message}"}
          return
        end

        begin
          @shift_time = ShiftTime.new(shift_time_params(shift).merge(shift_date_id: @shift_date.id))
          @shift_time.save!
        rescue ActiveRecord::RecordInvalid => e
          render json: {status: "error", message: "ShiftTime error: #{e.message}"}
          return
        end

        begin
          @employer_shifts = EmployerShift.new(shift_date_id: @shift_date.id, employee_id: @current_employee_id)
          @employer_shifts.save!
        rescue ActiveRecord::RecordInvalid => e
          render json: {status: "error", message: "EmployerShift error: #{e.message}"}
          return
        end
      end

      # 月初の日付を取得
      first_day = Date.parse(params[:shiftDates][0][:shift_date][:work_day]).beginning_of_month
      last_day = first_day.end_of_month
      # 月初から月末までの日付を作成
      (first_day..last_day).each do |date|
        begin
          # 作成した日付がShiftDateに存在するか確認
          unless ShiftDate.exists?(work_day: date)
            # 存在しない場合は、is_attendanceをfalseで作成
            ShiftDate.create!(work_day: date, is_attendance: false)
          end
        rescue ActiveRecord::RecordInvalid => e
          render json: {status: "error", message: "ShiftDate error: #{e.message}"}
          return
        end
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

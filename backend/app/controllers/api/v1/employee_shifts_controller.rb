class Api::V1::EmployeeShiftsController < ApplicationController


  #approve_monthテーブルのfalseのレコードを取得
  def unapprove_month
    @unapprove_month = ApproveMonth.where(is_approve: false)
    render json: {status: "success", data: @unapprove_month}
  end


  def create

  end


end

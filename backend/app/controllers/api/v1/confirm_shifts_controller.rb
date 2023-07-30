class Api::V1::ConfirmShiftsController < ApplicationController

  #get_approve_month/:store_number
  def get_approve_month
    store = Store.find_by(number: params[:store_number])
    approve_months = store.approve_months.where(is_approve: true)
    if approve_months.present?
      render json: approve_months.map { |date| { year: date.year, month: date.month }}
    else
      render json: { message: "No approved month found" }, status: :not_found
    end
  end
end

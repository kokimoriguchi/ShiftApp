class Api::V1::ApproveMonthsController < ApplicationController
  include Authentication
  before_action :authenticate_manager, only: [:create]

  def create
    approve_month = ApproveMonth.new(approve_month_params)
    approve_month.store_id = @current_manager.store_id
    if approve_month.save
      render json: {status: "success", data: approve_month}
    else
      render json: {status: "error", message: approve_month.errors.full_messages}
    end
  end

  private
  def approve_month_params
    params.require(:approve_month).permit(:year, :month)
  end
end

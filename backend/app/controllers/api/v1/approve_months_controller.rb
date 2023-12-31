class Api::V1::ApproveMonthsController < ApplicationController
  include Authentication
  before_action :authenticate_manager, only: [:create, :confirm_month]

  def create
    # 現在の店舗においてまだ未公開のApproveMonthが存在するか確認
    existing_unpublished_month = ApproveMonth.find_by(store_id: @current_manager.store_id, is_approve: false)

    # 未公開のApproveMonthが既に存在する場合はエラーを返す
    if existing_unpublished_month
      render json: {status: "error", message: "未公開のシフトが既に存在します。先にシフトを公開してください。"}
    else

    # 未公開のApproveMonthが存在しない場合は新しいレコードを作成
      approve_month = ApproveMonth.new(approve_month_params)
      approve_month.store_id = @current_manager.store_id
      if approve_month.save
        render json: {status: "success", data: approve_month}
      else
        render json: {status: "error", message: approve_month.errors.full_messages}
      end
    end
  end

  #confirm_shift/:store_number
  def confirm_shift
    ActiveRecord::Base.transaction do
      begin
        store_id = Store.find_by(number: params[:store_number])
        approve_month = ApproveMonth.find_by(store_id: store_id, year: params[:year], month: params[:month])

        if approve_month.nil?
          return render json: {status: "error", message: "ApproveMonth not found"}
        end

        approve_month.update!(is_approve: true)
        render json: {status: "success", message: "シフトを公開しました。"}

      rescue => exception
        return render json: {status: "error", message: exception.message}
      end
    end
  end

  private
  def approve_month_params
    params.require(:approve_month).permit(:year, :month)
  end
end

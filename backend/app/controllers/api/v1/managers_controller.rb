class Api::V1::ManagersController < ApplicationController
  before_action :set_store, only: [:create]

  def create
    if @store.employees.where(is_manager: true).exists?
      render json: { status: "error", message: "The store already has a manager" }
    else
      @manager = @store.employees.new(manager_params.merge(is_manager: true))
      if @manager.save
        token = JwtService.encode(@manager.id)
        cookies[:token] = { value: token, httponly: true }
        render json: {status: "create", data: @manager}
      else
        render json: { status:"error", message: @manager.errors.full_messages}
      end
    end
  end

  private

  def set_store
    @store = Store.find_by(number: params[:store_number])
    unless @store
      render json: { status: "error", message: "The store does not exist" }
    end
  end

  def manager_params
    params.require(:manager).permit(:name, :number, :password)
  end
end

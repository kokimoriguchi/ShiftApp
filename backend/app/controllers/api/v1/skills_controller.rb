class Api::V1::SkillsController < ApplicationController
  include Authentication
  before_action :authenticate_manager
  before_action :set_store

  def create
    begin
      skill = Skill.new(skill_params.merge({store_id: @store.id}))
      skill.save!
      render json: { status: "success", message: "Skill created successfully." }, status: 200
    rescue => e
      return render json: {status: "error", message: e.message}
    end
  end

  private
  def set_store
    @store = Store.find_by(number: params[:store_number])
  end

  def skill_params
    params.require(:skill).permit(:name)
  end
end

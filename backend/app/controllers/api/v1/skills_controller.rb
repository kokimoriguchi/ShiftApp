class Api::V1::SkillsController < ApplicationController
  include Authentication
  before_action :authenticate_manager
  before_action :set_store

  def create
    begin
      skill = Skill.new(skill_params)
      skill.save!
      render json: { status: "success", message: "Skill created successfully." }, status: 200
    rescue => e
      return render json: {status: "error", message: e.message}
    end
  end

  private
  def set_store
    @store = Store.find(params[:store_id])
  end
end

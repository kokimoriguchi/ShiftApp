class Api::V1::SkillsController < ApplicationController
  include Authentication
  before_action :authenticate_manager
  before_action :set_store

  #そのstoreのIdを元に店舗のスキル一覧を取得
  # skills/:store_number
  def index
    skills = @store.skills
    render json: { status: "success", skills: skills }, status: 200
  end

  #そのstoreのIdを元に店舗のスキルを作成
  # skill_create/:store_number
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

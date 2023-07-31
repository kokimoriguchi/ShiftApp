class Api::V1::SkillsController < ApplicationController
  include Authentication
  before_action :authenticate_manager
  before_action :set_store, only: [:index, :create]

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

  # skills/destroy
  def destroy
    ActiveRecord::Base.transaction do
      skill_ids = params[:skill_ids]
      Skill.where(id: skill_ids).destroy_all

      render json: {status: "success", message: "Skills deleted successfully."}, status: 200
    end
  end

  #employeeIDと複数のskillIDを受け取り、employee_skillsテーブルに保存。すでにある場合は更新する。
  #employee_add_skills/:employee_id
  def employee_add_skills
    begin
      employee = Employee.find(params[:employee_id])
      return render json: {status: "error", message: "Employee not found."}, status: 404 unless employee

      #skill_idsの配列の中身を一つずつ取り出して、employee.skillsにない場合は追加する。
      params[:skill_ids].each do |skill_id|
        skill = Skill.find(skill_id)
        unless employee.skills.include?(skill)
          #下記のように書くと、employee_skillsテーブルに保存される。（中間テーブルで`has_many :through`の記述がある場合）
          employee.employee_skills.create!(skill_id: skill_id,level: 1)
        end
      end

      render json: { status: "success", message: "Employee skills updated successfully." }, status: 200
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

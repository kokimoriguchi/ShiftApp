class Skill < ApplicationRecord
  belongs_to :store
  has_many :employee_skills , dependent: :destroy
end

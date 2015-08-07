class List < ActiveRecord::Base
  has_many :cards, dependent: :destroy
  belongs_to :board

  validates :title, :board, :ord, presence: true
end

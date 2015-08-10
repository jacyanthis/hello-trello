class Card < ActiveRecord::Base
  belongs_to :list
  has_many :card_assignments, dependent: :destroy
  has_many :todo_items, dependent: :destroy

  validates :title, :list, :ord, presence: true
end

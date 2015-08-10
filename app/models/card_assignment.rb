class CardAssignment < ActiveRecord::Base
  belongs_to :card
  belongs_to :user

  validates :card, :user, presence: true
end

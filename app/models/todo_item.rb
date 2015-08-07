class TodoItem < ActiveRecord::Base
  belongs_to :card

  validates :card, :title, presence: true
  validates :done, inclusion: { in: [true, false] }
end

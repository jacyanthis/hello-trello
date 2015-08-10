class Board < ActiveRecord::Base
  has_many :lists, dependent: :destroy
  belongs_to :user

  validates :title, :user, presence: true
end

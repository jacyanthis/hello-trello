class User < ActiveRecord::Base
  attr_reader :password

  has_many :boards, dependent: :destroy
  has_many :card_assignments, dependent: :destroy

  after_initialize :ensure_sesion_token

  validates :password_digest, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil? || !user.is_password?(password)
    user
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_sesion_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

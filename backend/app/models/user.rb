class User < ApplicationRecord
  before_save :downcase_email

  has_secure_password

  PASSWORD_COMPLEXITY_REGEX = /\A(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,128}\z/

  validates :email, presence: true, length: { maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP, message: I18n.t("errors.messages.invalid_email") },
                    uniqueness: true
  validates :password, presence: true, length: { minimum: 8, maximum: 72 },
                       format: { with: PASSWORD_COMPLEXITY_REGEX, message: I18n.t("errors.messages.password_complexity") }
  validates :password_confirmation, presence: true

  private

    def downcase_email
      self.email = email.downcase
    end
end

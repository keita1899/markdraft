class Api::V1::Auth::PasswordsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :validate_current_password, only: :update
  before_action :validate_new_password, only: :update

  def update
    if current_user.update(password_params.except(:current_password))
      render json: { message: "パスワードが更新されました" }, status: :ok
    else
      render json: { error: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def password_params
      params.require(:user).permit(:current_password, :password, :password_confirmation)
    end

    def validate_current_password
      unless current_user.valid_password?(password_params[:current_password])
        render json: { error: "現在のパスワードが正しくありません" }, status: :unprocessable_entity
      end
    end

    def validate_new_password
      if password_params[:current_password] == password_params[:password]
        render json: { error: "新しいパスワードは現在のパスワードと異なるものを設定してください" }, status: :unprocessable_entity
      end
    end
end

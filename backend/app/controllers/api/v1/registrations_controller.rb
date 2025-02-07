class Api::V1::RegistrationsController < ApplicationController
  wrap_parameters false

  def create
    user = User.new(user_params)
    if user.save
      token = encode_token({ user_id: user.id })
      render json: { message: "新規登録が成功しました", token: token }, status: :created
    else
      render json: { message: "登録に失敗しました。再度試してください。", errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end

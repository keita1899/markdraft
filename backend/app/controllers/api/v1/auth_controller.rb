class Api::V1::AuthController < ApplicationController
  wrap_parameters false

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { message: "ログインしました", token: token }, status: :ok
    else
      render json: { message: "メールアドレスかパスワードが間違っています" }, status: :unauthorized
    end
  end
end

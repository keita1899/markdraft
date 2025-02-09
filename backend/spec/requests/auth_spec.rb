require "rails_helper"

RSpec.describe "Auth", type: :request do
  describe "POST /api/v1/auth" do
    before { create(:user, email: "test@example.com", password: "password123") }

    let(:valid_params) do
      {
        email: "test@example.com",
        password: "password123",
      }
    end

    let(:invalid_params) do
      {
        email: "wrong@example.com",
        password: "password123",
      }
    end

    context "ログインしていない場合" do
      context "入力するパラメータが正しい場合" do
        it "リクエストが成功する" do
          post "/api/v1/auth", params: valid_params, as: :json

          expect(response).to have_http_status(:ok)
          json = JSON.parse(response.body)
          expect(json["message"]).to eq("ログインしました")
          expect(json).to have_key("token")
        end
      end

      context "入力するパラメータが間違っている場合" do
        it "リクエストが失敗する" do
          post "/api/v1/auth", params: invalid_params, as: :json

          expect(response).to have_http_status(:unauthorized)
          json = JSON.parse(response.body)
          expect(json["message"]).to include("メールアドレスかパスワードが間違っています")
        end
      end
    end
  end
end

require "rails_helper"

RSpec.describe "Auth", type: :request do
  describe "POST /api/v1/auth" do
    let(:valid_params) do
      {
        email: "test@example.com",
        password: "password123",
        password_confirmation: "password123",
      }
    end

    let(:invalid_params) do
      {
        email: "",
        password: "password123",
        password_confirmation: "password123",
      }
    end

    let(:duplicate_params) do
      {
        email: "duplicate@example.com",
        password: "password123",
        password_confirmation: "password123",
      }
    end

    context "ログインしていない場合" do
      context "入力するパラメータが正しい場合" do
        it "リクエストが成功する" do
          expect {
            post "/api/v1/auth", params: valid_params, as: :json
          }.to change { User.count }.by(1)

          expect(response).to have_http_status(:ok)
          expect(response.headers).to include("access-token")
          expect(response.headers).to include("client")
          expect(response.headers).to include("uid")
        end
      end

      context "入力するパラメータが間違っている場合" do
        it "リクエストが失敗する" do
          post "/api/v1/auth", params: invalid_params, as: :json

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "メールアドレスが重複している場合" do
        before { create(:user, email: "duplicate@example.com") }

        it "リクエストが失敗する" do
          post "/api/v1/auth", params: duplicate_params, as: :json

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end
end

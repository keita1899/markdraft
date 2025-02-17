require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
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
        it "新規登録が成功する" do
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
        it "unprocessable_entity エラーが返る" do
          post "/api/v1/auth", params: invalid_params, as: :json

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "メールアドレスが重複している場合" do
        before { create(:user, email: "duplicate@example.com") }

        it "unprocessable_entity エラーが返る" do
          post "/api/v1/auth", params: duplicate_params, as: :json

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  describe "DELETE /destroy" do
    let!(:user) { create(:user) }
    let(:headers) { user.create_new_auth_token }
    let(:valid_password) do { password: "password123" } end
    let(:invalid_password) do { password: "wrongpassword123" } end

    context "ログインしている場合" do
      it "パスワードが正しければアカウントが削除される" do
        expect {
          delete "/api/v1/auth", headers: headers, params: valid_password
        }.to change { User.count }.by(-1)

        expect(response).to have_http_status(:ok)
        expect(response.body).to include("アカウントが削除されました")
      end

      it "パスワードが間違っていれば 422 エラーが返る" do
        delete "/api/v1/auth", headers: headers, params: invalid_password
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["error"]).to include("パスワードが正しくありません")
      end
    end

    context "ログインしていない場合" do
      it "401 エラーが返る" do
        delete "/api/v1/auth"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

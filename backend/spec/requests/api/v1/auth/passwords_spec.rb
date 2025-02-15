require "rails_helper"

RSpec.describe "Api::V1::Auth::Passwords", type: :request do
  describe "PATCH /api/v1/auth/password" do
    let!(:user) { create(:user) }
    let(:headers) { user.create_new_auth_token }
    let(:valid_params) do { user: { current_password: "password123", password: "newpassword123", password_confirmation: "newpassword123" } } end
    let(:invalid_current_password_params) do
      { user: { current_password: "wrongpassword", password: "newpassword123", password_confirmation: "newpassword123" } }
    end
    let(:same_password_params) do
      { user: { current_password: "password123", password: "password123", password_confirmation: "password123" } }
    end
    let(:password_mismatch_params) do
      { user: { current_password: "password123", password: "newpassword123", password_confirmation: "differentpassword123" } }
    end
    let(:empty_password_params) do
      { user: { current_password: "password123", password: "", password_confirmation: "" } }
    end

    context "ログインしている場合" do
      context "入力するパラメータが正しい場合" do
        it "パスワードが変更される" do
          patch "/api/v1/auth/password", headers: headers, params: valid_params

          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)["message"]).to eq("パスワードが更新されました")
        end
      end

      context "現在のパスワードが間違っている場合" do
        it "パスワード変更が失敗し、unprocessable_entity エラーが返る" do
          patch "/api/v1/auth/password", headers: headers, params: invalid_current_password_params

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)["error"]).to include("現在のパスワードが正しくありません")
        end
      end

      context "現在のパスワードと新しいパスワードが同じ場合" do
        it "パスワード変更が失敗し、unprocessable_entity エラーが返る" do
          patch "/api/v1/auth/password", headers: headers, params: same_password_params

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)["error"]).to include("新しいパスワードは現在のパスワードと異なるものを設定してください")
        end
      end

      context "新しいパスワードと確認用パスワードが一致しない場合" do
        it "パスワード変更が失敗し、unprocessable_entity エラーが返る" do
          patch "/api/v1/auth/password", headers: headers, params: password_mismatch_params

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)["error"]).to include("パスワード確認用とパスワードの入力が一致しません")
        end
      end

      context "パスワードが空の場合" do
        it "パスワード変更が失敗し、unprocessable_entity エラーが返る" do
          patch "/api/v1/auth/password", headers: headers, params: empty_password_params

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)["error"]).to include("パスワードを入力してください")
        end
      end
    end

    context "ログインしていない場合" do
      it "unauthorized エラーが返る" do
        patch "/api/v1/auth/password"

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

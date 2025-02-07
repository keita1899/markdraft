require "rails_helper"

RSpec.describe "Registrations", type: :request do
  describe "POST /api/v1/registrations" do
    let(:valid_params) do
      {
        user: {
          email: "test@example.com",
          password: "password123",
          password_confirmation: "password123",
        },
      }
    end

    let(:invalid_params) do
      {
        user: {
          email: "",
          password: "password123",
          password_confirmation: "password123",
        },
      }
    end

    let(:duplicate_params) do
      {
        user: {
          email: "duplicate@example.com",
          password: "password123",
          password_confirmation: "password123",
        },
      }
    end

    context "ログインしていない場合" do
      context "入力するパラメータが正しい場合" do
        it "リクエストが成功する" do
          expect {
            post "/api/v1/registrations", params: valid_params, as: :json
          }.to change { User.count }.by(1)

          expect(response).to have_http_status(:created)
          json = JSON.parse(response.body)
          expect(json["message"]).to eq("新規登録が成功しました")
          expect(json).to have_key("token")
        end
      end

      context "入力するパラメータが間違っている場合" do
        it "リクエストが失敗する" do
          post "/api/v1/registrations", params: invalid_params, as: :json

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json["message"]).to include("登録に失敗しました。再度試してください。")
        end
      end

      context "メールアドレスが重複している場合" do
        before { create(:user, email: "duplicate@example.com") }

        it "リクエストが失敗する" do
          post "/api/v1/registrations", params: duplicate_params, as: :json

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json["errors"]).to include("メールアドレスはすでに存在します")
        end
      end
    end
  end
end

require "rails_helper"

RSpec.describe "Drafts", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let!(:draft) { create(:draft, user: user) }
  let(:valid_params) { { draft: { title: "Test Draft", content: "Test Content" } } }
  let(:invalid_params) { { draft: { title: "", content: "" } } }

  describe "GET /show" do
    context "ログインしている場合" do
      it "下書きを取得する" do
        get "/api/v1/drafts/#{draft.id}", headers: headers
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["title"]).to eq(draft.title)
      end
    end

    context "ログインしていない場合" do
      it "401エラーが返る" do
        get "/api/v1/drafts/#{draft.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST /create" do
    context "ログインしている場合" do
      context "パラメータが正しい場合" do
        it "下書きのデータがデータベースに登録される" do
          expect {
            post "/api/v1/drafts", params: valid_params, headers: headers
          }.to change { Draft.count }.by(1)
          expect(response).to have_http_status(:created)
          expect(JSON.parse(response.body)["title"]).to eq("Test Draft")
        end
      end

      context "パラメータが間違っている場合" do
        it "422エラーが返る" do
          post "/api/v1/drafts", params: invalid_params, headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)["errors"]).to include("タイトルを入力してください")
        end
      end
    end

    context "ログインしていない場合" do
      it "401エラーが返る" do
        post "/api/v1/drafts", params: valid_params
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PATCH /update" do
    context "ログインしている場合" do
      context "パラメータが正しい場合" do
        it "下書きのデータが更新される" do
          patch "/api/v1/drafts/#{draft.id}", params: { draft: { title: "Updated Title" } }, headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)["title"]).to eq("Updated Title")
        end
      end

      context "パラメータが間違っている場合" do
        it "422エラーが返る" do
          patch "/api/v1/drafts/#{draft.id}", params: invalid_params, headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)["errors"]).to include("タイトルを入力してください")
        end
      end
    end

    context "ログインしていない場合" do
      it "401エラーが返る" do
        patch "/api/v1/drafts/#{draft.id}", params: { draft: { title: "Updated Title" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

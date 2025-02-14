require "rails_helper"

RSpec.describe "Drafts", type: :request do
  let(:user) { create(:user) }
  let(:draft) { create(:draft, user: user) }
  let(:headers) { user.create_new_auth_token }
  let(:valid_params) { { draft: { title: "Test Draft", content: "Test Content" } } }
  let(:invalid_params) { { draft: { title: "", content: "" } } }

  describe "GET /index" do
    let!(:drafts) { create_list(:draft, 25, user: user) }
    let(:per_page) { 10 }
    let(:total_pages) { (drafts.count / per_page.to_f).ceil }

    context "ログインしている場合" do
      context "ページが指定されていない場合" do
        it "デフォルトで1ページ目の下書き一覧を取得する" do
          get "/api/v1/drafts", headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)["drafts"]).to be_an_instance_of(Array)
          expect(JSON.parse(response.body)["meta"]).to include(
            "total_pages" => total_pages,
            "current_page" => 1,
          )
        end
      end

      context "1ページ目の場合" do
        it "1ページ目の下書き一覧を取得する" do
          get "/api/v1/drafts/?page=1", headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)["drafts"]).to be_an_instance_of(Array)
          expect(JSON.parse(response.body)["meta"]).to include(
            "total_pages" => total_pages,
            "current_page" => 1,
          )
        end
      end

      context "2ページ目の場合" do
        it "2ページ目の下書き一覧を取得する" do
          get "/api/v1/drafts/?page=2", headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)["drafts"]).to be_an_instance_of(Array)
          expect(JSON.parse(response.body)["meta"]).to include(
            "total_pages" => total_pages,
            "current_page" => 2,
          )
        end
      end
    end

    context "ログインしていない場合" do
      it "401エラーが返る" do
        get "/api/v1/drafts"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

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

  describe "DELETE /destroy" do
    let!(:draft) { create(:draft, user: user) }

    context "ログインしている場合" do
      it "下書きのデータが1件削除される" do
        expect {
          delete "/api/v1/drafts/#{draft.id}", headers: headers
        }.to change { Draft.count }.by(-1)

        expect(response).to have_http_status(:ok)
        expect(response.body).to include("下書きを削除しました")
      end
    end

    context "ログインしていない場合" do
      it "401エラーが返る" do
        delete "/api/v1/drafts/#{draft.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

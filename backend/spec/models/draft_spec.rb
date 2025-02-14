require "rails_helper"

RSpec.describe Draft, type: :model do
  describe "バリデーション" do
    let!(:draft) { create(:draft) }

    context "正しい値の場合" do
      it "成功する" do
        expect(draft).to be_valid
      end

      it "タイトルの文字数が255文字以下だと成功する" do
        draft.title = "a" * 255
        expect(draft).to be_valid
      end
    end

    context "間違った値の場合" do
      it "タイトルが空だと失敗する" do
        draft.title = nil
        expect(draft).to be_invalid
        expect(draft.errors[:title]).to include("を入力してください")
      end

      it "本文が空だと失敗する" do
        draft.content = nil
        expect(draft).to be_invalid
        expect(draft.errors[:content]).to include("を入力してください")
      end

      it "タイトルの文字数が256文字以上だと失敗する" do
        draft.title = "a" * 256
        expect(draft).to be_invalid
        expect(draft.errors[:title]).to include("は255文字以内で入力してください")
      end
    end
  end

  describe "リレーション" do
    it "ユーザーが関連付けられている" do
      user = create(:user)
      draft = create(:draft, user: user)

      expect(draft.user).to eq(user)
    end

    it "ユーザーが削除されると関連する下書きも削除される" do
      user = create(:user)
      create(:draft, user: user)

      expect { user.destroy }.to change { Draft.count }.by(-1)
    end
  end
end

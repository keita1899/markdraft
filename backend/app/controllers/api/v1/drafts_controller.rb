class Api::V1::DraftsController < Api::V1::BaseController
  before_action :authenticate_user!

  include Pagination

  def index
    drafts = current_user.drafts.order(created_at: :desc).page(params[:page] || 1).per(10)
    render json: drafts, meta: pagination(drafts), adapter: :json
  end

  def create
    draft = current_user.drafts.new(draft_params)
    if draft.save
      render json: draft, status: :created
    else
      render json: { errors: draft.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    draft = find_draft

    if draft.update(draft_params)
      render json: draft, status: :ok
    else
      render json: { errors: draft.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    draft = find_draft
    render json: draft
  end

  def destroy
    draft = find_draft
    if draft.destroy
      render json: { message: "下書きを削除しました" }, status: :ok
    else
      render json: { error: "下書きの削除に失敗しました" }, status: :internal_server_error
    end
  end

  private

    def find_draft
      current_user.drafts.find(params[:id])
    end

    def draft_params
      params.require(:draft).permit(:title, :content)
    end
end

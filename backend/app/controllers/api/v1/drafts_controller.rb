class Api::V1::DraftsController < Api::V1::BaseController
  before_action :authenticate_user!

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

  private

    def find_draft
      current_user.drafts.find(params[:id])
    end

    def draft_params
      params.require(:draft).permit(:title, :content)
    end
end

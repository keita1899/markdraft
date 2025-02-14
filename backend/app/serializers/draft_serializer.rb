class DraftSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :title, :content, :created_at, :relative_updated_at

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end

  def relative_updated_at
    "#{time_ago_in_words(object.updated_at)}前"
  end
end

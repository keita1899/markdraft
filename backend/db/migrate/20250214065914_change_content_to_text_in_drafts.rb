class ChangeContentToTextInDrafts < ActiveRecord::Migration[7.0]
  def up
    change_column :drafts, :content, :text
  end

  def down
    change_column :drafts, :content, :string
  end
end

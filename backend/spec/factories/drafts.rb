FactoryBot.define do
  factory :draft do
    title { Faker::Lorem.sentence(word_count: 3) }
    content { Faker::Lorem.paragraph(sentence_count: 5) }
    association :user
  end
end

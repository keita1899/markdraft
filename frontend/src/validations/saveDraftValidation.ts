export const saveDraftValidation = {
  title: {
    required: 'タイトルは必須です',
    maxLength: {
      value: 255,
      message: 'タイトルは255文字以内で入力してください',
    },
  },
  content: {
    required: '本文は必須です',
  },
}

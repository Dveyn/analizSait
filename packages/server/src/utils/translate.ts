const translate = require('yandex-translate-api');

export const translateText = async (errorMessage: string) => {
  try {
    const translatedResult = await translate(errorMessage, { to: 'ru' });
    return translatedResult.text[0];
  } catch (error) {
    console.error('Произошла ошибка при переводе', error);
    return errorMessage; // Вернем оригинальное сообщение в случае ошибки перевода
  }
};

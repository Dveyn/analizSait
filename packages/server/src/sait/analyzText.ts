import axios from 'axios';
import cheerio from 'cheerio';

export const analuzText = async (page: string) => {
  try {
   
    const $ = cheerio.load(page);

    const textElements = $('p, span, div');
    let totalTextLength = 0;

    textElements.each((index, element) => {
      totalTextLength += $(element).text().length;
    });

    const totalWords = totalTextLength > 0 ? page.split(/\s+/).length : 0;
    const keywordDensity = (totalWords > 0) ? (totalWords / 100) : 0; // Плотность ключевых слов

    const stopWords = ['и', 'в', 'на', 'не', 'что', 'с', 'по', 'как', 'а', 'к'];

    const stopWordsCount = stopWords.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = page.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);

    const stopWordsPercentage = (stopWordsCount / totalWords) * 100;

    return {
      totalTextLength,
      totalWords,
      keywordDensity,
      stopWordsCount,
      stopWordsPercentage
    };
  } catch (error) {
    console.error(error);
    return {isError: true};
  }
}

// totalTextLength: Общая длина текста на странице. Это количество символов, включая пробелы и знаки пунктуации.

// totalWords: Общее количество слов на странице. Для этого мы разбиваем текст на слова, используя пробелы и знаки пунктуации как разделители.

// keywordDensity: Плотность ключевых слов. Это отношение общего числа слов к 100. Например, если на странице 500 слов, то плотность ключевых слов будет 5%.

// stopWordsCount: Количество стоп-слов на странице. Слова, которые обычно не несут смысловой нагрузки в тексте (например, предлоги, союзы, местоимения).

// stopWordsPercentage: Процентное содержание стоп-слов относительно общего количества слов. Например, если из 500 слов 100 - стоп-слова, то это будет 20%.

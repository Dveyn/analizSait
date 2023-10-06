import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer'
import { getKeywords } from './getKeywords';

export const analuzText = async (url: string) => {
  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto(url);
    await page.waitForSelector('body'); 
  
    await page.evaluate(() => {
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => script.remove());
    });
  
    const content = await page.content();
   
    const $ = cheerio.load(content);

    const allText = $('body').text();
    const totalTextLength = allText.length;
  
    const totalWords = totalTextLength > 0 ? allText.split(/\s+/).length : 0;

   

  
    const stopWords = ['и', 'в', 'на', 'не', 'что', 'с', 'по', 'как', 'а', 'к'];

    const stopWordsCount = stopWords.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = content.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);

    const stopWordsPercentage = (stopWordsCount / totalWords) * 100;

    const keywords = await getKeywords(allText, stopWords);
    const keywordDensity = (totalWords > 0) ? (totalWords / 100) : 0; // Плотность ключевых слов


    return {
      totalTextLength, 
      totalWords,
      keywordDensity,
      stopWordsCount,
      stopWordsPercentage,
      keywords
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

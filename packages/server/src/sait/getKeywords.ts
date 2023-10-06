import natural from 'natural';

export const getKeywords = (text: string, stopwords:string[]) => {
  const tfidf = new natural.TfIdf();
  const tokenizer = new natural.WordTokenizer();
  // Разбиваем текст на слова
  const words = tokenizer.tokenize(text);

  // Обучаем TF-IDF модель на этом тексте
  if (words) {
    const filteredWords = words.filter(word => !stopwords.includes(word.toLowerCase()));
    tfidf.addDocument(filteredWords.join(' '));
  }

  // Получаем ключевые слова
  const keywords = tfidf.listTerms(0 /* index документа */);

  // Возвращаем все ключевые слова
  const keywordList = keywords.map(keyword => keyword.term);

  // Посчитаем частоту каждого ключевого слова в тексте
  const keywordFrequency: Record<string, number> = {};
  keywordList.forEach(keyword => {
    keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
  });

  return {
    keywords: keywordList,
    frequency: keywordFrequency
  };
};

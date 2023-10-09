const puppeteer = require('puppeteer');

export const speedLoad = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load' });

  // Измерение скорости загрузки на ПК
  const pcPerformance = await page.evaluate(() => JSON.stringify(window.performance));

  console.log(`Скорость загрузки на ПК (${url}):`, pcPerformance);

  // Измерение скорости загрузки на мобильном устройстве
  await page.emulate(puppeteer.devices['iPhone 6']);
  await page.reload({ waitUntil: 'load' });

  const mobilePerformance = await page.evaluate(() => JSON.stringify(window.performance));

  console.log(`Скорость загрузки на мобильном (${url}):`, mobilePerformance);

  // Анализ мобильной адаптивности
  const isMobileFriendly = await page.evaluate(() => {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return viewportWidth <= 768; // Здесь задайте свои условия для определения мобильной версии
  });

  await browser.close();
}

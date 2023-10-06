import pool from '../utils/db';
import cheerio from 'cheerio';
import { getPage } from './getPage';
import { getStatus } from './getStatus';
import { getNotFount } from './getNotFound';
import { validationHTML } from './validationHTML';
import { speedTest } from './speedTest';
import { analuzText } from './analyzText';


export const seoAnalyz = async (id: number) => {
  //TODO: Нужно так же по user_id проверять
  const saitQ = await pool.query("SELECT * FROM user_sait WHERE id = $1", [id]);

  if (saitQ.rowCount === 0) {
    return { isError: true, message: "Сайт не найден" }
  }

  const sait = saitQ.rows[0];
  if (!sait.is_verefy) {
    return { isError: true, message: "Сайт не подтвержден" }
  }

  const url = sait.url;
  const page = await getPage(`${url}`);
  const startTime = Date.now();
  const $ = cheerio.load(page);

  const pageTitle = $('title').text();
  const metaKeywords = $('meta[name=keywords]').attr('content');
  const metaDescription = $('meta[name=description]').attr('content');
  const headings = {
    h1: $('h1').length,
    h2: $('h2').length,
    h3: $('h3').length,
    h4: $('h4').length,
    h5: $('h5').length,
    h6: $('h6').length
  };

  const loadTime = (Date.now() - startTime) / 1000;
  const page404 = await getNotFount(url);

  const openGraphTags = $('meta[property^="og"]').length;
  const status = await getStatus(url);
  const validation = await validationHTML(page)
  const speed = await speedTest(url);
  const analyzText = await analuzText(url);

  const internalLinks = $('a').filter((index, element) => {
    const href = $(element).attr('href');
    return typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');
  });

  const internalLinksCount = internalLinks.length;
  const htmlSize = Buffer.from(page).length;
  const faviconLink = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');


  const socialLinks = {
    facebook: $('a[href*="facebook.com"]').attr('href'),
    twitter: $('a[href*="twitter.com"]').attr('href'),
    instagram: $('a[href*="instagram.com"]').attr('href'),
    linkedin: $('a[href*="linkedin.com"]').attr('href'),
    tenChat: $('a[href*="tenchat.ru"]').attr('href'),
    vk: $('a[href*="vk.com"]').attr('href')
  };

  return {
    isError: false,
    pageTitle,
    metaKeywords,
    metaDescription,
    headings,
    loadTime,
    openGraphTags,
    status,
    page404,
    validation,
    speed,
    url,
    analyzText,
    internalLinksCount,
    htmlSize,
    faviconLink,
    socialLinks
  };
}

import pool from '../utils/db';
import cheerio from 'cheerio';
import { getPage } from './getPage';
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
  const page = await getPage(url);
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
 
  return {
    isError: false, 
    pageTitle,
    metaKeywords,
    metaDescription,
    headings,
    loadTime
  }
}

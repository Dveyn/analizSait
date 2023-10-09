import cheerio from 'cheerio';
import pool from "../utils/db";


export const setPageSait = async (userId: number, saitId: number, sitemap: string) => {

  const $ = cheerio.load(sitemap, { xmlMode: true });
  const urls = $('urlset > url > loc').map((index, element) => $(element).text()).get();
  console.log(sitemap);

  try {
    await pool.query('DELETE FROM public.sait_page WHERE sait_id = $1', [saitId]);
  } catch (error) {
    return { isError: true, message: error };
  }
  try {
    for (const url of urls) {
      const query = `
        INSERT INTO public.sait_page (user_id ,sait_id, url)
        VALUES ($1, $2, $3)
      `;
      const values = [userId, saitId, url];

      await pool.query(query, values);
    }

    return { isError: false, message: "Ссылки успешно сохранены" };
  } catch (error) {
    return { isError: true, message: error };
  }
};

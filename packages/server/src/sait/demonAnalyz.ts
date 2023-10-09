import pool from "../utils/db";
import { getSitemap } from "./getSaitmap";
import { setAnalyz } from "./setAlalyz";
import { setPageSait } from "./setPageSait";

export const demonAnalyz = async () => {

  const saitsResult = await pool.query(`SELECT * FROM user_sait`);
  const setPageSaitPromises = saitsResult.rows.map(async (sait) => {
    const { id, url, user_id } = sait;
    let sitemap = await getSitemap(url);
    if (!sitemap) sitemap = `<urlset><url><loc>${url}</loc></url></urlset>`;
    const saveResult = await setPageSait(user_id, id, sitemap);
  });

  await Promise.all(setPageSaitPromises);

  const pagesResult = await pool.query(`SELECT * FROM  sait_page`);
  const setAnalyzPromises = pagesResult.rows.map(async (page) => {
    await setAnalyz(page.user_id, page.id);
  });

  await Promise.all(setAnalyzPromises);
}


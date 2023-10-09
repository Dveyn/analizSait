import pool from "../utils/db";
import { seoAnalyz } from "./seoAnalyz";

export const setAnalyz = async (idUser: number, idPage: number) => {

  const currentDate = new Date().toISOString().split('T')[0];
  try {
    const {
      url,
      pageTitle,
      metaKeywords,
      metaDescription,
      headings,
      openGraphTags,
      status,
      page404,
      analyzText,
      internalLinksCount,
      htmlSize,
      faviconLink,
      socialLinks,
      robots,
      sitemap,
      dissalow
    } = await seoAnalyz(idPage);

    const query = `
      INSERT INTO analyz_page (
        id_user,
        id_page,
        url_page,
        date,
        page_title,
        "metaKeywords",
        "metaDescription",
        headings,
        "openGraphTags",
        status,
        page404,
        "analyzText",
        "internalLinksCount",
        "htmlSize",
        "faviconLink",
        "socialLinks",
        robots,
        sitemap,
        dissalow
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    `;

    const values = [
      idUser,
      idPage,
      url,
      currentDate,
      pageTitle,
      metaKeywords,
      metaDescription,
      headings,
      openGraphTags,
      status,
      page404,
      analyzText,
      internalLinksCount,
      htmlSize,
      faviconLink,
      socialLinks,
      robots,
      sitemap,
      dissalow
    ];

    const result = await pool.query(query, values);
    return { isError: false, data: result.rows[0] };
  } catch (error) {
    console.log(error);
    
    return { isError: true, message: error };
  }
};

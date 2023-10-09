import axios from 'axios';

export const getSitemap = async (url: string) => {
  let sitemap = null;
  try {
    const response = await axios.get(`${url}/sitemap.xml`);
    sitemap = response.data;
  } catch (error) {
    console.error('Ошибка при получении sitemap', error);
  }
  if(!sitemap) {
    try {
      const response = await axios.get(`${url}/sitemap.html`);
      sitemap = response.data;
    } catch (error) {
      console.error('Ошибка при получении sitemap', error);
    }
  }


  return sitemap;
}

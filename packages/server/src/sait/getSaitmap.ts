import axios from 'axios';

export const getSitemap = async (url: string) => {
  let sitemap = '';
  try {
    const response = await axios.get(`${url}/sitemap.xml`);
    sitemap = response.data;
  } catch (error) {
    console.error('Ошибка при получении robots.txt', error);
  }
  try {
    const response = await axios.get(`${url}/sitemap.html`);
    sitemap = response.data;
  } catch (error) {
    console.error('Ошибка при получении robots.txt', error);
  }

  return sitemap;
}

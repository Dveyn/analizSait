import axios from 'axios';

export const getRobots = async (url: string) => {
  try {
    const response = await axios.get(`${url}/robots.txt`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении robots.txt', error);
    return '';
  }
}

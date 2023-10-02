import axios, { AxiosError } from 'axios';
import cheerio from 'cheerio'; 

export const getNotFount = async (url:string) => {
  const result = {
    status: 0,
    textStatus: '',
    links: false
  }
  try {
    const response = await axios.get(url+'/notFountPage_audit-boost');

    result.status = response.status
    result.textStatus = response.statusText;

    const $ = cheerio.load(response.data);
    const links = $('a').length > 0;
    result.links = links;

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        result.status = axiosError.response.status;
        result.textStatus = axiosError.response.statusText;

        const responseData:string = axiosError?.response?.data?.toString() ?? '';
        const $ = cheerio.load(responseData);
        const links = $('a').length > 0;
        result.links = links;
      } else {
        console.error('Не удалось получить ответ от сервера');
      }
    } else {
      console.error('Произошла неизвестная ошибка:', error);
    }
    return result;
  }
}

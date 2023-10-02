import axios from 'axios';

export const getStatus = async (url:string) => {
  const protocols:string[] = ['http', 'https'];
  const result: { [key: string]: { status: number, textStatus: string } } = {
    http: {
      status: 0,
      textStatus: '',
    },
    https: {
      status: 0,
      textStatus: '',
    } 
  }
  for (const protocol of protocols) {
    const fullUrl = `${protocol}://${removeProtocol(url)}`;

    try {
      const response = await axios.get(fullUrl);
      result[protocol].status = response.status
      result[protocol].textStatus = response.statusText;
    } catch (error) {
      console.error(`Ошибка при запросе ${protocol}:`, error);
    }
  }
  return result;
}

const removeProtocol = (url: string): string => {
  return url.replace(/^https?:\/\//, '');
};

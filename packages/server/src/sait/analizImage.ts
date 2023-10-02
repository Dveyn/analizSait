import axios from 'axios';
import sizeOf from 'image-size';
import cheerio from 'cheerio';

export const analyzImage = async (url: string,$images: cheerio.Cheerio) => {
  const imageSizes = [];

  for (let i = 0; i < $images.length; i++) {
    const imageUrl = $images.eq(i).attr('src');
    if (imageUrl) {
      try {
        const response = await axios.get(`http://${url}${imageUrl}`, { responseType: 'arraybuffer' });
        const dimensions = sizeOf(Buffer.from(response.data));
        imageSizes.push({ url: imageUrl, dimensions });
      } catch (error) {
        console.error(`Ошибка при получении размеров изображения ${imageUrl}: ${error}`);
      }
    }
  }

  return imageSizes;
}

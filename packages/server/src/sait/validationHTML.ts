import axios from 'axios';
import { translateText } from '../utils/translate';

export const validationHTML = async (html: string) => {
  try {
    const response = await axios.post('https://validator.w3.org/nu/?out=json', html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

    //переводим все на русский язык
    type errorMessage = {
      lastColumn: number
      lastLine: number
      message: string
      type: string
    }
 
    const translatedMessages: errorMessage[] = await Promise.all(
      response.data.messages.map(async (el: errorMessage) => {
        const errorMessage = await translateText(el.message);
        el.message = errorMessage;
        console.log(el);
        return el;
      })
    );

    return translatedMessages;
  } catch (error) {
    console.log(error)
  }
};

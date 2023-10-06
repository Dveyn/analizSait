import axios from 'axios';

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
        return el;
      })
    );

    return translatedMessages;
  } catch (error) {
    console.log(error)
  }
};

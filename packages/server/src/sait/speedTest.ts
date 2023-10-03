const psi = require('psi');

export const speedTest = async (url: string) => {
  try {
    const data = await psi(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

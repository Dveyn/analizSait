const validator = require('html-validator')

export const validationHTML = async (pages: string) => {
  const options = {
    format: 'json',
    data: pages,
  };

  const result = await validator(options)
  console.log(result)
  return result
}

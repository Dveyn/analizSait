export const getToken = (cookieString: string | undefined) => {
  if (!cookieString) return undefined;
  const cookiesArray = cookieString.split('; ');
  const cookies: { [key: string]: string } = {};

  cookiesArray.forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  });

  const token = cookies['token'];
  const token2 = cookies['token2'];

  return {token, token2};
}

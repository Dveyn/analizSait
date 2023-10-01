export const valodation = {
  url(url:string):boolean{
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      return urlPattern.test(url);
  }
}

declare module 'site-analyzer' {
  class SiteAnalyzer {
    constructor(url: string);
    async analyze(): Promise<any>; // Замените any на фактический тип результата
  }
  export default SiteAnalyzer;
}

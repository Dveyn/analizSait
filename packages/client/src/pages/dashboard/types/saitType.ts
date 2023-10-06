export type saitType = {
  url: string,
  pageTitle: string,
  metaKeywords: string,
  metaDescription: string
  headings: headingsType
  status: {
    http: {
      status: number,
      textStatus: string
    },
    https: {
      status: number,
      textStatus: string
    }
  }
  analyzText: {
    keywordDensity: number
    stopWordsCount: number
    stopWordsPercentage: number
    totalTextLength: number
    totalWords: number
  },
  robots: string, 
  dissalow: boolean,
  sitemap: string
  page404: {
    links: boolean,
    status: number,
    textStatus: string
  }
}

type headingsType = {
  h1: number,
  h2: number,
  h3: number,
  h4: number,
  h5: number,
}

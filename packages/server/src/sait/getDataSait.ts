import { seoAnalyz } from "./seoAnalyz";


export const getDataSait = async (id:number) =>{
  const result = await seoAnalyz(id);
  return result;
}

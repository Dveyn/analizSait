import React from "react";
import { saitType } from "../../types/saitType";
import style from './analyz.module.css'



type Props = {
  sait: saitType
}
export const Analyz = ({ sait }: Props) => {
  console.log(sait)
  return (
    <div className={style.body}>
      <div className={style.box}>
        <div className={style.category}>Внутренняя оптимизация</div>
        <div className={style.item}>
          <div className={style.name}>Заголовок страницы</div>
          <div className={style.value}>{sait.pageTitle ?? "Отсутствует"}</div>
        </div>
        <div className={style.item}>
          <div className={style.name}>Meta теги</div>
          <div className={style.value}>{sait.metaKeywords ?? "Отсутствует"}</div>
        </div>
        <div className={style.item}>
          <div className={style.name}>Meta описание</div>
          <div className={style.value}>{sait.metaDescription ?? "Отсутствует"}</div>
        </div>
        <div className={style.item}>
          <div className={style.name}>Заголовки</div>
          <div className={style.value}>h1: {sait.headings.h1} h2: {sait.headings.h2} h3: {sait.headings.h3} h4: {sait.headings.h4} h5: {sait.headings.h5} </div>
        </div>


        <div className={style.category}>Техническое состояние</div>
        <div className={style.item}>
          <div className={style.name}>Код ответа</div>
          <div className={style.value}>
            <div>http://{removeProtocol(sait.url)} - status: {sait.status.http.status} {sait.status.http.textStatus}  </div>
            <div>https://{removeProtocol(sait.url)} - status: {sait.status.https.status} {sait.status.https.textStatus}  </div>
          </div>
        </div>
      </div>
    </div>
  )
};


const removeProtocol = (url: string): string => {
  return url.replace(/^https?:\/\//, '');
};

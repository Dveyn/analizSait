import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { appAPI } from "@@/api/api";
import { MenuComponent } from "@@/components/base/menu";
import { Card, Container, Link } from "@@/components/ui";
import { saitType } from './types/saitType';
import { Graph } from './components/graph/graph';
import { Analyz } from './components/analyz/analyz';
import { Report } from './components/report/report';

import style from '@@/styles/dashboard.module.css'

const SaitDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [sait, setSait] = useState<saitType>();
  const [tab, setTab] = useState('analyz');

  useEffect(() => {
    const getSait = async () => {
      const result = await appAPI.getDataSait(Number(id));
      setSait(result.data);
    }
    id && getSait();
  }, [id]);

  return (
    <main className="main">
      <MenuComponent />
      <Container>
        <Card>
          {sait ? (
          <div className={style.saitDetail}>
            <div className={style.name}>{sait.url}</div>
            <div className={style.tabs}>
              <div className={`${style.tab} ${tab === 'analyz'? style.select : null}`} onClick={()=>{setTab('analyz')}}>Анализ сайта</div>
              <div className={`${style.tab} ${tab === 'graph'? style.select : null}`} onClick={()=>{setTab('graph')}}>Графики</div>
              <div className={`${style.tab} ${tab === 'report'? style.select : null}`} onClick={()=>{setTab('report')}}>Построить отчет</div>
            </div>
            <div className={style.body}>
            { 
              tab === 'analyz'? <Analyz sait={sait} /> : tab === 'graph'? <Graph sait={sait} /> : <Report sait={sait} />
            }
            </div>
          </div>
          ) : (
            <div>Loading...</div>
          )}
        </Card>
      </Container>
    </main>
  );
};

export default SaitDetail;

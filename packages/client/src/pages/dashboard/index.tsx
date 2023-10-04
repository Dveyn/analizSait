import { appAPI } from "@@/api/api";
import { MenuComponent } from "@@/components/base/menu";
import { Card, Container, Link } from "@@/components/ui";
import React, { useEffect, useState } from "react";
import { SaitCard } from "./components/saitCard/saitCard";


type SaitType = {
  id: number,
  is_verefy: boolean,
  secret_key: string,
  url: string,
  user_id: number,
}

const Dashboard = () => {
  const [saits, setSaits] = useState<SaitType[]>([]);
  useEffect(() => {
    const getSait = async () => {
     const result =  await appAPI.getSait();
     setSaits(result.data);
    }
    getSait();
  }, []);
  return (
    <main className="main">
     <MenuComponent />
      <Container>
        <Card>
        {
          saits.length == 0 ? <div>Нет сохраненных сайтов, перейдите <Link to={"/dashboard/add-sait"} >Добавить сайт</Link></div> :
         <div>
          {
          saits && saits.map((sait, index) => {
              return (
               <SaitCard key={index} sait={sait} />
              );
            })
          }
         </div>
        }
        </Card>
      </Container>
    </main>
  )
}

export default Dashboard

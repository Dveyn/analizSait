import { appAPI } from "@@/api/api";
import { Button } from "@@/components/ui";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  sait: {
    id: number,
    is_verefy: boolean,
    secret_key: string,
    url: string
  }

}

export const SaitCard = ({ sait }: Props) => {
  const router = useRouter();
  const sendVerefy = async() => {
    const result = await appAPI.sendVerefySait(sait.id)
    if(result.data.isError){

    } else {
      sait.is_verefy = true;
    }
  }

  const selectSite = () => {
    router.push(`/dashboard/${sait.id}`)
  }

  return (
    <div>
      <div className="card" onClick={selectSite}>
        <div className="card-body">
          <p className="card-text">{sait.url}</p>
           {!sait.is_verefy && <Button label={'Проверить'} onClick={sendVerefy} />}
        </div>
      </div>
    </div>
  );
}

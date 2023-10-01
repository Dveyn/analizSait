import { appAPI } from "@@/api/api";
import { Button } from "@@/components/ui";
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

  const sendVerefy = async() => {
    const result = await appAPI.sendVerefySait(sait.id)
  }
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <p className="card-text">{sait.url}</p>
           {!sait.is_verefy && <Button label={'Проверить'} onClick={sendVerefy} />}
        </div>
      </div>
    </div>
  );
}

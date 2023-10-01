import { MenuComponent } from "@@/components/base/menu";
import { Card, Container, Title, Input, Button, Error } from "@@/components/ui";
import React, { useState } from "react";
import styles from '@@/styles/add-sait.module.css'
import { appAPI } from "@@/api/api";

const AddSait = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState('');
  const [key, setKey] = useState('');

  const addSait = async () => {
    const result = await appAPI.addSait(url);
    if (result.data.isError) {
      setError(result.data.message);
    }
    else {
      setError('');
      setKey(result.data.key);
    }
  }
   
return (
  <main className="main">
    <MenuComponent />
    <Container className={styles.conttainer}>
      <Card>
        <Title > Title </Title>
        <Input type="text" label={"URL адрес "} value={url} onChange={(e) => { setUrl(e.target.value) }} />
        {
          error && <Error>{error}</Error>
        }
        {
          key && <div>Сайт успешно добавлен. Для подтверждения сайта разместите в корне сайт тектосвый документ audit-boot.txt с содержанием ключа <span className={styles.code}>{key}</span>
          и нажмите &quot;Проверить&quot; на старнице Дашборда
          </div>
        }
        <Button label={"Добавить"} onClick={addSait} />
      </Card>
    </Container>
  </main>
)
};
export default AddSait;

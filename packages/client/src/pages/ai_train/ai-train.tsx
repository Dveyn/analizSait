import React, { useState } from 'react';
import { Text } from '@consta/uikit/Text';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { appAPI } from '../../api/api';
import { adjustCharacters } from '../../utils/adjustCharacters';

export const AITrain = () => {
  const [text, setText] = useState('');

  const sendAi = async () => {
    // await appAPI.train( textData, labels )
    const result = await appAPI.predict( [text] )
  }
  return (
    <Layout direction="column">
      <Layout flex={1} >
        <Card>
          <Text>Обучение AI</Text>
        </Card>

      </Layout>
      <Layout flex={1}>
        <Card>
          <Text>Введите данные для обучения</Text>
          <Card>
            <Text>Введите данные для обучения</Text>
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </Card>

          <Button label="Отправить" onClick={sendAi} />
        </Card>
      </Layout>
    </Layout>
  )
};

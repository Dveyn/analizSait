import React, { useState } from 'react';
import { Text } from '@consta/uikit/Text';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { appAPI } from '../../api/api';
import { adjustCharacters } from '../../utils/adjustCharacters';

export const AITrain = () => {
  const [text, setText] = useState('');

  const textData = [
    "Увеличить количество обратных ссылок на сайт для улучшения его позиций в поисковой выдаче.",
    "Оптимизировать мета-теги и заголовки страниц для лучшей видимости в поисковых системах.",
    "Улучшить юзабилити сайта для увеличения конверсии посетителей.",
    "Создать контент высокого качества для привлечения и удержания аудитории.",
    "Использовать рекламные кампании в социальных сетях для расширения аудитории.",
  ];
  
  const labels = [
    "Увеличение обратных ссылок",
    "Оптимизация мета-тегов и заголовков",
    "Улучшение юзабилити",
    "Создание качественного контента",
    "Использование социальных сетей для рекламы",
  ];
  
  const sendAi = async () => {
    await appAPI.train( textData, labels )
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

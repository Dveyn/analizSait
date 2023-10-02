import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { appAPI } from "@@/api/api";
import { MenuComponent } from "@@/components/base/menu";
import { Card, Container, Link } from "@@/components/ui";
import { SaitCard } from "./components/saitCard/saitCard";

const SaitDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [sait, setSait] = useState(null);

  useEffect(() => {
    const getSait = async () => {
      const result = await appAPI.getDataSait(Number(id));
    }
    id && getSait();
  }, [id]);

  return (
    <main className="main">
      <MenuComponent />
      <Container>
        <Card>
          {sait ? (
            <SaitCard sait={sait} />
          ) : (
            <div>Loading...</div>
          )}
        </Card>
      </Container>
    </main>
  );
};

export default SaitDetail;

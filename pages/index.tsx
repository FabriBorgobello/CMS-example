import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import invariant from "tiny-invariant";

interface Props {
  saints: Saint[];
}

type Saint = {
  name: string;
  image: string;
  cloth: string;
};

const Home = ({ saints }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Saint Seiya</title>
        <meta name="description" content="Saint Seiya app using JustFields" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Saint Seiya</h1>
        <p className={styles.description}>Gold Saints</p>
        <div className={styles.list}>
          {saints?.map((saint) => (
            <div className={styles.saint} key={saint.name}>
              <Image
                src={saint.image}
                alt={saint.name}
                objectFit="scale-down"
                width={300}
                height={300}
              />
              <div className={styles.saintInfo}>
                <h2>{saint.name}</h2>
                <p>{saint.cloth}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Powered by Just Fields</span>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let saints: Saint[] = [];
  let error: Error | null = null;

  const getSaints = async () => {
    try {
      const response = await fetch(
        "https://justfields.com/project/2bra2ZyN/json"
      );
      if (!response.ok) {
        error = new Error(response.statusText);
      } else {
        const json = await response.json();
        saints = json.saints.gold_saints;
      }
    } catch (err) {
      invariant(err instanceof Error, "Expected an error");
      error = err;
    }
  };

  await getSaints();

  return {
    props: {
      saints: saints,
    },
  };
};

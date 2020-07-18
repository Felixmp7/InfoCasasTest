import Head from 'next/head'
import Header from './components/header/Header'
import ContainerToDos from './containers/ContainerToDos';
import Layout from './components/layout/Layout'

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  // console.log(res)
  const todos = await res.json();
  console.log(todos);

  return {
    props: { todos: todos.slice(0,4) }, // will be passed to the page component as props
  };
}

const HomePage = ({todos}) => {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>InfoCasas Test</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ContainerToDos todos={todos} />
    </Layout>
  );
}

export default HomePage;






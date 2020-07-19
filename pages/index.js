import Head from 'next/head'
import Header from './src/index-screen/components/header/Header'
import ContainerToDos from './src/index-screen/containers/ContainerToDos';

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  // console.log(res)
  const todos = await res.json();
  // console.log(todos);

  return {
    props: { todos: todos.slice(0,10) }, // will be passed to the page component as props
  };
}

const HomePage = ({todos}) => {
  return (
    <>
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
        <link 
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ContainerToDos todos={todos} />
    </>
  );
}

export default HomePage;






import Head from 'next/head'
import Header from './components/Header'
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import Layout from './components/Layout'

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  // console.log(res)
  const todos = await res.json();
  console.log(todos);

  return {
    props: { todos }, // will be passed to the page component as props
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CreateTodo />
      <TodoList />
    </Layout>
  );
}

export default HomePage;






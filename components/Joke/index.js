import { useEffect, useState } from "react";
import useSWR from "swr";

function useFetch(url) {
  const [data, setData] = useState();

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(url);
      const newData = await response.json();

      setData(newData);
    }

    startFetching();
  }, [url]);

  return data;
}

export default function Joke() {
  const [id, setId] = useState(0);
  const [funnyList, setFunnyList] = useState([0, 3]);
  const isCurrentJokeFunny = funnyList.some((entry) => entry === id);

  const { data, error, isLoading } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function toggleIsFunny(currentId) {
    const isJokeFunny = funnyList.some((entry) => entry === currentId);

    if (isJokeFunny) {
      const listWithoutJoke = funnyList.filter((entry) => entry !== currentId);
      setFunnyList(listWithoutJoke);
    } else {
      const listWithJoke = [currentId, ...funnyList];
      setFunnyList(listWithJoke);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error !== undefined) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <small>ID: {data.id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button onClick={() => toggleIsFunny(data.id)}>
          {isCurrentJokeFunny ? "😆" : "😒"}
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}

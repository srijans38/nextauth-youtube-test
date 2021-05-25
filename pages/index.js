import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [session, loadingSession] = useSession();
  const [loading, setLoading] = useState(false);
  const [subsList, setSubsList] = useState([]);

  useEffect(async () => {
    console.log('test');
    if (loading) {
      const { data } = await axios.get('/api/getYTData', {
        withCredentials: true,
      });
      console.log(data);
      setSubsList(
        data.map((sub) => ({
          id: sub.id,
          title: sub.snippet.title,
        }))
      );
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      <Head>
        <title>NextAuth Youtube Auth Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>NextAuth Youtube Auth Test</h1>

      {!session && (
        <>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}

      {session && (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
          <p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </p>
          <button
            onClick={() => setLoading(!loading)}
            disabled={loading || subsList.length}
          >
            Get My YouTube Subscriptions
          </button>
          {loading && <p>Loading...</p>}
          <ul>
            {subsList.map((sub) => (
              <li key={sub.id}>{sub.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

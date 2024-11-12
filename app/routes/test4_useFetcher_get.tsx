import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';

interface Posts {
  userId: number;
  id: string;
  title: string;
  body: string;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const limitParam = queryParams.get('limit');
  const limit = Number(limitParam) || 10;

  console.log('loader start');
  console.log(queryParams);
  console.log('limit', limit);

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: Posts[] = await response.json();
  console.log('loader end');
  return json(data.slice(0, limit));
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  console.log('action start');
  // Get the requested form.
  const form = await request.formData();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of form.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Get the value of our input named as "input-name"
  const userId = form.get('userId');

  // handle the logic to save, change and etc...
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data: Posts[] = await response.json();
  console.log('action end');
  return json(data);
  // return redirect(`/test/${inputItem}`);
};

export default function Index() {
  const posts: Posts[] = useLoaderData();
  const fetcher = useFetcher<Posts[]>();
  const actionData = useActionData<typeof action>();

  // console.log('actionData', actionData);

  const [updatedPosts, setUpdatedPosts] = useState(posts);
  const [updatedActionData, setUpdatedActionData] = useState(actionData);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      formData.set('limit', inputRef.current.value);

      console.log(inputRef.current.value);

      formData.append('addValue', 'serpiko');

      fetcher.submit(formData, { method: 'get', action: './' }); // => goto loader
    },
    [],
  );

  const handleLimit = useCallback(() => {
    fetcher.submit(
      {
        limit: inputRef2.current.value,
      },
      { method: 'post', action: './' },
    );
  }, []);

  const handlePost = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('userId', '99');
    fetcher.submit(formData, { method: 'post', action: './' });
  };

  useEffect(() => {
    if (actionData) {
      console.log('Post action response: actionData', actionData);
      setUpdatedActionData(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (fetcher.data) {
      console.log('CSR value: fetcher.data', fetcher.data);
      setUpdatedPosts(fetcher.data);
    }
  }, [fetcher.data]);

  // useEffect(() => {
  //   if (posts) {
  //     console.log('CSR value: posts', posts);
  //     setUpdatedPosts(posts);
  //   }
  // }, [posts]);

  return (
    <div>
      <h2>https://jsonplaceholder.typicode.com/posts</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>userId</th>
            <th>id</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(updatedPosts) ? (
            updatedPosts.map((post, i) => (
              <>
                <tr key={`test_${i}`}>
                  <td>{post.userId}</td>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Datas.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
        <h4>Form | method=get | onSubmit=handleSubmit</h4>
        <Form method="get" onSubmit={handleSubmit}>
          <label>
            limit <input name="limit" ref={inputRef} type="text" />
          </label>
          <button type="submit">Lmit</button>
        </Form>
      </div>

      <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
        <h4>Form | method=get | onClick=handleLimit</h4>
        <Form>
          <label>
            limit <input name="limit" ref={inputRef2} type="text" />
          </label>
          <button type="button" onClick={handleLimit}>
            Lmit
          </button>
        </Form>
      </div>
      <hr />
      <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
        <h4>Form | method=post | action=./</h4>
        <Form method="post" action="./">
          userId <input name="userId" placeholder="Your Input" />
          <button type="submit">Post</button>
        </Form>
        {updatedActionData && (
          <div>
            <pre>{JSON.stringify(updatedActionData)}</pre>
          </div>
        )}
      </div>
      <hr />
      <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
        <h4>fetcher.Form | method=post | action=./ | fetcher.submit</h4>
        <fetcher.Form method="post" onSubmit={handlePost}>
          <input name="userId" placeholder="userId" />
          <button type="submit">Submit</button>
        </fetcher.Form>
      </div>
    </div>
  );
}

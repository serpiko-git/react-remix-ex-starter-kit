import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

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

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: Posts[] = await response.json();
  return data.slice(0, limit);
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  // Get the requested form.
  const form = await request.formData();

  // Get the value of our input named as "input-name"
  const inputItem = form.get('input-name');

  // handle the logic to save, change and etc...
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: inputItem,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data: Posts[] = await response.json();
  return redirect(`/test2/${inputItem}`);
};

export default function Index() {
  const posts: Posts[] = useLoaderData<typeof loader>();

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
          {posts.length ? (
            posts.map((post, i) => (
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
      <Form method="post">
        <input name="input-name" placeholder="Your Input" />
        <button type="submit">Post</button>
      </Form>
      <Form method="get">
        <label>
          Limit <input name="limit" type="text" />
        </label>
        <button type="submit">Lmit</button>
      </Form>
    </div>
  );
}

import React, { MouseEventHandler, ReactNode } from 'react';

import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { Form, useLoaderData, useNavigate, useParams } from '@remix-run/react';

interface Post {
  userId: number;
  id: string;
  title: string;
  body: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params; // 동적 경로 파라미터 가져오기
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 });
  }
  const data: Post = await response.json();
  return json(data);
};

export default function Index() {
  const post: Post = useLoaderData<typeof loader>();
  const params = useParams();
  const navigate = useNavigate();

  console.log(params);

  const handleSideClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/test');
  };
  return (
    <div>
      <h2>https://jsonplaceholder.typicode.com/posts id:[{`${params.id}`}]</h2>
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
          {post ? (
            <>
              <tr key={'test'}>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan={4}>No Datas.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button type="button" onClick={handleSideClick}>
        move /test
      </button>
    </div>
  );
}

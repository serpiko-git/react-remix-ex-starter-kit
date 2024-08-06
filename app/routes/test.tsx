import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: Users[] = await response.json();
  return data;
};

export default function Index() {
  const datas: Users[] = useLoaderData();
  return (
    <div>
      <h1>https://jsonplaceholder.typicode.com/users</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>phone</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {datas.length ? (
            datas.map((data, i) => (
              <>
                <tr key={`todo_${i}`}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.website}</td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Datas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

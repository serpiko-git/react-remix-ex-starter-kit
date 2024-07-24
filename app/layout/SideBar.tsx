import { Form, Link } from '@remix-run/react';

export default function SideBar() {
  return (
    <div id="sidebar">
      <h1>Remix Contacts</h1>
      <div>
        <Form id="search-form" role="search">
          <input
            aria-label="Search contacts"
            id="q"
            name="q"
            placeholder="Search"
            type="search"
          />
          <div aria-hidden hidden={true} id="search-spinner" />
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <h4>SSR Routing</h4>
      <nav>
        <ul>
          <li>
            <a href={'/about/0'}>about</a>
          </li>
          <li>
            <a href={'/contacts/1'}>Your Name</a>
          </li>
          <li>
            <a href={'/contacts/2'}>Your Friend</a>
          </li>
        </ul>
      </nav>
      <h4>Client Routing</h4>
      <nav>
        <ul>
          <li>
            <Link to={'/about/0'}>about</Link>
          </li>
          <li>
            <Link to={'/contacts/1'}>Your Name</Link>
          </li>
          <li>
            <Link to={'/contacts/2'}>Your Friend</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

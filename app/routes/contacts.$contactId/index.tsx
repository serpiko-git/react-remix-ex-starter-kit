/* eslint-disable no-use-before-define */
import type { FunctionComponent } from 'react';

import { Form, useParams } from '@remix-run/react';

import type { ContactRecord } from '~/common/libs/mock-data';

export default function Contact() {
  const params = useParams();

  const contact = {
    first: 'Your',
    last: 'Name',
    avatar: 'https://placekitten.com/200/200',
    twitter: 'your_handle',
    notes: 'Some notes',
    favorite: true,
  };

  return (
    <>
      <div>
        <h4>id: {params.contactId}</h4>
      </div>
      <div id="contact">
        <div>
          <img
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        </div>
        <div>
          <h1>
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{' '}
            <Favorite contact={contact} />
          </h1>

          {contact.twitter ? (
            <p>
              <a href={`https://twitter.com/${contact.twitter}`}>
                {contact.twitter}
              </a>
            </p>
          ) : null}

          {contact.notes ? <p>{contact.notes}</p> : null}

          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>

            <Form
              action="destroy"
              method="post"
              onSubmit={(event) => {
                // eslint-disable-next-line no-restricted-globals
                const response = confirm(
                  'Please confirm you want to delete this record.',
                );
                if (!response) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, 'favorite'>;
  // eslint-disable-next-line react/function-component-definition
}> = ({ contact }) => {
  const { favorite } = contact;

  return (
    <Form method="post">
      <button
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
};

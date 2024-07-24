import React from 'react';

import { useParams } from '@remix-run/react';

export default function Article() {
  const params = useParams();

  return (
    <>
      <div>about</div>
      <div>
        <span>게시글 id: {params.id}</span>
      </div>
    </>
  );
}

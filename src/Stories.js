import React from 'react';
import { useGlobalContext } from './context';
const Stories = () => {
  const { isLoading, hits } = useGlobalContext();
  console.log(hits);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="stories">
      {hits.map(hit => {
        const { title, url, author, points, num_comments, objectID } = hit;
        return (
          <article key={objectID} className="story">
            <h4>{title}</h4>
            <p className="info">
              {points} points by {author} | {num_comments} comments
            </p>
            <div>
              <a
                href={url}
                className="read-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button className="remove">remove</button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;

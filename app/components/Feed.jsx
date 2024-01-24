"use client";

import Card from "./Card";

const Feed = ({ isSearching, entries }) => {
  // "isSearching" helps to "mark the queryed". "entries" is passed in to (re)render cards
  return (
    <>
      <div className="mb-10 grid grid-cols-1 justify-center gap-2 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-4 lg:px-24 xl:grid-cols-4">
        {entries.map((app) => (
          <Card
            key={app.id}
            title={app.title}
            descr={app.description}
            tag={app.tag}
            id={app.id}
            highlight={isSearching}
          />
        ))}
      </div>
    </>
  );
};

export default Feed;

import * as React from "react";
import Story from "./Story";

import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import LoadingSpinner from "./LoadingSpinner";
import { NewsfeedQuery as NewsFeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      ...StoryFragment
    }
  }
`;

function Newsfeed() {
  const data = useLazyLoadQuery<NewsFeedQueryType>(NewsfeedQuery, {});

  const story = data.topStory;

  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}

export default function NewsFeedWrapper() {
  return (
    <React.Suspense
      fallback={
        <div>
          NewsFeed Suspense
          <LoadingSpinner />
        </div>
      }
    >
      <Newsfeed />
    </React.Suspense>
  );
}

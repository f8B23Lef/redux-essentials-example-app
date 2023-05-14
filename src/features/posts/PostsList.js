import React, { useMemo } from 'react';
import classnames from 'classnames'

import PostExcerpt from './PostExcerpt';
import { Spinner } from '../../components/Spinner';

import { useGetPostsQuery } from '../api/apiSlice';

export const PostsList = () => {
  console.log('--PostsList()--');

  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts])

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    })
    const renderedPosts = sortedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

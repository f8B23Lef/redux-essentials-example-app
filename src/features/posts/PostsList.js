import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostExcerpt from './PostExcerpt';
import { Spinner } from '../../components/Spinner';

import { selectPostIds, fetchPosts } from './postsSlice';

export const PostsList = () => {
  console.log('--PostsList()--');
  const dispatch = useDispatch();

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch]);

  let content;

  const orderedPostIds = useSelector(selectPostIds)

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

import React from 'react';
import { Container } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import Post from './Post';
import './PostList.css';

interface PostData {
  id: string;
  title: string;
  url: string;
  date: Date | string;
  category?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
}

interface PostListProps {
  posts: PostData[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const breakpointColumns = {
    default: 4,
    1200: 4,
    992: 3,
    768: 2,
    576: 1
  };

  return (
    <Container fluid className="py-4">
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {posts.map((post) => (
          <div key={post.id}>
            <Post
              title={post.title}
              url={post.url}
              date={post.date}
              category={post.category}
              image={post.image}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default PostList;
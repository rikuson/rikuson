import React from 'react';
import { Card } from 'react-bootstrap';
import { FaCalendarAlt, FaFolderOpen, FaArrowRight } from 'react-icons/fa';

interface PostProps {
  title: string;
  url: string;
  date: Date | string;
  category?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
}

export const Post: React.FC<PostProps> = ({ 
  title, 
  url, 
  date, 
  category, 
  image, 
  excerpt,
  tags 
}) => {
  const formatDate = (dateInput: Date | string) => {
    const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Generate placeholder image if no image provided
  const imageUrl = image || `https://rikson.imgix.net${url}?txt=${encodeURIComponent(title)}&txt-size=48&txt-pad=36&txt-shad=5&txt-fit=max&txt-align=center,middle&blur=30&w=360&txt-color=fff`;

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

  return (
    <Card className="shadow h-100">
      <a 
        href={url} 
        className="d-block w-100 position-relative overflow-hidden" 
        style={{ aspectRatio: '7 / 4' }}
      >
        <Card.Img 
          variant="top"
          src={imageUrl}
          alt="thumbnail"
          className="position-absolute top-50 start-50 translate-middle"
          style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
        />
      </a>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h4">
          <a href={url} className="text-decoration-none text-dark">
            {title}
          </a>
        </Card.Title>
        
        <div className="mb-2">
          <Card.Text as="div" className="small text-muted mb-1">
            <FaCalendarAlt className="me-1" />
            <time>{formatDate(date)}</time>
          </Card.Text>
          
          {category && (
            <Card.Text as="div" className="small mb-1">
              <FaFolderOpen className="me-1 text-muted" />
              <a href={`/category/${category}`} className="text-decoration-none">
                {categoryTitle}
              </a>
            </Card.Text>
          )}
          
          {tags && tags.length > 0 && (
            <Card.Text as="div" className="small text-muted mb-1">
              Tags: {tags.join(', ')}
            </Card.Text>
          )}
        </div>
        
        {excerpt && (
          <Card.Text className="flex-grow-1">
            {excerpt}
          </Card.Text>
        )}
        
        <div className="text-end mt-auto">
          <a href={url} className="card-link text-decoration-none">
            Read more <FaArrowRight className="ms-1" />
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
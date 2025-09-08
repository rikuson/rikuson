import { Card, Badge, Stack } from 'react-bootstrap';
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

export const Post: React.FC<PostProps> = ({ title, url, date, category, image, excerpt, tags }) => {
  const formatDate = (d: Date | string) => 
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const imageUrl = image || `https://rikson.imgix.net/placeholder.png?txt=${encodeURIComponent(title)}&txt-size=48&txt-pad=36&txt-shad=5&txt-fit=max&txt-align=center,middle&blur=30&w=600&txt-color=fff`;

  return (
    <Card className="shadow h-100">
      <Card.Link href={url} className="ratio ratio-16x9">
        <Card.Img src={imageUrl} alt={title} className="object-fit-cover" />
      </Card.Link>
      <Card.Body>
        <Card.Title className="h4">
          <Card.Link href={url}>{title}</Card.Link>
        </Card.Title>

        <div className="mb-3">
          <small>
            {category && (
              <a href={`/${category}`} className="text-decoration-none me-3"><FaFolderOpen /> {category.charAt(0).toUpperCase() + category.slice(1)}</a>
            )}
            <FaCalendarAlt /> {formatDate(date)}
          </small>
        </div>

        {excerpt && <Card.Text>{excerpt}</Card.Text>}

        <div className="text-end">
          <Card.Link href={url}>
            <FaArrowRight size={12} />
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;

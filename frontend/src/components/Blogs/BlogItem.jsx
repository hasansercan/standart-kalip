import { Tag } from "antd";
import { Link } from "react-router-dom";
import "./BlogItem.css";

const BlogItem = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-item">
      <div className="blog-image">
        <img src={blog.featuredImage} alt={blog.title} />
        <div className="blog-overlay">
          <div className="blog-date">
            {formatDate(blog.createdAt)}
          </div>
          <div className="blog-category">
            <Tag color="blue">{blog.category}</Tag>
          </div>
        </div>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-author">
            <i className="bi bi-person"></i>
            {blog.author}
          </span>
          <span className="blog-reading-time">
            <i className="bi bi-clock"></i>
            {blog.readTime} dk
          </span>
          <span className="blog-views">
            <i className="bi bi-eye"></i>
            {blog.views || 0}
          </span>
        </div>
        <h3 className="blog-title">
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
        <p className="blog-excerpt">
          {blog.excerpt}
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} size="small" style={{ margin: '2px' }}>
                {tag}
              </Tag>
            ))}
            {blog.tags.length > 3 && <span>...</span>}
          </div>
        )}
        <div className="blog-footer">
          <Link to={`/blog/${blog.slug}`} className="read-more-btn">
            Devamını Oku
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;

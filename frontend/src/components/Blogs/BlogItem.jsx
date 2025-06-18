import { Link } from "react-router-dom";
import "./BlogItem.css";

const BlogItem = ({ blog, index = 0 }) => {
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
    <article
      className={`blog-card blog-card-${(index % 5) + 1}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="blog-card-image">
        <img src={blog.featuredImage} alt={blog.title} />
        <div className="blog-card-overlay">
          <div className="blog-card-category">
            {blog.category}
          </div>
          <div className="blog-card-date">
            {formatDate(blog.createdAt)}
          </div>
        </div>
        <div className="blog-card-gradient"></div>
      </div>

      <div className="blog-card-content">
        <div className="blog-card-number">
          {String(index + 2).padStart(2, '0')}
        </div>

        <div className="blog-card-meta">
          <span className="blog-card-author">
            <i className="author-icon">👤</i>
            {blog.author}
          </span>
          <span className="blog-card-reading-time">
            <i className="time-icon">⏱️</i>
            {blog.readTime || 5} dk
          </span>
          <span className="blog-card-views">
            <i className="view-icon">👁️</i>
            {blog.views || 0}
          </span>
        </div>

        <h3 className="blog-card-title">
          <Link to={`/blog/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>

        <p className="blog-card-excerpt">
          {blog.excerpt || blog.content?.substring(0, 150) + "..."}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-card-tags">
            {blog.tags.slice(0, 2).map((tag, tagIndex) => (
              <span key={tagIndex} className="blog-card-tag">
                #{tag}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="blog-card-tag-more">
                +{blog.tags.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="blog-card-footer">
          <Link to={`/blog/${blog.slug}`} className="blog-card-read-more">
            <span className="read-more-text">Devamını Oku</span>
            <span className="read-more-arrow">→</span>
          </Link>
        </div>
      </div>

      <div className="blog-card-border-effect"></div>
    </article>
  );
};

export default BlogItem;

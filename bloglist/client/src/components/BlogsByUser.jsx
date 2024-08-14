const BlogsByUser = ({ data }) => {
  if (!data) return null;

  const { name, blogs } = data;

  return (
    <div>
      <h2>{name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsByUser;

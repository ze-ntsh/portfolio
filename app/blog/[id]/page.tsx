const Blog = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog Post {params.id}</h1>
      <p className="text-gray-700">
        This is the content of blog post {params.id}. You can replace this with your actual blog content.
      </p>
    </div>
  )
};

export default Blog;

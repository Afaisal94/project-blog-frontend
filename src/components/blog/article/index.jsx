export const Article = (props) => {
  const { post } = props;
  return (
    <div className="bg-white px-6 pt-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Blog Post
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post?.title}
        </h1>
        <p className="mt-6 max-w-2xl">{post?.description}</p>
        <img
          className="mt-6 aspect-video rounded-xl bg-gray-50 object-cover"
          src={post?.imageUrl}
          alt={post?.title}
        />
        <div className="mt-6 max-w-2xl">
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
    </div>
  );
};

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoadingArticle = () => {
  return (
    <div className="bg-white px-6 pt-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          <Skeleton width={100} />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <Skeleton width={300} />
        </h1>
        <p className="mt-6 max-w-2xl">
          <Skeleton width={500} />
          <Skeleton width={500} />
        </p>
        <Skeleton width={500} height={200} />
        <div className="mt-6 max-w-2xl">
          <Skeleton width={500} />
          <Skeleton width={500} />
          <Skeleton width={500} />
          <Skeleton width={500} />
          <Skeleton width={500} />
          <Skeleton width={500} />
        </div>
      </div>
    </div>
  );
};

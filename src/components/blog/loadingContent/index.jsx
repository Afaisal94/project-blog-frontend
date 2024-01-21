import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoadingContent = (props) => {
  const { title, subtitle } = props;
  // const data = [1, 2, 3];
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">{subtitle}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map((item) => (
            <div key={item.id}>
              <article className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <Skeleton width="100%" height={200} />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <Skeleton width={100} />
                    <a
                      style={{ pointerEvents: "none" }}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      <Skeleton width={70} />
                    </a>
                  </div>
                  <div className="group relative">
                    <Skeleton width={250} />
                    <br />
                    <Skeleton width={400} />
                    <Skeleton width={400} />
                    <Skeleton width={400} />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

import Api from "~/api";
import { Pager, Story } from "~/components";

import type { IStory } from "~/typings";

interface IndexData {
  stories: IStory[];
}

export let loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const queryParam = url.searchParams.get("p") || "";
    const page = parseInt(queryParam) || 1;
    const from = (page - 1) * 30;
    const to = from + 30;
    const data = await Api.getJobStories();
    const jobsIds = data.slice(from, to);
    const promises = jobsIds.map((itemId: number) => {
      return Api.getItem(itemId);
    });
    const stories = await Promise.all(promises);

    return { stories };
  } catch (err) {
    throw new Response("Error to fetch data", { status: 500 });
  }
};

export let meta: MetaFunction = () => {
  return {
    title: "Jobs | Hacker News",
    description: "Jobs | Hacker News",
  };
};

export default function JobsRoute() {
  const data = useLoaderData<IndexData>();

  const renderJobs = () => {
    if (data.stories?.length === 0) {
      return <div>No more jobs to show.</div>;
    }

    return (
      <div className="bg-gray-100">
        {data.stories.map(story => (
          <Story key={story.id} {...story} showScore={false} />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderJobs()}
      <Pager route="jobs" />
    </>
  );
}

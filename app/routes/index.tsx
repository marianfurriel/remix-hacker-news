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
    const data = await Api.getTopStories();
    const storiesIds = data.slice(from, to);
    const promises = storiesIds.map((itemId: number) => {
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
    title: "Hacker News",
    description: "Hacker News",
  };
};

export default function IndexRoute() {
  const data = useLoaderData<IndexData>();

  const renderStories = () => {
    if (data.stories.length === 0) {
      return <div>No more jobs to show.</div>;
    }

    return (
      <div className="bg-gray-100">
        {data.stories.map((story) => (
          <Story key={story.id} {...story} showScore />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderStories()}
      <Pager route="news" />
    </>
  );
}

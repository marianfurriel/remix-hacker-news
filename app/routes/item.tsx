import { useState } from "react";
import { LoaderFunction, useLoaderData, LinksFunction } from "remix";

import Api from "~/api";
import { extractHost } from "~/utils/url";
import { formatDate } from "~/utils/date";

import styles from "~/styles/item.css";

import type { IComment } from "~/typings";

export function countComments(item: IComment) {
  let count = 0;

  const traverse = (arr: any) => {
    for (let c of arr) {
      count += 1;
      const children = c.children;
      if (children?.length > 0) {
        traverse(children);
      }
    }
  };

  traverse(item.children);

  return count;
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const queryParam = url.searchParams.get("id");
    if (!queryParam) {
      throw new Error();
    }
    const itemId = parseInt(queryParam);
    const item = await Api.getItem(itemId);
    const totalComments = countComments(item);
    item.totalComments = totalComments;

    return { item };
  } catch (err) {
    throw new Response("Error to fetch data", { status: 500 });
  }
};


export default function ItemRoute() {
  const data = useLoaderData();
  const [collapsed, setCollapsed] = useState<Number[]>([]);

  const host = extractHost(data.item.url);
  const timeDistance = formatDate(data.item.created_at_i);

  const handleCollapse = (id: number) => {
    if (collapsed.includes(id)) {
      setCollapsed((arr) => arr.filter((v) => v !== id));
    } else {
      setCollapsed((arr) => [...arr, id]);
    }
  };

  const renderComment = (comment: IComment) => {
    const hasChildren = comment.children?.length > 0;

    if (!comment.text) return null;

    const timeDistance = formatDate(comment.created_at_i);
    const isCollapsed = collapsed.includes(comment.id);

    if (isCollapsed) {
      const commentsCount = countComments(comment) + 1;

      return (
        <div
          key={comment.id}
          className="transition duration-700 m-4 bg-yellow-100 dark:text-gray-600 dark:bg-gray-50"
        >
          <div
            className="cursor-pointer select-none"
            onClick={() => handleCollapse(comment.id)}
          >
            {`[+] ${commentsCount} comments collapsed`}
          </div>
        </div>
      );
    }

    return (
      <div key={comment.id} className="pt-2 m-4 relative a:text-purple-600">
        <div
          className="border-t border-gray-200 dark:border-gray-700 absolute w-full top-5 left-6"
          style={{ width: "calc(100% - 20px)" }}
        />
        <span
          className="cursor-pointer select-none"
          onClick={() => handleCollapse(comment.id)}
        >
          {isCollapsed ? "[+]" : "[-]"}
        </span>
        <div className="pl-6">
          <div className="w-full pb-2 text-xs text-gray-500 dark:text-gray-400">
            <span>
              <a
                className="underline"
                target="_blank"
                href={comment.author}
                rel="noreferrer"
              >
                {comment.author}
              </a>
              &nbsp;
              {timeDistance && <span>{timeDistance}</span>}
            </span>
          </div>
          <div className="items-container" dangerouslySetInnerHTML={{ __html: comment.text }} />
          {hasChildren &&
            comment.children.map((value: IComment) => renderComment(value))}
        </div>
      </div>
    );
  };

  return (
    <div className="text-sm dark:text-white">
      <div className="bg-white min-h-full flex items-center border-b last:border-b-0 border-gray-200 dark:bg-light-dark dark:border-gray-700">
        <div className="text-indigo-600 flex-shrink-0 font-bold w-20 text-center dark:text-indigo-300">
          {data.item.points}
        </div>
        <div className="flex items-center flex-col h-full p-4 pl-0 text-sm sm:text-base text-gray-500 dark:text-gray-300">
          <span className="w-full">
            <a
              className="text-gray-700 dark:text-white"
              target="_blank"
              href={data.item.url}
              rel="noreferrer"
            >
              {data.item.title}&nbsp;
            </a>
            {host && <span className="text-xs">({host})</span>}
          </span>
          <span className="w-full pt-2 text-xs">
            <span>
              by&nbsp;
              <a
                className="underline"
                target="_blank"
                href={data.item.url}
                rel="noreferrer"
              >
                {data.item.author}
              </a>
              &nbsp;
              {timeDistance && <span>| {timeDistance}</span>}
            </span>
          </span>
        </div>
      </div>
      <div className="text-base m-4 underline text-gray-700 dark:text-gray-400">
        <span>{data.item.totalComments || 'No'} comments</span>
      </div>
      {data.item.children.map((comment: IComment) => renderComment(comment))}
    </div>
  );
}

import { useState } from "react";
import { Link } from "remix";

import { extractHost } from "~/utils/url";
import { formatDate } from "~/utils/date";
import { count } from "~/utils/tree";

import { IStory } from "~/typings";

interface IProps extends IStory {
  showScore?: boolean;
}

function Story(props: IProps) {
  const [showDescription, setShowDescription] = useState(false);
  const {
    id,
    author,
    time,
    points,
    created_at_i,
    text,
    title,
    url,
    showScore,
    children = [],
  } = props;
  const host = extractHost(url);
  const timestamp = created_at_i || time;
  const timeDistance = formatDate(timestamp);

  const handleToggle = () => {
    setShowDescription((v) => !v);
  };

  const commentsCount = count(children, "children");

  return (
    <div
      key={id}
      className="bg-white min-h-full flex items-center border-b last:border-b-0 border-gray-200 dark:bg-light-dark dark:border-gray-700"
    >
      {showScore && (
        <div className="text-indigo-600 flex-shrink-0 font-bold w-20 text-center dark:text-indigo-300">
          {points}
        </div>
      )}
      <div className="flex items-center flex-col h-full p-4 text-sm sm:text-base text-gray-400 dark:text-gray-300">
        <span className="w-full" title={text}>
          <a
            className="text-gray-700 dark:text-white"
            target="_blank"
            href={url}
            rel="noreferrer"
          >
            {title}&nbsp;
          </a>
          {host && <span className="text-xs">({host})</span>}
        </span>
        <span className="w-full pt-2 text-xs">
          <span>
            by&nbsp;
            <a
              className="underline"
              target="_blank"
              href={url}
              rel="noreferrer"
            >
              {author}
            </a>
            &nbsp;
            {timeDistance && <span>| {timeDistance}</span>}
            {text && (
              <span onClick={handleToggle}>
                &nbsp;|&nbsp;
                <span className="underline cursor-pointer select-none">
                  {showDescription ? "Hide description" : "See description"}
                </span>
              </span>
            )}
          </span>
        </span>
        {commentsCount > 0 && (
          <Link
            className="underline pt-2 text-xs w-full"
            to={`/item?id=${props.id}`}
          >
            {commentsCount > 0 ? `${commentsCount} comments` : "Discuss"}
          </Link>
        )}
        {showDescription && text && (
          <span
            className="text-xs p-2 text-gray-800 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </div>
  );
}

export default Story;

import { useEffect } from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
  useNavigate,
} from "remix";
import type { LinksFunction } from "remix";

import { Pager, Switch } from "~/components";

import styles from "~/styles/tailwind.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 500:
      message = (
        <p>
          Oops! An error has occurred and we're working to fix the problem. We
          will be up and running shortly.
        </p>
      );
      break;
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById("children");
    if (el) {
      el.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  return (
    <div className="w-full h-screen flex flex-col">
      <header>
        <div className="bg-indigo-600 h-12 flex items-center justify-center space-x-4 sm:space-x-8">
          <Link
            className="transition duration-300 text-sm text-gray-300 hover:text-white"
            to="/"
          >
            HN
          </Link>
          <Link
            className="transition duration-300 text-sm text-gray-300 hover:text-white"
            to="/news"
          >
            New
          </Link>
          <Link
            className="transition duration-300 text-sm text-gray-300 hover:text-white"
            to="/show"
          >
            Show
          </Link>
          <Link
            className="transition duration-300 text-sm text-gray-300 hover:text-white"
            to="/ask"
          >
            Ask
          </Link>
          <Link
            className="transition duration-300 text-sm text-gray-300 hover:text-white"
            to="/jobs"
          >
            Jobs
          </Link>
          <Switch />
        </div>
      </header>
      <div
        id="children"
        className="overflow-y-scroll overflow-x-hidden dark:bg-light-dark dark:text-white h-full"
      >
        {children}
      </div>
    </div>
  );
}

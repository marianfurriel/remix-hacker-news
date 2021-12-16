import { useEffect } from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useCatch,
  useLocation,
} from "remix";
import type { LinksFunction } from "remix";

import { Switch } from "~/components";

import styles from "~/styles/tailwind.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

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

  const linkClassName = "transition duration-300 text-sm text-gray-300 hover:text-white";

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-indigo-600 h-12 flex items-center justify-center flex-column">
        <div className="ml-auto space-x-4 sm:space-x-8">
          <Link className={linkClassName} to="/">
            HN
          </Link>
          <Link className={linkClassName} to="/news">
            New
          </Link>
          <Link className={linkClassName} to="/show">
            Show
          </Link>
          <Link className={linkClassName} to="/ask">
            Ask
          </Link>
          <Link className={linkClassName} to="/jobs">
            Jobs
          </Link>
        </div>
        <div className="p-2 ml-auto">
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

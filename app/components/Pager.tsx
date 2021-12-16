import { useLocation, useNavigate } from "remix";
import classnames from "classnames";

import { getUrlParams } from "~/utils/pager";

interface IProps {
  route?: string,
}

function Pager(props: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = getUrlParams(location);

  const navigatePrevious = () => {
    if (urlParams.page >= 1 || props.route) {
      if (urlParams.page === 2) {
        return navigate(`/${props.route}`);
      }
  
      if (urlParams.page > 0) {
        navigate(`/${props.route}?p=${urlParams.page - 1}`);
      }
    }
  };

  const navigateNext = () => {
    if (props.route) {
      navigate(`/${props.route}?p=${urlParams.page + 1}`);
    }  
  };

  const prevClassName = classnames("hover:cursor-pointer hover:text-gray-800", {
    "hover:cursor-default text-gray-300 hover:text-gray-300": urlParams.page === 0,
  });

  return (
    <div className="h-12 flex items-center text-sm justify-center shadow border-t border-gray-200 dark:border-gray-600 space-x-4 text-gray-600 dark:bg-light-dark dark:text-gray-400">
      <span
        onClick={navigatePrevious}
        className={prevClassName}
        data-testid="prev-btn"
      >
        &lt; prev
      </span>
      <span>page {urlParams.page}</span>
      <span
        onClick={navigateNext}
        className="hover:cursor-pointer hover:text-gray-800 dark:hover:text-white"
        data-testid="next-btn"
      >
        next &gt; 
      </span>
    </div>
  );
}

export default Pager;

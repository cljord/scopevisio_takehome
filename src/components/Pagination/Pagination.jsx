import React from "react";
import { useEffect, useState } from "react";

import "./Pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pages.push(i);
    }

    setCurrentPage(Math.min(pages.length, currentPage));

    setPages(pages);
  }, [totalPosts]);

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            className={page === currentPage ? "active" : ""}
            key={index}
            onClick={() => setCurrentPage(page)}
            type="button"
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

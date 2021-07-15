import React, { useState } from "react";

import { useSelector } from "react-redux";
import moment from "moment";

import actionTypes from "constants/actionTypes";
import "assets/styles/SearchResults.css";

function ResultsDesc({ resultsCount, showingCount }) {
  return resultsCount ? (
    <>
      <span>Showing</span> {showingCount} <span>of</span> {resultsCount}
    </>
  ) : (
    <span>Sorry, We didn't find anything.</span>
  );
}

function SearchResults(props = {}) {
  const { showMatch, handleMoreToggle, searchQuery } = props;

  const {
    items: results,
    total_count: resultsCount,
    type: resultsType,
    query,
  } = useSelector((state) => {
    return {
      ...(state?.searchResults || {}),
      items: Object.values(state?.searchResults?.items || {}),
    };
  });

  const [activeResult, setActiveResult] = useState(null);
  const [moreResult, setMoreResult] = useState(null);

  function openInNewTab(url) {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  const isOptimisticMain =
    query === searchQuery && resultsType === actionTypes.SEARCH_QUERY;

  return (
    <div className='SearchResults'>
      {showMatch && !isOptimisticMain ? (
        <p className='SearchResults-Desc' style={{ color: "black" }}>
          <ResultsDesc {...{ resultsCount, showingCount: results?.length }} />
        </p>
      ) : null}

      {isOptimisticMain ? (
        <p className='SearchResults-Desc' style={{ color: "black" }}>
          <span>Searching...</span>
        </p>
      ) : null}

      <ul style={{ padding: 0, margin: 0 }}>
        {showMatch && results?.length
          ? results?.map((result = {}) => {
              const {
                id,
                login,
                avatar_url,
                location,
                updated_at,
                email,
                html_url,
                name,
                created_at,
                public_repos,
              } = result;

              const isOptimistic = !(
                location ||
                name ||
                email ||
                updated_at ||
                created_at
              );

              const isActive = activeResult === id;
              const isMore = moreResult === id;

              function handleMore() {
                if (!isOptimistic) {
                  setMoreResult(isMore ? null : id);
                }
              }

              function openProfile() {
                openInNewTab(html_url);
              }

              function openRepos() {
                openInNewTab(html_url + "?tab=repositories");
              }

              return (
                <li
                  key={id}
                  className='Candy-Wrapper'
                  onMouseEnter={() => {
                    setActiveResult(id);
                  }}
                  onMouseLeave={() => {
                    if (isActive) {
                      setActiveResult(null);
                    }
                  }}
                  onClick={handleMore}
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    backgroundColor: "white",
                    boxShadow: isActive
                      ? "0 4px 17px rgba(77,77,77,0.27)"
                      : "0 2.7px 4px rgba(77,77,77,0.07)",
                    transform: isActive ? "scale(1.07)" : "scale(1)",
                    borderRadius: 7,
                    margin: "1rem",
                    minHeight: "20vh",
                    minWidth: "70vw",
                    maxWidth: "90vw",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                    }}>
                    <img
                      onClick={openProfile}
                      className='Candy-Avatar'
                      src={avatar_url}
                      style={{
                        maxHeight: 77,
                        borderRadius: "50%",
                        cursor: "pointer",
                        border: "1px solid rgb(75, 0, 130)",
                      }}
                    />
                    <div
                      className='Candy-names'
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}>
                      <span
                        className={`Candy-name ${
                          !isOptimistic ? "" : "Candy-optimistic"
                        }`}>
                        {name}
                      </span>
                      <span
                        className='Candy-login deet-link'
                        onClick={openProfile}>
                        @{login}
                      </span>
                      <span
                        className={`Candy-deet ${
                          !isOptimistic ? "" : "Candy-optimistic"
                        }`}>
                        {location}
                      </span>
                    </div>
                  </div>
                  {isMore ? (
                    <div className='Candy-more-deets'>
                      <span
                        className={`Candy-deet ${
                          !isOptimistic ? "" : "Candy-optimistic"
                        } left-text`}>
                        {email ? `Email: ${email}` : ""}
                      </span>
                      <span
                        onClick={openRepos}
                        className={`Candy-deet ${
                          !isOptimistic ? "" : "Candy-optimistic"
                        } deet-link`}>
                        Public Repos: {public_repos || 0}
                      </span>
                      <span
                        className={`Candy-deet ${
                          !isOptimistic ? "" : "Candy-optimistic"
                        } left-text`}>
                        {created_at
                          ? `Account Creation: ${moment(created_at).format(
                              "MMMM d, YYYY"
                            )}`
                          : ""}
                      </span>
                      <span
                        className={`Candy-deet ${
                          !isOptimistic ? "" : "Candy-optimistic"
                        }`}>
                        {updated_at
                          ? `Last Updated: ${moment(updated_at).fromNow()}`
                          : ""}
                      </span>
                    </div>
                  ) : null}
                  {isActive && !isOptimistic ? (
                    <div className='Candy-more' onClick={handleMore}></div>
                  ) : null}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default SearchResults;

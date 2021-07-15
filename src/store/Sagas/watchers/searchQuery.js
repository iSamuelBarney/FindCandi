import { take, delay, cancel, put, fork, select } from "redux-saga/effects";
import actionTypes from "constants/actionTypes";

import axios from "axios";

const { SEARCH_QUERY } = actionTypes || {};

async function getSearchQuery(searchQuery = "") {
  const defaultResponse = {};
  try {
    const getResults = await axios(
      `https://find-candi-api.herokuapp.com//search/${searchQuery}`
    );

    return getResults?.data || {};
  } catch (e) {
    console.error({
      type: actionTypes.SEARCH_QUERY_RESULTS,
      tags: ["getSearchQuery"],
      e,
    });
    return defaultResponse;
  }
}

function* searchQueryWatcher() {
  while (true) {
    try {
      const action = yield take(SEARCH_QUERY);

      const searchResults = yield getSearchQuery(action?.data);

      yield delay(277);
      yield put({
        type: actionTypes.SEARCH_QUERY_RESULTS,
        data: searchResults,
      });
    } catch (e) {
      console.error({ type: actionTypes.SEARCH_QUERY, e });
    }
  }
}

export default searchQueryWatcher;

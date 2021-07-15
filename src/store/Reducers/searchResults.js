import actionTypes from "constants/actionTypes";

const initialState = {
  data: null,
  query: null,
  type: null,
};

function searchResults(state = initialState, action = {}) {
  const { data, type, query = state?.query } = action;

  switch (action?.type) {
    case actionTypes?.SEARCH_QUERY: {
      return {
        ...state,
        type,
        query: data,
      };
    }
    case actionTypes?.SEARCH_QUERY_RESULTS: {
      return {
        ...state,
        ...data,
        type,
        query,
      };
    }
    case actionTypes?.SEARCH_QUERY_DETAILS: {
      const newData = {};
      if (Object.keys(data || {})?.length) {
        for (let resultId in data) {
          if (state?.items?.[resultId] && data?.[resultId]) {
            newData[resultId] = {
              ...(state.items[resultId] || {}),
              ...(data[resultId] || {}),
            };
          }
        }
      }

      return {
        ...state,
        items: {
          ...newData,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default searchResults;

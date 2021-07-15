import actionTypes from "constants/actionTypes";

const initialState = {};

function token(state = initialState, action = {}) {
  switch (action?.type) {
    case actionTypes?.GITHUB_TOKEN: {
      return {
        ...(action?.data || {}),
      };
    }

    default: {
      return state;
    }
  }
}

export default token;

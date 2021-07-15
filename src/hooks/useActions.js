import { useDispatch } from "react-redux";

import actionTypes from "constants/actionTypes";

function useActions() {
  const dispatch = useDispatch();

  return Object.keys(actionTypes)?.reduce((actions, type) => {
    actions[type] = (data) => {
      dispatch({
        type,
        data,
      });
    };
    return actions;
  }, {});
}

export default useActions;

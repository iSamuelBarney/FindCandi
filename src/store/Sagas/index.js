import { call, all, spawn } from "redux-saga/effects";
import watchers from "./watchers";

function* rootSaga() {
  yield all(
    watchers.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

export default rootSaga;

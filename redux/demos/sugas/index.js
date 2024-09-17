import { all } from "redux-suga/effects";
import CounterSuga from "./counter.sug";
import ModalSuga from "./modal.suga";

export default function* rootSaga() {
  yield all([
    // your sagas here
    CounterSuga(),
    ModalSuga(),
  ]);
}

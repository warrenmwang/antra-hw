import { useContext } from "react";
import MyContext from "../components/MyContext";

export default function useMyDispatch() {
  const { store } = useContext(MyContext);
  return store.dispatch;
}

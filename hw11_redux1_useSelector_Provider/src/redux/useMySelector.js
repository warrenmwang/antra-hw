import { useContext, useEffect, useState } from "react";
import MyContext from "../components/MyContext";

export default function useMySelector(selectorFn, options) {
  // options?: EqualityFn | UseSelectorOptions

  const { store } = useContext(MyContext);

  // implement options equalityFn
  // Default uses a strict comparison
  let comparator = (a, b) => a === b;
  if (options) {
    if (options.equalityFn) {
      // assume is a function, no actual type validation
      comparator = options.equalityFn;
    }
  }

  const [selectedState, setSelectedState] = useState(
    selectorFn(store.getState())
  );

  // This subscribe triggers whenever a dispatch is run anywhere, and it
  // will update the selectedState again, causing any components that use
  // the returned selectedState of this custom hook to be re-rendered as a result.
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Use comparator to check if need to update state
      // if equality occurs, don't update state to not trigger re-render
      const newSelected = selectorFn(store.getState());
      if (comparator(newSelected, selectedState)) return;
      setSelectedState(newSelected);
    });
    return () => unsubscribe();
  }, []); // only run once when custom hook is called

  return selectedState;
}

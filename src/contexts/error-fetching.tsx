import { PropsWithChildren, useState, createContext, useContext } from "react";

function useErrorsFetchingIntialsProps() {
  const [wasError, setWasError] = useState(null);
  return {
    wasError: !!wasError,
    setWasError,
  };
}

const ErrorsFetchingContext = createContext({
  wasError: false,
  setWasError: (v: any) => {},
});

export function ErrorsFetchingProvider({ children }: PropsWithChildren) {
  const context = useErrorsFetchingIntialsProps();
  return (
    <ErrorsFetchingContext.Provider value={context}>
      {children}
    </ErrorsFetchingContext.Provider>
  );
}
export function useErrorsFetching() {
  return useContext(ErrorsFetchingContext);
}

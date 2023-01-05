import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { API_URL } from "../data";
const AnimesContext = createContext({
  loading: true,
  recents: [],
  populars: [],
  movies: [],
  topHairing: [],
  nextReleasePage: () => {},
});
const AppWithAnimesQueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 60000 * 60,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export function Provider({ children }: PropsWithChildren) {
  return (
    <AppWithAnimesQueryClientProvider>
      {children}
    </AppWithAnimesQueryClientProvider>
  );
}

export function useAnimes() {
  const context = React.useContext(AnimesContext);
  if (context === undefined) {
    throw new Error("useAnimes must be used within animesProvider");
  }
  return context;
}

const useAnimesInit = () => {
  const [recentsReleasePage, setRecentsReleasePage] = useState(1);
  function nextReleasePage() {
    setRecentsReleasePage((v) => v + 1);
  }
  const {
    data,
    isLoading: recentsLoading,
    error: recentsError,
  } = useInfiniteQuery(
    ["recent-release", recentsReleasePage],
    () => fetchAnimes(`${API_URL}/recent-release?p=${recentsReleasePage}`),
    { keepPreviousData: true }
  );

  useEffect(() => console.log(",....", data), [data]);

  let recents: never[] = [];

  const {
    data: populars,
    isLoading: popularsLoading,
    error: popularsError,
  } = useQuery(["popular"], () => fetchAnimes(`${API_URL}/popular`));

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery(["anime-movies"], () => fetchAnimes(`${API_URL}/anime-movies`));

  const {
    data: topHairing,
    isLoading: topHairingLoading,
    error: topHairingError,
  } = useQuery(["top-airing"], () => fetchAnimes(`${API_URL}/top-airing`));
  const loading = useMemo(() => {
    return (
      recentsLoading ||
      popularsLoading ||
      moviesLoading ||
      topHairingLoading ||
      topHairingLoading ||
      popularsLoading
    );
  }, [recentsLoading, popularsLoading, moviesLoading, topHairingLoading]);
  return {
    loading,
    recents: recents || [],
    populars: populars || [],
    movies: movies || [],
    topHairing: topHairing || [],
    nextReleasePage,
  };
};

async function fetchAnimes(url: string) {
  const resp = await fetch(url);
  return await resp.json();
}

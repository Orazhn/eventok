import { useEffect, useRef } from "react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

interface UseInfiniteScrollProps<T> {
  query: UseInfiniteQueryResult<T>;
  hasNextPage: boolean;
  data: T[] | undefined;
}

export function useInfiniteScroll<T>({
  query,
  hasNextPage,
  data,
}: UseInfiniteScrollProps<T>) {
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastItemRef.current || !hasNextPage) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        query.fetchNextPage();
      }
    };

    const observerInstance = new IntersectionObserver(handleObserver);
    observerInstance.observe(lastItemRef.current);

    if (lastItemRef.current.getBoundingClientRect().top < window.innerHeight) {
      query.fetchNextPage();
    }

    return () => observerInstance.disconnect();
  }, [hasNextPage, data, query]);

  return {
    lastItemRef,
    isLoading: query.isFetchingNextPage,
    isFetching: query.isFetching,
    status: query.status,
  };
}

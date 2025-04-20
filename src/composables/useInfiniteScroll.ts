import { ref, onMounted } from 'vue';
import axios from 'axios';

interface UseInfiniteScrollOptions<T> {
  url: string;
  limit?: number;
  mapper?: (item: any) => T;
}

export const useInfiniteScroll = <T = any>(options: UseInfiniteScrollOptions<T>) => {
  const items = ref<T[]>([]);
  const lastElement = ref<HTMLElement | null>(null);
  const limit = options.limit || 20;
  let start = 0;
  let loading = false;
  let allLoaded = false;

  const loadMore = async () => {
    if (loading || allLoaded) return;
    loading = true;

    const res = await axios.get(options.url, {
      params: { _start: start, _limit: limit },
    });

    const data = options.mapper ? res.data.map(options.mapper) : res.data;

    if (data.length < limit) {
      allLoaded = true;
    }

    items.value.push(...data);
    start += limit;
    loading = false;
  };

  const setupObserver = () => {
    if (!lastElement.value) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    observer.observe(lastElement.value);
  };

  onMounted(() => {
    loadMore();
    setupObserver();
  });

  return {
    items,
    lastElement,
  };
};

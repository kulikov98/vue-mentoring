export default function useIntersection(el: HTMLElement, callback: () => void) {
  const observer = new IntersectionObserver((entries) => {
    const currentEl = entries.find((entry) => entry.target === el);

    if (currentEl?.isIntersecting) {
      callback();
      observer.disconnect();
    }
  }, { rootMargin: '0px 0px 250px 0px' });

  observer.observe(el);
}

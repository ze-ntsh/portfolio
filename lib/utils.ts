import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReactElement, useEffect, useState } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const useIntersection = (element: React.RefObject<any>, rootMargin: string) => {
//   const [isVisible, setState] = useState(false);

//   // @ts-ignore
//   useEffect(() => {
//     const current = element?.current;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setState(entry.isIntersecting);
//       },
//       { rootMargin }
//     );
//     current && observer?.observe(current);

//     return () => current && observer.unobserve(current);
//   }, []);

//   return isVisible;
// };
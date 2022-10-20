import { useState } from "react";
import Link from "next/link";
import corndocsConfig from "../../../corndocs.config";

const Logo = () => {
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <Link href="/" passHref>
      <a className="flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black">
        {!fallbackImage && (
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden dark:text-white">
            <svg
              fill="currentColor"
              className="w-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
            >
              <path d="M13.27 249.8c-.64 5.11-1.71 20.88-2.56 35.16-1.28 21.74-.85 26.21 1.49 26.21 1.7 0 31.33 1.92 65.85 4.26 34.52 2.34 112.73 6.18 173.68 8.74 60.95 2.56 111.03 4.69 111.24 4.9.21.21-2.77 34.95-7.03 76.93-7.25 75.01-12.57 191.58-9.59 205.64 1.28 6.18 23.65 26.42 36.23 33.03 7.03 3.62 7.46 3.62 10.23-.21 1.49-2.13 2.77-5.11 2.77-6.61 0-4.47 3.84-3.2 7.67 2.56 4.48 6.82 15.56 7.46 17.26 1.07 1.28-5.12.85-5.12 10.23-.64l7.46 3.62-1.28 13.43-1.49 13.42h13.21c8.52 0 15.98 1.28 21.1 4.05 4.26 2.13 14.06 4.9 21.52 6.18 7.67 1.49 17.26 4.9 21.74 7.88 4.47 2.98 8.95 5.33 9.8 5.33.85 0 4.47-2.77 8.1-6.18 6.18-6.18 6.82-6.18 17.69-4.05 10.23 2.13 11.93 3.41 19.18 13.64 4.26 6.39 9.59 11.51 11.51 11.51 2.56 0 3.84 2.13 4.26 7.88.64 6.61 1.49 8.1 7.03 9.59 5.54 1.28 7.24.64 14.07-5.97 6.82-6.6 8.31-7.24 13.42-5.11 3.2 1.07 9.38 2.13 13.85 2.13 7.24 0 8.31.85 12.15 8.74 3.62 8.1 5.54 9.59 18.33 14.28 19.82 7.03 23.01 5.97 30.47-11.29 7.46-17.9 12.15-18.33 21.31-1.49.21.21 5.97 1.49 13 2.77 6.82 1.07 22.38 5.54 34.31 9.8 19.61 6.82 22.59 7.24 28.34 4.9 4.69-1.92 7.03-4.9 8.95-10.87l2.34-8.31h15.56c8.52 0 18.11 1.07 21.1 2.56 4.69 2.13 6.39 1.71 14.7-4.26 11.29-8.31 15.56-8.52 18.33-1.49 1.92 4.9 2.98 5.33 15.77 5.33s14.06-.43 18.96-6.61c4.26-5.54 6.18-6.39 11.29-5.11 3.41.64 8.95 4.9 12.57 9.38 7.03 9.17 24.51 19.61 39.42 23.87 5.33 1.49 11.51 4.05 13.85 5.54 2.34 1.49 5.12 2.77 6.18 2.77 1.28 0 1.49-47.1.64-123.17-1.07-106.34-1.92-127.44-5.75-155.99-2.34-18.11-4.26-44.96-4.26-59.46 0-19.61-1.28-33.03-5.33-52.21-5.97-29.62-9.59-57.11-9.59-72.88 0-5.97-.64-13.64-1.28-17.05l-1.28-6.18-183.48-.64c-172.61-.43-193.5-.85-346.72-7.89-89.72-4.05-186.89-8.95-216.3-10.65-29.2-1.71-83.96-4.69-121.47-6.39s-70.74-3.85-73.72-4.49c-5.33-1.06-5.76-.42-7.03 8.1z" />
            </svg>
          </span>
        )}
        <span className="carena hidden md:inline-block">
          {corndocsConfig.project.name}
        </span>
      </a>
    </Link>
  );
};

export default Logo;

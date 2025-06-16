import { useEffect, useState } from "react";

export function useFilePreviews(files: File[] = []) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  return previews;
}

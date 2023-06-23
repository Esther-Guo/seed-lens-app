import { useAtom } from "jotai";
import { useEffect } from "react";
import { zoomAtom } from "~/config/atom";

const MINWIDTH = 1400;

function useZoom() {
  const [zoom, setZoom] = useAtom(zoomAtom);

  useEffect(() => {
    function handleResize() {
      const { innerWidth } = window;
      const ratio = Math.max(innerWidth / 1920, MINWIDTH / 1920);
      setZoom(ratio);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { zoom };
}

export default useZoom;
import { fileSystem } from "@/lib/file-system";
import { useNavContext } from "../../context/nav-context";
import { cn } from "@/lib/utils";

export const Navigation = ({ show = true }) => {
  const { route, setRouteWithScroll } = useNavContext();

  if (!show) return null;

  return (
    <div className="fixed bg-[--text-primary] right-5 mt-5 p-3 rounded-md max-sm:right-1">
      {Object.keys(fileSystem).map((nav, index) => (
        <div
          key={index}
          className={cn("text-[--text-inverse] text-xl cursor-pointer", route == nav ? "bg-slate-400" : "")}
          onClick={() => setRouteWithScroll(nav)}
        >
          {nav}
        </div>
      ))}
    </div>
  );
};

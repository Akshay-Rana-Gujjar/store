import { useLocation } from "react-router-dom";

export default function HideElement({ hideOnPaths = [], children = null }) {
  const location = useLocation();
  if (hideOnPaths.includes(location.pathname)) return null;
  return children;
}

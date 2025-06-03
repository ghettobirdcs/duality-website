"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

// Optionally, you can delay mounting until client if hydration issues are severe
export default function Spinner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optionally, skip SSR rendering entirely
  if (!mounted) return null;

  return (
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      style={{ color: "#ffe066", fontSize: "2.5rem" }} // consistent size
      aria-label="Loading"
    />
  );
}

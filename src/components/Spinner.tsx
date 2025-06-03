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

  return (
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      style={{ color: "#fff", fontSize: "2.2rem" }} // consistent size
      aria-label="Loading"
    />
  );
}

import { Suspense } from "react";
import LandingClient from "./LandingClient";
import Spinner from "@/components/Spinner";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="fullpage-center">
          <div className="landing-box">
            <Spinner />
          </div>
        </div>
      }
    >
      <LandingClient />
    </Suspense>
  );
}

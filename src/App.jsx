import React from "react";
import FeatureShowcase from "./components/FeatureShowcase";

export default function App() {
  return (
    <div className="min-h-screen">
      <section className="h-[110vh] grid place-items-center bg-white">
        <div className="max-w-3xl px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Feature Showcase Component</h1>
          <p className="mt-4 text-gray-600">Scroll down to view the feature showcase. While the section is in view, scrolling steps through features (1 → 5).</p>
        </div>
      </section>

      <FeatureShowcase />

      <section className="h-[100vh] grid place-items-center bg-gray-50">
        <p className="text-gray-600">End of demo content.</p>
      </section>
    </div>
  );
}

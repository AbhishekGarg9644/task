import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { id:1, title:"Feature No. 1", heading:"Text Heading Display", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.", gradient:"from-indigo-400 via-purple-400 to-pink-400" },
  { id:2, title:"Feature No. 2", heading:"Lens-grade Glass Display", body:"Quisque ac urna auctor, tristique ipsum non, laoreet augue.", gradient:"from-sky-400 via-cyan-400 to-emerald-400" },
  { id:3, title:"Feature No. 3", heading:"Adaptive 120Hz Refresh", body:"Sed dignissim, libero ac sodales dapibus, massa risus interdum nibh.", gradient:"from-amber-300 via-orange-400 to-rose-400" },
  { id:4, title:"Feature No. 4", heading:"Pro-grade Camera Pipeline", body:"Praesent ut ligula sit amet dui porttitor iaculis.", gradient:"from-fuchsia-400 via-violet-400 to-blue-400" },
  { id:5, title:"Feature No. 5", heading:"Secure Enclave & Privacy", body:"Mauris hendrerit, sapien et luctus tincidunt, odio dolor faucibus augue.", gradient:"from-lime-300 via-emerald-400 to-teal-400" }
];

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const last = features.length - 1;
  const { ref, inView } = useInView({ threshold: 0.25 });
  const wheelLock = useRef(false);

  const isSticky = inView && active < last;

  useEffect(() => {
    if (!isSticky) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaY > 0 && active < last) setActive(v => Math.min(v+1, last));
      if (e.deltaY < 0 && active > 0) setActive(v => Math.max(v-1, 0));
      setTimeout(() => (wheelLock.current = false), 450);
    };
    window.addEventListener("wheel", onWheel, { passive:false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isSticky, active, last]);

  useEffect(() => {
    if (!inView) return;
    let t = null;
    if (active < last) {
      t = setInterval(() => {
        setActive(v => {
          if (v >= last) { clearInterval(t); return v; }
          return v + 1;
        });
      }, 2000);
    }
    return () => clearInterval(t);
  }, [inView, active, last]);

  useEffect(() => {
    const onKey = (e) => {
      if (!inView) return;
      if (e.key === "ArrowRight") setActive(v => Math.min(v+1, last));
      if (e.key === "ArrowLeft") setActive(v => Math.max(v-1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, last]);

  return (
    <section ref={ref} className="relative w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className={isSticky ? "sticky top-24 self-start" : "self-start"}>
            <div className="flex flex-col items-center md:items-start">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                  className="relative w-[260px] h-[520px] md:w-[300px] md:h-[560px] rounded-[48px] bg-black shadow-phone overflow-hidden">
                  <div className={`absolute inset-4 rounded-[36px] bg-gradient-to-br ${features[active].gradient}`} />
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-6 bg-black rounded-b-2xl" />
                </motion.div>
              </AnimatePresence>

              <h3 className="mt-8 text-blue-600 font-semibold">{features[active].title}</h3>
              <h2 className="text-2xl md:text-3xl font-bold mt-1">{features[active].heading}</h2>
              <p className="text-gray-600 mt-3 leading-relaxed">{features[active].body}</p>

              <div className="mt-4 flex items-center gap-6 select-none">
                <button onClick={() => setActive(v => Math.max(v-1,0))} className="text-2xl px-3 py-1 rounded-xl border hover:bg-gray-50">←</button>
                <button onClick={() => setActive(v => Math.min(v+1,last))} className="text-2xl px-3 py-1 rounded-xl border hover:bg-gray-50">→</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="text-gray-900 font-semibold mb-4">Feature Showcase</h4>
            <ul className="space-y-3">
              {features.map((f, idx) => {
                const activeItem = idx === active;
                return (
                  <li key={f.id}>
                    <button onClick={() => setActive(idx)} className={"group w-full flex items-center gap-3 py-3 px-3 rounded-xl transition text-left " + (activeItem ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-50")}>
                      <span className={"inline-block w-3 h-3 rounded-full flex-shrink-0 " + (activeItem ? "bg-blue-600" : "bg-gray-200 group-hover:bg-gray-300")} />
                      <div className={activeItem ? "text-blue-700 font-medium" : "text-gray-700"}>
                        <div>{f.title}</div>
                        <div className="text-sm text-gray-500">Lorem ipsum dolor</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

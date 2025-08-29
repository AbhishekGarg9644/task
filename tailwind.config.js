/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: { boxShadow: { phone: "0 10px 30px rgba(0,0,0,0.2)" } } },
  plugins: []
};

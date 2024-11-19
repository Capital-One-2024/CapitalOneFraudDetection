/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "/index.html"],
    theme: {
        extend: {
            colors: {
                "c1-red": "#D22E1E",
                "c1-blue": "#004878",
            },
        },
    },
    plugins: [],
};

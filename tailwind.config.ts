module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./src/**/**/*.tsx", // 하위 폴더도 전부 포함되도록
  ],
  safelist: [
    "prose",
    "prose-sm",
    "dark:prose-invert",
    "prose-h1",
    "prose-h2",
    "prose-p",
    "prose-code",
    "prose-blockquote",
    "inline-code", // 커스텀용
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};

const config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/node_modules/jest-css-modules",
    "~/(.+)": "<rootDir>/_src/$1",
  },
  roots: ["<rootDir>/_src"],
  transform: {
    "^.+\\.js$": "esbuild-jest",
  },
};

export default config;

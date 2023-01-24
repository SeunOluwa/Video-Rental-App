import "dotenv/config";

const getStringConfigValue = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} was not set in environment variable`);
  }
  return value;
};

const getNumericConfigValue = (key: string): number => {
  const stringValue: string = getStringConfigValue(key);
  const numericValue: number = Number(stringValue);
  if (!numericValue) {
    throw new Error(`${key} is expected to be a numeric value`);
  }
  return numericValue;
};

interface Config {
  NODE_ENV: string;
  PORT: number;
  JWT_ACCESS_SECRET: string;
}

const config: Config = {
  NODE_ENV: getStringConfigValue("NODE_ENV"),
  PORT: getNumericConfigValue("PORT"),
  JWT_ACCESS_SECRET: getStringConfigValue("JWT_ACCESS_SECRET"),
};

export default config;

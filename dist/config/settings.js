"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getStringConfigValue = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} was not set in environment variable`);
    }
    return value;
};
const getNumericConfigValue = (key) => {
    const stringValue = getStringConfigValue(key);
    const numericValue = Number(stringValue);
    if (!numericValue) {
        throw new Error(`${key} is expected to be a numeric value`);
    }
    return numericValue;
};
const config = {
    NODE_ENV: getStringConfigValue("NODE_ENV"),
    PORT: getNumericConfigValue("PORT"),
    JWT_ACCESS_SECRET: getStringConfigValue("JWT_ACCESS_SECRET"),
};
exports.default = config;
//# sourceMappingURL=settings.js.map
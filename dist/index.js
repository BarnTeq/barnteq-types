"use strict";
/**
 * @barnteq/types - Shared TypeScript types for BarnTeq edge and cloud services
 *
 * This package provides unified type definitions to ensure consistency
 * between barnteq-edge and barnteq-cloud codebases.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReadingToEdge = exports.transformReadingToCloud = exports.ageToBirthDate = exports.birthDateToAge = exports.camelToSnake = exports.snakeToCamel = exports.camelToSnakeString = exports.snakeToCamelString = exports.secondsToHours = exports.hoursToSeconds = exports.secondsToMinutes = exports.minutesToSeconds = exports.isoToUnixMs = exports.unixMsToIso = exports.isoToDate = exports.dateToIso = exports.isoToUnix = exports.unixToIso = exports.EDGE_SENSOR_TO_DEVICE_TYPE = exports.DEVICE_ENTITY_CLASSES = exports.isStallLocation = exports.isEdgeConfig = exports.API_ERROR_CODES = void 0;
// API Types
var api_1 = require("./api");
Object.defineProperty(exports, "API_ERROR_CODES", { enumerable: true, get: function () { return api_1.API_ERROR_CODES; } });
// Edge Config Types (flat devices array structure)
var barnConfig_1 = require("./barnConfig");
Object.defineProperty(exports, "isEdgeConfig", { enumerable: true, get: function () { return barnConfig_1.isEdgeConfig; } });
Object.defineProperty(exports, "isStallLocation", { enumerable: true, get: function () { return barnConfig_1.isStallLocation; } });
Object.defineProperty(exports, "DEVICE_ENTITY_CLASSES", { enumerable: true, get: function () { return barnConfig_1.DEVICE_ENTITY_CLASSES; } });
// Device Types
var device_1 = require("./device");
Object.defineProperty(exports, "EDGE_SENSOR_TO_DEVICE_TYPE", { enumerable: true, get: function () { return device_1.EDGE_SENSOR_TO_DEVICE_TYPE; } });
// Transform Utilities
var transforms_1 = require("./transforms");
// Timestamp conversions
Object.defineProperty(exports, "unixToIso", { enumerable: true, get: function () { return transforms_1.unixToIso; } });
Object.defineProperty(exports, "isoToUnix", { enumerable: true, get: function () { return transforms_1.isoToUnix; } });
Object.defineProperty(exports, "dateToIso", { enumerable: true, get: function () { return transforms_1.dateToIso; } });
Object.defineProperty(exports, "isoToDate", { enumerable: true, get: function () { return transforms_1.isoToDate; } });
Object.defineProperty(exports, "unixMsToIso", { enumerable: true, get: function () { return transforms_1.unixMsToIso; } });
Object.defineProperty(exports, "isoToUnixMs", { enumerable: true, get: function () { return transforms_1.isoToUnixMs; } });
// Time unit conversions
Object.defineProperty(exports, "minutesToSeconds", { enumerable: true, get: function () { return transforms_1.minutesToSeconds; } });
Object.defineProperty(exports, "secondsToMinutes", { enumerable: true, get: function () { return transforms_1.secondsToMinutes; } });
Object.defineProperty(exports, "hoursToSeconds", { enumerable: true, get: function () { return transforms_1.hoursToSeconds; } });
Object.defineProperty(exports, "secondsToHours", { enumerable: true, get: function () { return transforms_1.secondsToHours; } });
// Case conversions
Object.defineProperty(exports, "snakeToCamelString", { enumerable: true, get: function () { return transforms_1.snakeToCamelString; } });
Object.defineProperty(exports, "camelToSnakeString", { enumerable: true, get: function () { return transforms_1.camelToSnakeString; } });
Object.defineProperty(exports, "snakeToCamel", { enumerable: true, get: function () { return transforms_1.snakeToCamel; } });
Object.defineProperty(exports, "camelToSnake", { enumerable: true, get: function () { return transforms_1.camelToSnake; } });
// Age/BirthDate conversions
Object.defineProperty(exports, "birthDateToAge", { enumerable: true, get: function () { return transforms_1.birthDateToAge; } });
Object.defineProperty(exports, "ageToBirthDate", { enumerable: true, get: function () { return transforms_1.ageToBirthDate; } });
// Device reading transforms
Object.defineProperty(exports, "transformReadingToCloud", { enumerable: true, get: function () { return transforms_1.transformReadingToCloud; } });
Object.defineProperty(exports, "transformReadingToEdge", { enumerable: true, get: function () { return transforms_1.transformReadingToEdge; } });

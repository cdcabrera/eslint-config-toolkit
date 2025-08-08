import { defineConfig } from 'eslint/config';
import type { Linter } from 'eslint';
import type Globals from 'globals';

// Define the configuration types
export type BaseConfig = Array<Linter.Config>;
export type NodeConfig = Array<Linter.Config>;
export type ReactConfig = Array<Linter.Config>;
export type JsonConfig = Array<Linter.Config>;
export type JestConfig = Array<Linter.Config>;

// Export individual configurations
export const base: BaseConfig;
export const node: NodeConfig;
export const react: ReactConfig;
export const json: JsonConfig;
export const jest: JestConfig;
export const globals: Globals;

/**
 * A toolkit object containing configuration utilities and helper functions
 * for ESLint. It includes pre-defined configurations for base projects,
 * `Node.js`, `React`, `JSON`, `Jest`, and `globals`.
 */
declare const toolkit: {
    base: BaseConfig;
    node: NodeConfig;
    react: ReactConfig;
    json: JsonConfig;
    jest: JestConfig;
    globals: Globals;
    defineConfig: typeof defineConfig;
};

export default toolkit;

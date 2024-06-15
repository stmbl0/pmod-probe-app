import type { PageConfig } from "../pages/PageConfig";
import type { Selector } from "../types";

export type ProjectConfig = {
    project: {
        title: string;
        id: number;
    }

    options?: ProjectConfigOptions;

    mapping?: {[key: string]: Selector};

    pages: PageConfig[];
}

export type ProjectConfigOptions = {
    showTestsTab?: boolean;
    showScriptsTab?: boolean;
}
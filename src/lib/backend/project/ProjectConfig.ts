import type { PageConfig } from "../pages/PageConfig";

export type ProjectConfig = {
    project: {
        title: string;
        id: number;
    }

    options?: ProjectConfigOptions;

    pages: PageConfig[];
}

export type ProjectConfigOptions = {
    showTestsTab?: boolean;
    showScriptsTab?: boolean;
}
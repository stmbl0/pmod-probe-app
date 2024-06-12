import type { WidgetConfig } from "../widgets/WidgetConfig";

export type PageConfig = {
    id: string;
    title: string;

    layout_sections: PageSectionConfig[];
}

export type PageSectionConfig = {
    title: string;
    layout_tiles_x?: number;
    layout_tiles_y?: number;

    widgets: WidgetConfig[];
}
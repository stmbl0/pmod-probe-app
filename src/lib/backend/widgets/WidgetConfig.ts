export type WidgetConfig = {
    id: string;
    widget: string;

    layout: WidgetLayoutConfig;
    config: {[key: string]: any};
};

export type WidgetLayoutConfig = {
    pos_x?: number;
    pos_y?: number;
    size_x?: number;
    size_y?: number;
};


const DEFAULT_WIDGET_LC: WidgetLayoutConfig = {
    size_x: 1,
    size_y: 1
}
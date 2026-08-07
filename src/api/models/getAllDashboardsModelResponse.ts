export interface AllDashboardsDataResponse {
    content: Content;
    page: Page;
}

export type Content =  [
    {
        owner: string;
        locked: string;
        id: number;
        name: string;
        widgets: Widget[];
    }
]

interface Page {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface Widget {
    widgetName: string;
    widgetId: number;
    widgetType: string;
    widgetSize: WidgetSize;
    widgetPosition: WidgetPosition;
    widgetOptions?: WidgetOptions;
};

interface WidgetSize {
    width: number;
    height: number;
}

interface WidgetPosition {
    positionX: number;
    positionY: number;
}

interface WidgetOptions {
    timeline: string;
    zoom: string;
    viewMode: string;
}

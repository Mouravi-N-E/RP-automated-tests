export type AllDashboardsData = {
    content: Content;
    page: Page;
}

type Content = [
    {
        owner: string;
        locked: string;
        id: number;
        name: string;
        widgets: Widgets;
    }
]

type Page = {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

type Widgets = [
    {
        widgetName: string;
        widgetId: number;
        widgetType: string;
        widgetSize: WidgetSize;
        widgetPosition: WidgetPosition;
        widgetOptions: WidgetOptions;
    }
]

type WidgetSize = {
    width: number;
    height: number;
}

type WidgetPosition = {
    positionX: number;
    positionY: number;
}

type WidgetOptions = {
    timeline: string;
    zoom: string;
    viewMode: string;
}

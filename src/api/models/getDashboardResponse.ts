import { Widget } from "./getAllDashboardsModelResponse";

export type GetDashboardResponse = {
    id: string;
    name: string;
    description?: string;
    owner: string;
    locked: boolean;
    widgets: Widget[];
}
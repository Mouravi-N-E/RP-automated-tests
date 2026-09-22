import { Widget } from "./getAllDashboardsModelResponse";

export interface GetDashboardResponse {
    id: string;
    name: string;
    description?: string;
    owner: string;
    locked: boolean;
    widgets: Widget[];
}
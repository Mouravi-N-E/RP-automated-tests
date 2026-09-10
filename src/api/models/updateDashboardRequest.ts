import { Widget } from "./getAllDashboardsModelResponse";
export interface UpdateDashboardRequest {
    name: string;
    description?: string;
    updateWidgets?: Widget[];
}

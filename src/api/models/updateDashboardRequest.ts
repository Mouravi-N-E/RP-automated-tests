import { Widget } from "./getAllDashboardsModelResponse";
export type UpdateDashboardRequest = {
    name: string;
    description?: string;
    updateWidgets?: Widget[];
}

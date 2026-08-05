export const ErrorMessages = {
    existingDashboardName: (dashboardName: string) => `Resource '${dashboardName}' already exists. You couldn't create the duplicate.`,
    invalidDashboardId: (dashboardId: string) => `Dashboard with ID '${dashboardId}' not found on project 'mentoring-project'. Did you use correct Dashboard ID?`,
    invalidTypeDashId: (dashboardId: string) => `Incorrect Request. Method parameter 'dashboardId': Failed to convert value of type 'java.lang.String' to required type 'java.lang.Long'; For input string: \"${dashboardId}\"`,
};
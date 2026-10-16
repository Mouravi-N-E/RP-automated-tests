# RP-automated-tests

## ReportPortal

Playwright results are sent to ReportPortal only when all of these environment variables are set:

- `REPORTPORTAL_ENDPOINT`: external ReportPortal API endpoint, for example `https://reportportal.example.com/api/v2`
- `REPORTPORTAL_API_KEY`: API key for that ReportPortal instance
- `REPORTPORTAL_PROJECT`: target project name
- `REPORTPORTAL_LAUNCH`: optional launch name (defaults to `RP automated tests`)

Set these in the environment or in the root `.env` file. Without the three required values, the existing list and HTML reporters run as usual. The reporter does not use the CI Docker ReportPortal URL automatically.
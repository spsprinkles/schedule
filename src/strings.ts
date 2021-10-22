import { ContextInfo } from "gd-sprest-bs";

// Updates the strings for SPFx
export const setContext = (context) => {
    // Set the page context
    ContextInfo.setPageContext(context);

    // Update the values
    Strings.SolutionUrl = ContextInfo.webServerRelativeUrl + "/SiteAssets/schedule/index.html";
}

// Strings
const Strings = {
    AppElementId: "schedule",
    GlobalVariable: "Schedule",
    Lists: {
        Schedule: "Schedule"
    },
    ProjectName: "Schedule",
    ProjectDescription: "Displays the calendar events in a gantt chart.",
    SolutionUrl: ContextInfo.webServerRelativeUrl + "/siteassets/schedule/index.html",
    Version: "0.1"
}
export default Strings;
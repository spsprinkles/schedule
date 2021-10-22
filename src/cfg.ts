import { Helper, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * SharePoint Assets
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        {
            ListInformation: {
                Title: Strings.Lists.Schedule,
                BaseTemplate: SPTypes.ListTemplateType.Events
            },
            ContentTypes: [
                {
                    Name: "Event",
                    FieldRefs: [
                        "AssignedTo", "EventDate",
                        "EndDate", "Category", "Description"
                    ]
                }
            ],
            CustomFields: [
                {
                    name: "AssignedTo",
                    title: "Assigned To",
                    type: Helper.SPCfgFieldType.User,
                    required: true,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleOnly,
                    defaultValue: "[Me]"
                } as Helper.IFieldInfoUser
            ],
            ViewInformation: [
                {
                    ViewName: "All Events",
                    ViewFields: [
                        "AssignedTo", "EventDate", "EndDate", "Category", "Description"
                    ]
                }
            ]
        }
    ]
});

// Adds the solution to a classic page
Configuration["addToPage"] = (pageUrl: string) => {
    // Add a content editor webpart to the page
    Helper.addContentEditorWebPart(pageUrl, {
        contentLink: Strings.SolutionUrl,
        description: Strings.ProjectDescription,
        frameType: "None",
        title: Strings.ProjectName
    }).then(
        // Success
        () => {
            // Load
            console.log("[" + Strings.ProjectName + "] Successfully added the solution to the page.", pageUrl);
        },

        // Error
        ex => {
            // Load
            console.log("[" + Strings.ProjectName + "] Error adding the solution to the page.", ex);
        }
    );
}

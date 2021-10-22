import * as moment from "moment";

// Formats the date value
export const formatDateValue = (value: string, isEndDate: boolean = false) => {
    // Ensure a value exists
    if (value) {
        let dtValue = moment(value);

        // See if this is the end date
        if (isEndDate) {
            // Set the time
            dtValue.set({
                hour: 23,
                minute: 59,
                second: 59
            });
        }

        // Return the date value
        return dtValue.format(isEndDate ? null : "MM/DD/YYYY");
    }

    // Return nothing
    return "";
}
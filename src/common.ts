import * as moment from "moment";

// Formats the date value
export const formatDateValue = (value: string) => {
    // Ensure a value exists
    if (value) {
        let dtValue = moment(value);

        // Return the date value
        return dtValue.format("MM/DD/YYYY");
    }

    // Return nothing
    return "";
}
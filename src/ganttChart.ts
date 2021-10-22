import * as moment from "moment";
import Gantt from "frappe-gantt";
import { formatDateValue } from "./common";
import { DataSource } from "./ds";

/**
 * Gantt Chart
 */
export class GanttChart {
    private _el: HTMLElement = null;
    private _filter: string = null;
    private _items: Array<any> = null;
    private _options: any = null;
    private _view: DataView = null;

    // Gantt Chart
    private _chart = null;
    get Chart() { return this._chart; }

    // Constructor
    constructor(el: HTMLElement) {
        // Create the element
        this.createElement(el);

        // Load the rows and events
        this.loadEvents();

        // Render the timeline
        this.render();

        // Hide the timeline by default
        this.hide();
    }

    // Creates the element to render the gantt chart to
    private createElement(el: HTMLElement) {
        // Create the element
        this._el = document.createElement("div");
        this._el.id = "timeline";
        el.appendChild(this._el);

        // Add a change event
        this._el.addEventListener("resize", () => {
            // See if we are off the screen
            let elPos = this._el.getBoundingClientRect();
            if (elPos.width - elPos.left > window.innerWidth) {
                // Set the width
                this._el.style.width = (window.innerWidth - elPos.left - 50) + "px";
            }
        });
    }

    // Filters the timeline
    filter(value: string) {
        // Set the filter
        this._filter = value;

        // Refresh the timeline
        // TODO
        //this._view ? this._view.refresh() : null;
    }

    // Filters the timeline data
    private filterEvents(row) {
        // See if a filter is defined
        if (this._filter) {
            // See if the category matches
            if (row.item.Category != this._filter) { return false; }
        }

        // Don't filter out the item
        return true;
    }

    // Hides the timeline
    hide() {
        // Hides the element
        this._el.classList.add("d-none");
    }

    // Loads the events
    private loadEvents() {
        // Clear the items
        this._items = [];

        // See if items exist
        if (DataSource.Items) {
            // Parse the events
            for (let i = 0; i < DataSource.Items.length; i++) {
                let item = DataSource.Items[i];

                // Validate the dates
                let startDate = item.EventDate;
                let endDate = item.EndDate;
                if (endDate && startDate) {
                    // Create the item
                    this._items.push({
                        id: "Event_" + item.Id,
                        item,
                        progress: 0, // A value is required
                        name: item.Title,
                        start: new Date(startDate),
                        end: new Date(endDate)
                    });
                }
            }
        }
    }

    // Refreshes the timeline
    refresh() {
        // Load the rows and events
        this.loadEvents();

        // See if data exists
        if (this._view && this._chart) {
            // Update the timeline
            // TODO
            //this._view.setData(new DataSet(this._items));
        } else {
            // Render the timeline
            this.render();
        }
    }

    // Renders the timeline
    private render() {
        // Create the gantt chart
        this._chart = new Gantt(this._el, this._items);

        // Resize the element
        this._el.dispatchEvent(new Event("resize"));
    }

    // Shows the timeline
    show() {
        // Show the element
        this._el.classList.remove("d-none");
    }
}
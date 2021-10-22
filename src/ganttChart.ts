import Gantt from "frappe-gantt";
import { DataSource } from "./ds";

/**
 * Gantt Chart
 */
export class GanttChart {
    private _el: HTMLElement = null;
    private _filter: string = null;
    private _items: Array<any> = null;

    // Gantt Chart
    private _chart = null;
    get Chart() { return this._chart; }

    // Constructor
    constructor(el: HTMLElement) {
        // Create the element
        this.createElement(el);

        // Load the rows and events
        this.loadEvents();

        // Hide the gantt chart by default
        this.hide();
    }

    // Creates the element to render the gantt chart to
    private createElement(el: HTMLElement) {
        // Create the element
        this._el = document.createElement("div");
        this._el.id = "ganttChart";
        el.appendChild(this._el);

        // Add a change event
        this._el.addEventListener("resize", () => {
            // See if we are off the screen
            let elPos = this._el.getBoundingClientRect();

            // Set the width
            this._el.style.width = (window.innerWidth - elPos.left - 50) + "px";
        });
    }

    // Filters the gantt chart
    filter(value: string) {
        // Set the filter
        this._filter = value;

        // Refresh the gantt chart
        this.refresh();
    }

    // Hides the gantt chart
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
                    // See if the filter is set
                    if (this._filter) {
                        // Ensure the category matches
                        if (this._filter != item.Category) { continue; }
                    }

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

    // Refreshes the gantt chart
    refresh() {
        // Load the rows and events
        this.loadEvents();

        // See if data exists
        if (this._chart) {
            // Clear the chart
            this._chart.clear();

            // Load the events
            this.loadEvents();

            // Refresh the chart
            this._items.length > 0 ? this._chart.refresh(this._items) : null;
        } else {
            // Render the gantt chart
            this.render();
        }
    }

    // Renders the gantt chart
    private render() {
        // Ensure items exist
        if (this._items.length > 0) {
            // Create the gantt chart
            this._chart = new Gantt(this._el, this._items, {
                view_mode: "Week"
            });

            // Resize the element
            this._el.dispatchEvent(new Event("resize"));
        }
    }

    // Shows the gantt chart
    show() {
        // Show the element
        this._el.classList.remove("d-none");

        // Render the gantt chart if it doesn't exist
        if (this._chart == null) { this.render(); }
    }
}
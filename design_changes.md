# Time Logged

---

# Summary

- Added a Filters button that opens a drawer with three selectors: Projects, To-dos, and Activity Level
- Redesigned the table structure to support expandable member rows, exposing individual time entries
- Added a checkbox column for selecting individual time entries
- Added batch actions (Reassign Time and Delete Time) available when one or more time entries are selected

---

# Filters Button

A new Filters button is added to the page header. Clicking it opens a drawer with three filter selectors.

- The drawer contains three selectors: Projects, To-dos, and Activity Level
- Filters affect which time entries are displayed in expanded rows and the totals shown on the member row
- Example: filtering by Project A shows only time entries for that project and recalculates totals accordingly

## Projects

- User can search for a project by name
- Only one project can be selected at a time

## To-dos

- User can search for a to-do by name
- Only one to-do can be selected at a time

## Activity Level

- Behaves the same as the Activity Level filter in Timesheets

---

# Expandable Rows

The table structure changes to support two levels: a summary row per member per day, and the individual time entries beneath it.

- Each member/day row now has a chevron on the member column
- The entire row is clickable to expand or collapse

## Expanded Row Layout

Each expanded time entry row has a distinct column layout and visual style:

- Background is gray 50, visually separating entries from the parent row
- **Member column** — shows the project and to-do for that entry, aligned with the member column above
- **Time column** (renamed from "Total Time") — shows two pieces of information in the same cell:
  - The total duration of the time entry (e.g., 3:00:00)
  - The time range directly below it (e.g., 7:00 am – 10:00 am)
- **Activity, idle time, manual time, holiday, PTO, Actions** – Shown in expanded rows
- **Timesheet**, **Status** — Not shown in expanded rows

## On-Demand Loading

The page loads with member/day summary rows and their totals only. Individual time entries are fetched on request when the user expands a row.

- Totals are loaded with the page as part of the initial data
- Once loaded, entries are kept in memory for the session — collapsing and re-expanding does not trigger a new request
- If the page is reloaded, cached entries are discarded and fetched again on expand

### Loading State

While entries are being fetched, skeleton rows are shown inside the expanded area to indicate that content is loading. The exact skeleton design needs to be aligned with engineering based on what is feasible.


---

# Checkboxes

- A new checkbox column is added to the table
- Both the parent member/day row and individual time entry rows have checkboxes

### Checkboxes and Selection

- The parent member/day row has a checkbox
  - Selecting it automatically selects all time entries beneath it
  - If the row is collapsed, clicking the checkbox still selects all underlying entries
- Individual time entry rows each have their own checkbox
  - Selecting one entry selects only that specific entry
- The user can mix selections across different parent rows
- Selecting at least one entry activates the batch action toolbar


---

# Batch Actions

When one or more time entries are selected, a batch action toolbar appears. Two actions are available: Reassign Time and Delete Time.

## Reassign Time

- The user must select a project — this field is required
- The user may optionally select a to-do
- The user must select a reason from a predefined list
  - If the first reason is selected, no further input is needed
  - If the other reason is selected, an additional required text field appears for the user to write their reason

### Validation

Validation errors are displayed as a yellow banner. Two possible errors:

- Exceeded the project budget
- Exceeded the member project limit

## Delete Time

- The user must select a reason from a predefined list
- Reason selection works the same way as in Reassign Time: one option requires no further input, the other reveals a required text field

---

# Small Improvements

## Clickable Row and Calendar Icon

- A small calendar icon is displayed next to the date label on the daily table.
- The entire area — from the date label up to the chevron — is clickable to expand or collapse, not just the chevron.

## Row Dividers

- Dividers between days are conditional based on expand state
- When a row is collapsed, a divider is shown below it, clearly separating it from the next day
- When a row is expanded, the divider is hidden

---

# Toasts

Four feedback scenarios trigger notifications when using batch actions.

## Success

A success toast appears after a successful reassign or delete.

- **Reassign:** Title "Time entries reassigned" — Body: "Selected time entries were reassigned to **[Project name].**"
- **Delete:** Title "Time entries deleted" — Body: "Selected time entries were successfully deleted."
- Auto-dismisses; has a close button

## Too Many Selected

When more than 100 entries are selected, a tooltip appears above the Reassign time button instead of opening the modal. This limit only applies to Reassign — Delete has no selection limit.

- Text: "Too many entries selected. Select 100 or fewer to reassign."
- The Reassign time button is disabled in this state

## Failed

If the operation fails, an error toast appears. Applies to both Reassign and Delete.

- **Reassign:** Title "Reassignment failed" — Body: "We couldn't process this change. Try again later."
- **Delete:** Title "Deletion failed" — Body: "We couldn't process this change. Try again later."
- Styled in red; has a close button

## Background Job

When an operation takes longer than expected, it runs as a background job with two stages:

- If processing takes more than 1 second: a dark spinner toast appears — "Reassigning time entries..."
- If processing takes more than 10 seconds: the toast updates to — "This is taking a bit longer. We'll email you when it's done."

---

# Single Member View

The single member view behaves similarly to the Time Logged page. There are no structural changes to the table — the only additions are a checkbox column and batch actions.

## What's the Same

- Checkbox column works identically: select individual time entries or all at once
- Batch actions (Reassign Time and Delete Time) are available when one or more entries are selected
- The batch action toolbar appearance and behavior is the same
- Toasts (success, failed, too many selected, background job) follow the same rules
- The Reassign and Delete modals work exactly the same way

## What's Different — Entry Summary in the Modal

Because this is a single member view, the modal shows a summary of the selected time entries.

- Up to 5 entries are shown by default
- If more than 5 entries are selected, a "Show more" button appears
- Clicking "Show more" expands the list to display all selected entries
- A "Show less" button collapses it back to the default 5

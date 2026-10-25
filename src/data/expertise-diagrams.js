// These are explanations of responsibilities, not claims about scale or seniority.
export const EXPERTISE_DIAGRAMS = {
  "application-flow": {
    title: "From interface to response",
    layout: "flow",
    nodes: [
      { id: "browser", label: "Browser", explanation: "The browser displays the interface and collects user input. In HAVEN, React keeps the search form and results in sync with application state." },
      { id: "api", label: "API", explanation: "An API gives the interface a defined way to ask the server for data. HAVEN sends search criteria to a FastAPI endpoint, where query parameters are validated." },
      { id: "logic", label: "Logic", explanation: "Application logic decides what a request means. HAVEN filters listings, calculates relevance, orders matches, and selects a page of results on the server." },
      { id: "data", label: "Data", explanation: "The application needs a source of information. HAVEN reads a supplied JSON file; other applications may use a database. A full-stack application does not always need a database." },
      { id: "response", label: "Response", explanation: "The server sends a structured result back to the browser. HAVEN includes listing items and pagination totals so React can display the correct page or an empty state." },
    ],
  },
  "component-tree": {
    title: "Components working together",
    layout: "tree",
    nodes: [
      { id: "app", label: "App state", explanation: "Shared application state coordinates components that need the same information. HAVEN keeps search criteria and request results connected without duplicating server-side ranking logic." },
      { id: "header", label: "Header", explanation: "A header component groups shared navigation and branding. Keeping it separate helps maintain a consistent interface without mixing navigation with search logic." },
      { id: "filters", label: "Filters", explanation: "Filter components collect draft input before a search is applied. Separating draft values from submitted criteria helps prevent unexpected requests while someone is still editing." },
      { id: "results", label: "Results", explanation: "Results components turn the API response into cards, pagination, and loading or error feedback. They display the server's ordered results rather than calculating a second ranking in the browser." },
    ],
  },
  "interaction-flow": {
    title: "Interaction design in practice",
    layout: "flow",
    nodes: [
      { id: "input", label: "User Input", explanation: "An interaction starts with an action such as typing, tapping, or pressing a key. Controls need clear labels and usable targets across input methods." },
      { id: "transition", label: "Transition", explanation: "A transition connects one interface state to the next. When HAVEN submits a search, loading feedback helps explain why results are not yet available. A static loading message carries the same meaning when reduced motion is preferred." },
      { id: "feedback", label: "Feedback", explanation: "The interface explains the outcome through selected controls, loading feedback, results, or an error message. Motion can clarify a change, while reduced-motion users receive the same information without that movement." },
      { id: "state", label: "UI State", explanation: "State records what changed. For example, editing HAVEN's filters updates draft values; applying the search updates the submitted criteria and starts a request." },
    ],
  },
  "request-flow": {
    title: "A clear server-side workflow",
    layout: "flow",
    nodes: [
      { id: "validate", label: "Validate", explanation: "Validation checks that incoming values follow the API contract. HAVEN uses Pydantic models to reject invalid prices, budgets, and page parameters before running a search." },
      { id: "load", label: "Load data", explanation: "Data access retrieves records from their source. HAVEN validates records loaded from local JSON; database-backed applications retrieve records through their database access layer." },
      { id: "process", label: "Process", explanation: "Focused application functions perform the work. HAVEN separates filtering, budget and recency scoring, deterministic ordering, and pagination so each responsibility can be tested." },
      { id: "respond", label: "Respond", explanation: "The API returns structured data or a clear error status. HAVEN returns result items and page metadata, and handles unavailable listing data without exposing internal file details." },
    ],
  },
  "quality-flow": {
    title: "Quality as an engineering practice",
    layout: "flow",
    nodes: [
      { id: "measure", label: "Performance", explanation: "Performance work begins with observation: inspect loading, rendering, and asset sizes before choosing a change. Measurements help decide which change is worth testing." },
      { id: "access", label: "Accessibility", explanation: "Check whether people can understand and operate the interface using different inputs and motion preferences. Keyboard and automated accessibility checks help, but do not replace human screen-reader testing." },
      { id: "test", label: "Testing", explanation: "Tests check expected behavior and important edge cases. HAVEN includes backend tests for search rules and frontend tests for requests, filters, and interface states." },
      { id: "review", label: "Maintainability", explanation: "Review whether the change remains readable, maintainable, and consistent with the rest of the application. Recheck relevant user journeys after a fix to catch regressions." },
    ],
  },
};

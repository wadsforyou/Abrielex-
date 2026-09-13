import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

// ---------------------------------------------------------------------------
// ADMIN ERROR BOUNDARY
//
// A single failing page must never leave the whole dashboard blank. When a
// render throws, this shows the real error and a working retry instead of an
// empty screen, so the administrator always knows what happened.
// ---------------------------------------------------------------------------
export default class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Surface the real error in the console for diagnosis.
    console.error("Admin section failed to render:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    const message = this.state.error?.message || String(this.state.error);

    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-dashed border-border bg-card px-6 py-16 text-center">
        <AlertTriangle className="h-9 w-9 text-amber-500" />
        <h2 className="mt-3 font-serif-display text-lg font-semibold">This section could not be displayed</h2>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          The rest of the dashboard still works. You can retry this section, or reload the page.
        </p>
        <pre className="mt-4 max-w-xl overflow-x-auto rounded-md border-border bg-muted/40 px-4 py-3 text-left text-xs text-rose-700">
          {message}
        </pre>
        <div className="mt-5 flex gap-2">
          <button
            onClick={() => this.setState({ error: null })}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

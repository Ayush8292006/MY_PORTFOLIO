import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ padding: "40px var(--gutter)", textAlign: "center", color: "var(--mist)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--lamp)" }}>
              Section failed to mount gracefully.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}


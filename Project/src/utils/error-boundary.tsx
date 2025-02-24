import { Component, ErrorInfo, ReactNode } from "react";
import SiteError from "@/pages/SiteError";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message ?? "Something went wrong";
      return <SiteError errorMessage={errorMessage} />;
    }
    return this.props.children;
  }
}

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Retain runtime crash diagnostic for inspection without throwing
    if (typeof console !== "undefined") {
      console.error("ErrorBoundary captured rendering failure:", error, errorInfo);
    }
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
          <div className="max-w-md space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              An unexpected error occurred while rendering the page. Please try reloading.
            </p>
            <div className="pt-2">
              <Button onClick={this.handleReload}>Reload</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

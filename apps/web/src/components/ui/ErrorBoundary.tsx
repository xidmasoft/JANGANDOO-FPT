import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Une erreur inattendue est survenue</h1>
          <p className="text-muted mb-8 max-w-md">
            Nous sommes désolés, mais une erreur technique empêche l'affichage de cette page. Veuillez réessayer plus tard.
          </p>
          <button
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Retour à l'accueil
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly onError?: () => void;
}

interface BoundaryState {
  readonly error?: Error;
  readonly errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, BoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { error, errorInfo } = this.state;

    if (!error) return this.props.children;

    return (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          fontFamily: 'sans-serif',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>😢 Что-то пошло не так</h1>
        <p style={{ marginBottom: '0', maxWidth: '600px' }}>Игра неожиданно завершилась из-за внутренней ошибки.</p>
        <p style={{ marginTop: '0', marginBottom: '1rem', maxWidth: '600px' }}>Мы уже работаем над её устранением.</p>

        {
          <pre
            style={{
              backgroundColor: '#333',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'left',
              maxWidth: '90%',
              overflowX: 'auto',
              fontSize: '0.8rem',
              marginBottom: '1rem',
            }}
          >
            {error.toString()}
            {'\n'}
            {errorInfo?.componentStack}
          </pre>
        }

        <button
          onClick={this.handleReload}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Перезапустить игру
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;

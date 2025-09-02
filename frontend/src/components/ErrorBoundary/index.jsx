import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#666'
                }}>
                    <h2>Что-то пошло не так</h2>
                    <p>Попробуйте обновить страницу</p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Обновить страницу
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary

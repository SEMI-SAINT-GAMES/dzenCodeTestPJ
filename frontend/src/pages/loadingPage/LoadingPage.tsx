import './LoadingPageStyles.scss'
export const LoadingPage: React.FC<{  }> = props => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
};
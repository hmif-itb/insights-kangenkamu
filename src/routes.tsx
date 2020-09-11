import React from 'react';
import WelcomePage from './pages/@Welcome/WelcomePage';
import LoginPage from './pages/@Login/LoginPage';
import ComposePage from './pages/@Compose/ComposePage';
import SentPage from './pages/@Sent/SentPage';

export const routes: {[path: string]: React.ReactElement} = {
    '/': <WelcomePage />,
    '/login': <LoginPage />,
    '/compose': <ComposePage />,
    '/sent': <SentPage />
}
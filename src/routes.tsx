import React from 'react';
import WelcomePage from './pages/@Welcome/WelcomePage';
import LoginPage from './pages/@Login/LoginPage';
import ComposePage from './pages/@Compose/ComposePage';
export const routes: {[path: string]: React.ReactElement} = {
    '/': <WelcomePage />,
    '/login': <LoginPage />,
    '/compose': <ComposePage />
}
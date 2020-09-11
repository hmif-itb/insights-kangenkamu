import React from 'react';
import GoogleLogin from "react-google-login";

const WelcomePage: React.FC = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
    const googleHostedDomain = process.env.REACT_APP_GSUITE_DOMAIN;

    const location = window.location;
    const baseUrl = location.protocol + "//" + location.host;
    const redirectUrl = baseUrl + '/login'

    return (
        <div>
            <GoogleLogin
                clientId={googleClientId}
                hostedDomain={googleHostedDomain}
                buttonText="Login to std.stei.itb.ac.id"
                uxMode="redirect"
                redirectUri={redirectUrl}
            />
        </div>
    );
}

export default WelcomePage;
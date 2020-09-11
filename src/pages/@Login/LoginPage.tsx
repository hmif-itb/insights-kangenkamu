import React, { useEffect } from "react";
import qs from "querystring";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const setCookie = useCookies(['kangenkamu'])[1];

  const fetchToken = (idToken: string) => {
    axios.post("/.netlify/functions/login", { idToken }).then((res) => {
      const { token, nim } = res.data;
      history.replace("/compose");

      setCookie('jwt', token, { path: '/', expires: new Date(Date.now() + (3600 * 1000)) });
      setCookie('nim', nim, { path: '/', expires: new Date(Date.now() + (3600 * 1000)) });
    });
  };

  const params = qs.decode(location.hash);

  useEffect(() => {
    fetchToken(params.id_token as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
};

export default LoginPage;

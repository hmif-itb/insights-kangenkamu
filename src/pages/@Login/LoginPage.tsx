import React, { useEffect } from "react";
import qs from "querystring";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const fetchToken = (idToken: string) => {
    axios.post("/.netlify/functions/login", { idToken }).then((res) => {
      const { token } = res.data;
      history.replace("/compose/" + encodeURIComponent(token));
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

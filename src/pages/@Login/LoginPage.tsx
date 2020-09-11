import React, { useEffect } from "react";
import qs from "querystring";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { UIStore } from "../../stores/UIStore";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const fetchToken = (idToken: string) => {
    axios.post("/.netlify/functions/login", { idToken }).then((res) => {
      const { token, nim } = res.data;
      history.replace("/compose");

      UIStore.update(s => {
        s.jwt = token;
        s.nim = nim;
      })
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

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { UIStore } from '../stores/UIStore';

const StatePersistenceProvider: React.FC = (props) => {
    const [cookies, setCookie] = useCookies(['kangenkamu']);
    const state = UIStore.useState();

    useEffect(() => {
        UIStore.update(s => {
            s.nim = cookies.state?.nim;
            s.jwt = cookies.state?.jwt;
        });
    }, [cookies]);

    useEffect(() => {
        setCookie('state', state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return <>{props.children}</>;
}

export default StatePersistenceProvider;
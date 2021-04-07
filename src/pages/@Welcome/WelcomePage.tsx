import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
// import GoogleLogin from "react-google-login";

const WelcomePage: React.FC = () => {
    // const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
    // const googleHostedDomain = process.env.REACT_APP_GSUITE_DOMAIN;

    // const location = window.location;
    // const baseUrl = location.protocol + "//" + location.host;
    // const redirectUrl = baseUrl + '/login'

    return (
        <div>
            <Container maxWidth="sm">
                <Box p={2} display="flex" flexDirection="column" justifyContent="stretch">
                    <h1>Udah tutup gaes :(</h1>
                    {/* <h1><span className="text-yellow">#KangenKamu</span> edisi website</h1>
                    <p>
                        HALO WARGA HMIF!!
                    </p>
                    <p>
                        Jadi dari DE HMIF lagi nyiapin sesuatu yang spesial di akhir tahun nanti.
                        Nah biar seru, kita bakal adain #KangenKamu dengan format yang agak beda nih.
                    </p>
                    <p>
                        Di #KangenKamu kali ini, kamu bisa menuliskan pesan apapun kepada warga HMIF angkatan 2016 s.d. 2019, anonim maupun tidak.
                        Kalo kamu mau anonim, admin pun gak bakal bisa tau pesannya dikirim dari siapa.
                        Jadi kalo ada kesan, pesan, pengakuan dosa, apapun, bisa banget ditulis di sini.
                    </p>
                    <p>
                        Pesan kamu akan kami liatin ke penerima pesan <b>di akhir kepengurusan lutek nanti<sup>*</sup></b>. Caranya gimana? Itu kejutan, liat aja nanti.
                    </p>
                    <p>
                        Silakan login pake akun email std.stei.itb.ac.id untuk mengirim pesanmu.
                    </p>
                    <p>
                        <small>* Dalam hal lutek dua periode, kepengurusan yang dimaksud adalah yang pertama.</small>
                    </p>
                    <Box mt={1}></Box>
                    <GoogleLogin
                        clientId={googleClientId}
                        hostedDomain={googleHostedDomain}
                        buttonText="Login to std.stei.itb.ac.id"
                        uxMode="redirect"
                        redirectUri={redirectUrl}
                    /> */}
                </Box>
            </Container>
        </div>
    );
}

export default WelcomePage;
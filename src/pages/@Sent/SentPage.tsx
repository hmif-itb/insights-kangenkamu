import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const SentPage: React.FC = () => {
    return (
        <div>
            <Container maxWidth="sm">
                <Box p={2} display="flex" flexDirection="column" justifyContent="center" style={{height: '100vh', boxSizing: 'border-box'}}>
                    <h1><span className="text-yellow">Pesan terkirim!</span></h1>
                    <p>
                        Pesan kamu udah kami simpan dan akan diberikan kepada penerima di akhir tahun.
                        Nantikan kejutan kami ya!
                    </p>
                    <Box flex={1}></Box>
                    <Button color="primary" variant="contained" size="large" component={RouterLink} to="/compose">
                        Kirim pesan lagi
                    </Button>
                    <Box mt={4}></Box>
                </Box>
            </Container>
        </div>
    );
}

export default SentPage;
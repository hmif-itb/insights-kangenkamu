import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Select from "react-select";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./style.css";
import StudentsData from "./mhs.json";
import { Option } from "react-select/src/filters";
import Cookies from 'universal-cookie';

const options = StudentsData;
const cookies = new Cookies();

const selectStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: 0,
        border: 'none',
        background: 'none',
        boxShadow: state.isFocused ? 0 : 0,
    }),
    input: (provided: any, state: any) => ({
        ...provided,
        color: 'white'
    }),
    singleValue: (provided: any, state: any) => ({
        ...provided,
        color: 'white'
    }),
    multiValueRemove: (provided: any, state: any) => ({
        ...provided,
        color: 'black'
    }),
    indicatorSeparator: (provided: any, state: any) => ({
        ...provided,
        display: 'none'
    }),
    dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        display: 'none'
    }),
    clearIndicator: (provided: any, state: any) => ({
        ...provided,
        display: 'none'
    }),
    menu: (provided: any, state: any) => ({
        ...provided,
        background: '#333333',
        color: 'white'
    }),
    option: (provided: any, { isFocused, isSelected }: any) => ({
        ...provided,
        background: isFocused ? (isSelected ? provided.background : '#434343') : provided.background,
        ':active': {
            ...provided[':active'],
            background: isSelected ? provided.background : '#434343'
        }
    })
};

const jurusanPrefix: { [prefix: string]: string } = {
    '135': 'HMIF',
    '182': 'HMIF',
    '132': 'HME',
    '180': 'HME',
    '181': 'IMT',
    '183': 'HME'
}

const ComposePage: React.FC = () => {
    const history = useHistory();

    const nim = cookies.get("nim") || '';
    const sender = StudentsData.find(s => s.value === nim);
    const name = sender ? sender.name : '';
    const nimSelector = "nim:" + nim;

    const [menuOpen, setMenuOpen] = useState(false);
    const [fromSelectorOpen, setFromSelectorOpen] = useState(false);
    const [from, setFrom] = useState<string>(nimSelector);
    const [to, setTo] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const [sending, setSending] = useState(false);

    const angkatanSelector = (() => {
        const prefix = nim.substring(0, 5);
        const jurusan = nim.substring(0, 3);
        const angkatan = nim.substring(3, 5);

        if (prefix === '13516' || prefix === '18216') {
            return "Warga BIT 2016"
        } else if (prefix === '13517' || prefix === '18217') {
            return "Warga UNIX 2017"
        } else if (prefix === '13518' || prefix === '18218') {
            return "Warga Decrypt 2018"
        } else if (prefix === '13519' || prefix === '18219') {
            return "Warga Async 2019"
        } else {
            return `Warga ${jurusanPrefix[jurusan]} '${angkatan}`;
        }
    })();

    const himpunanSelector = (() => {
        const jurusan = nim.substring(0, 3);
        return `Warga ${jurusanPrefix[jurusan]}`;
    })();

    const handleInputChange = (query: string) => {
        setMenuOpen(query.length >= 3);
    };

    const filterOption = (option: Option, inputValue: string) => {
        const matchName = option.data.name.toLowerCase().includes(inputValue.toLowerCase());
        const matchNickname = option.data.nickname ? option.data.nickname.toLowerCase().includes(inputValue.toLowerCase()) : false;

        return matchName || matchNickname;
    }

    const submitResponse = () => {
        setSending(true);

        const headers = {
            token: cookies.get('jwt')
        };

        const body = {
            message,
            from,
            to: to.join(',')
        }

        axios
            .post('/.netlify/functions/submit', body, { headers })
            .then(() => {
                history.replace('/sent');
            })
            .finally(() => {
                setSending(false);
            })
    }

    return (
        <div className="ComposePage">
            <Box display="flex" alignItems="center" p={2}>
                <Box flexGrow={1}>
                    <b className="text-yellow">#KangenKamu</b>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" disableElevation disabled={sending} onClick={() => submitResponse()}>
                        Kirim
                    </Button>
                </Box>
            </Box>
            <div className="content">
                <Box px={2} my={1} display='flex' flexDirection='row'>
                    <Box color="text.secondary" mt={1}>
                        To
                            </Box>
                    <Box flex={1}>
                        <Select
                            isMulti
                            name="colors"
                            options={options}
                            styles={selectStyles}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            menuIsOpen={menuOpen}
                            onInputChange={handleInputChange}
                            filterOption={filterOption}
                            placeholder=""
                            disabled={sending}
                            onChange={(value: any) => {
                                setTo(value.map((v: any) => v.value));
                            }}
                        />
                    </Box>
                </Box>
                <Divider />
                <Box px={2} my={2} display='flex' flexDirection='row' alignItems="center">
                    <Box color="text.secondary">
                        From
                            </Box>
                    <Box flex={1} px={1} onClick={() => setFromSelectorOpen(true)}>
                        {from === nimSelector && (<>{name}</>)}
                        {from !== nimSelector && (<>{from}</>)}
                    </Box>
                    <Box onClick={() => setFromSelectorOpen(true)}>
                        <KeyboardArrowDownIcon />
                    </Box>
                    <Drawer anchor="bottom" open={fromSelectorOpen} onClose={() => setFromSelectorOpen(false)}>
                        <Box p={2}>
                            <b>Kirim sebagai</b>
                            <Box mt={1} color="text.secondary">
                                <small>Apabila kamu memilih untuk menjadi anonim, tidak ada yang bisa mengetahui siapa pengirim pesan, termasuk admin.</small>
                            </Box>
                        </Box>
                        <Box mb={3}>
                            <List>
                                <ListItem
                                    button
                                    selected={from === nimSelector}
                                    onClick={() => {
                                        setFrom(nimSelector);
                                        setFromSelectorOpen(false);
                                    }}
                                >
                                    <ListItemText primary={name} />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={from === angkatanSelector}
                                    onClick={() => {
                                        setFrom(angkatanSelector);
                                        setFromSelectorOpen(false);
                                    }}>
                                    <ListItemText primary={angkatanSelector} />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={from === himpunanSelector}
                                    onClick={() => {
                                        setFrom(himpunanSelector);
                                        setFromSelectorOpen(false);
                                    }}>
                                    <ListItemText primary={himpunanSelector} />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </Box>
                <Divider />
                <Box p={2} flex={1} display='flex'>
                    <InputBase
                        placeholder="Kesan, pesan, pengakuan dosa, apapun. Tulis maksimal 200 karakter."
                        fullWidth
                        style={{ flex: 1, height: '100%' }}
                        multiline
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={sending}
                        inputProps={{
                            maxLength: 200,
                            style: {
                                height: '100%',
                                overflow: 'auto'
                            }
                        }}
                    />
                </Box>
            </div>
        </div>
    );
};

export default ComposePage;

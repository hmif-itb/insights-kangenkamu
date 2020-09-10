import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Select from 'react-select'

import "./style.css";
import StudentsData from "./mhs.json";
import { Option } from "react-select/src/filters";

const options = StudentsData;

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

const ComposePage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleInputChange = (query: string) => {
        setMenuOpen(query.length >= 3);
    };

    const filterOption = (option: Option, inputValue: string) => {
        const matchName = option.data.name.toLowerCase().includes(inputValue.toLowerCase());
        const matchNickname =  option.data.nickname ? option.data.nickname.toLowerCase().includes(inputValue.toLowerCase()) : false;

        return matchName || matchNickname;
    }

    return (
        <div className="root">
            <div className="main">
                <div className="ComposePage">
                    <Box display="flex" alignItems="center" p={2}>
                        <Box flexGrow={1}>
                            <b className="text-yellow">#KangenKamu</b>
                        </Box>
                        <Box>
                            <Button variant="contained" color="primary" disableElevation>
                                Kirim
                            </Button>
                        </Box>
                    </Box>
                    <div className="content">
                        <div style={{ width: '1000px' }}>
                        </div>
                        <Box px={1} my={1}>
                            <Select
                                isMulti
                                name="colors"
                                options={options}
                                styles={selectStyles}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Tujuan"
                                menuIsOpen={menuOpen}
                                onInputChange={handleInputChange}
                                filterOption={filterOption}
                            />
                        </Box>
                        <div className="divider" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposePage;

import { MultiSelect  } from "@mantine/core";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../api/firebase";

interface MultiSelectBaseProps {
    data: {value: string, label: string}[],
    label: string,
    nothingFound: string,
    onValueChanged: (val: string[])=>void
}

function MultiSelectBase(props : MultiSelectBaseProps) {
    const [searchValue, onSearchChange] = useState('')
    const [disabled, setDisabled] = useState(true);

    onAuthStateChanged(auth, (user) => {
        if(user && user.emailVerified) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    })

    return (
        <MultiSelect data={props.data}
        label={props.label}
        placeholder="None Selected"
        searchable
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        nothingFound={props.nothingFound}
        clearable
        maxSelectedValues={5}
        transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
        onChange={props.onValueChanged}
        disabled={disabled}
        />
    );
}

export default MultiSelectBase;
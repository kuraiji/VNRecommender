import { MultiSelect  } from "@mantine/core";
import { useState } from "react";

interface MultiSelectBaseProps {
    data: {value: string, label: string}[],
    label: string,
    nothingFound: string
}

function MultiSelectBase(props : MultiSelectBaseProps) {
    const [searchValue, onSearchChange] = useState('')

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
        
        />
    );
}

export default MultiSelectBase;
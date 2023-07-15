import { Button } from "@mantine/core"

interface SearchProps {
    uid: number,
    ReturnCallback: ()=>void
}

export default function Search(props: SearchProps) {
    return(
        <>
            <p>Uh oh, big stinky User: {props.uid}</p>
            <Button onClick={props.ReturnCallback}>Return</Button>
        </>
    )
}
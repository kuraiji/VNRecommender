interface SearchProps {
    uid: number
}

export default function Search(props: SearchProps) {
    return(
        <>
            <p>Uh oh, big stinky User: {props.uid}</p>
        </>
    )
}
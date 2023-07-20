import { Button } from "@mantine/core"
import { GetRecommendations, GetRecommendationsProps } from "../api/main"
import { useEffect, useState } from "react"
import ImageCard from "../components/ImageCard";

interface SearchProps {
    req: GetRecommendationsProps,
    ReturnCallback: ()=>void
}

export default function Search(props: SearchProps) {
    const [results, setResults] = useState<Array<{vnid: number, rating: number}>>();

    const printList = results?.map(result => <li>{result.vnid} {result.rating}</li>)

    

    useEffect(()=>{
        GetRecommendations(props.req).then((results)=>{
            setResults(results);
        })
    },[props.req, setResults]);

    return(
        <>
            <ImageCard
                image= ''
                title= 'Title'
                description= 'This is a description'
                stats= {[{title= 'test', value='test'}]}
            />
            <p>Uh oh, big stinky User: {props.req.userid}</p>
            <Button onClick={props.ReturnCallback}>Return</Button>
            <ul>{printList}</ul>
        </>
    )
}
import { Button, Flex } from "@mantine/core"
import { GetRecommendations, GetRecommendationsProps } from "../api/main"
import { useEffect, useState } from "react"
import ImageCard from "../components/ImageCard";

// TODO: Fixed height for cards
//       Fixed card height
//       Make sure page is responsive on mobile and desktop
//       Make page pretty :) 

interface SearchProps {
    req: GetRecommendationsProps,
    ReturnCallback: ()=>void
}

function MinutesToHours(minutes: number){
    if(minutes < 0.0001){
        return "Unknown"
    }

    return (minutes/60).toFixed(1).toString() + " hours"
}

function BuildBody(ids: Array<{vnid: number, rating: number}> | undefined){
    if(ids != undefined){
        let body = '{"filters":["or"'
        for(let i = 0; i < ids.length; i++){
            body += ',["id","=","v' + ids[i].vnid + '"]'
        }
        body += '],"fields":"title, image.url, description, languages, platforms, length_minutes"}'
        
        return body
    }
    
    return ''
}

export default function Search(props: SearchProps) {
    const [results, setResults] = useState<Array<{vnid: number, rating: number}>>();

    const[vnData, setVnData] = useState<Array<{title: string, description: string, image: string, languages: Array<string>, 
                                               platforms: Array<string>, length_minutes: number, id: string}>>();
                            
    const[callBody, setCallBody] = useState('')

    const cardList = vnData?.map(result => <ImageCard
                                            title={result.title}
                                            description={result.description}
                                            image={result.image.url}
                                            languages={result.languages}
                                            platforms={result.platforms}
                                            length={MinutesToHours(result.length_minutes)}
                                            id={result.id}/>)

    const test = '{"filters":["or",["id","=","v2002"],["id","=","v2003"],["id","=","v4"],["id","=","v23"],["id","=","v454"],["id","=","v666"],["id","=","v420"],["id","=","v69"]],"fields":"title, image.url, description, languages, platforms, length_minutes"}'                                        

    useEffect(()=>{
        GetRecommendations(props.req).then((results)=>{
            setResults(results);
        })
    },[props.req, setResults]);

    useEffect(()=>{
        setCallBody(BuildBody(results))
    },[results])

    useEffect(()=>{
        fetch('https://api.vndb.org/kana/vn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: callBody
        })
        .then(response => response.json())
        .then(response => setVnData(response.results))
    }, [callBody])

    return(
        <>
            <Flex justify={"center"} direction={"column"} align={"center"}>
                <p>Uh oh, big stinky User: {props.req.userid}</p>
                <Flex justify={"center"} direction={"row"} align={"center"} wrap="wrap" gap={'xs'}>
                    {cardList}
                </Flex>
            </Flex>

            <Button onClick={props.ReturnCallback}>Return</Button>
        </>
    )
}
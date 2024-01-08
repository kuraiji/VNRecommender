import { Box, Button, Flex, Loader, LoadingOverlay } from "@mantine/core"
import { GetRecommendations, GetRecommendationsProps } from "../api/main"
import { useEffect, useState } from "react"
import ImageCard from "../components/ImageCard";

// TODO: Make sure page is responsive on mobile and desktop
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

    const[vnData, setVnData] = useState<Array<{title: string, description: string, image: string, languages: Array<string>, 
                                               platforms: Array<string>, length_minutes: number, id: string}>>();
                                               
    const[showLoading, setShowLoading] = useState(true);                      

    useEffect(()=>{
        GetRecommendations(props.req).then((results: Array<{vnid: number, rating: number}> | undefined)=>{
            fetch('https://api.vndb.org/kana/vn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: BuildBody(results)
            })
            .then(response => response.json())
            .then(response => {
                setVnData(response.results)
                setShowLoading(false)
            })
        })
    },[props.req]);

    return(
        <>
            <Flex justify={"center"} align={"center"}>
                <h2>Recommendations for User #{props.req.userid}:</h2>
            </Flex>
            
            {showLoading 
            ? 
            <Flex justify={"center"} align={"center"} mb={"xl"}>
                <Loader color="cyan" size="xl" variant="bars"/>
            </Flex>
            :
            <Flex justify={"center"} direction={"column"} align={"center"} mb={'lg'}>
                    <Flex justify={"center"} direction={"row"} 
                    align={"center"} wrap="wrap" gap={'xs'} mb={'lg'}
                    >
                        {vnData?.map((element) => 
                            <li key={element.id} style={{listStyleType: "none"}}>
                                <ImageCard
                                title={element.title}
                                description={element.description}
                                image={element.image.url}
                                languages={element.languages}
                                platforms={element.platforms}
                                length={MinutesToHours(element.length_minutes)}
                                id={element.id}/>
                            </li>
                        )}
                    </Flex>
                </Flex>
             }
            
            <Flex justify={"center"} align={"center"} mb={"md"}>
                <Button onClick={props.ReturnCallback}>Return</Button>
            </Flex>
        </>
    )
}

/*
<LoadingOverlay visible={showLoading} 
                zIndex={1000} overlayBlur={0} radius={"xl"} 
                loaderProps={{color: "cyan", variant: "bars"}}
                />
*/
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/recommend?";

export interface GetRecommendationsProps {
    userid: number,
    language_filters: string[],
    platform_filters: string[]
}

export async function GetRecommendations(props: GetRecommendationsProps) : Promise<{vnid: number, rating: number}[]> {
    const params = {
        userid: props.userid.toString(), 
        language_filters: props.language_filters.toString(), 
        platform_filters: props.platform_filters.toString()
    }
    const response = await fetch(API_URL + new URLSearchParams(params));
    const data: [(number)[]] = await response.json();
    const converted: {vnid: number, rating: number}[] = [];
    data.forEach((element) => {
        converted.push({vnid: element[0], rating: element[1]});
    });
    return converted;
}

export function IsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return isMobile <= 768;
}
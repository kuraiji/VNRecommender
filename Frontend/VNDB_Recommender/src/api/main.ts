const API_URL = "http://localhost:8080/recommend?";

interface GetRecommendationsProps {
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
    const data = await response.json();
    console.log(data)
    return data;
}
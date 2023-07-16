const API_URL = "http://localhost:8080/recommend?";

export interface GetRecommendationsProps {
    userid: number,
    language_filters: string[],
    platform_filters: string[]
}

export async function GetRecommendations(props: GetRecommendationsProps) : Promise<{vnid: number, rating: number}[]> {
    return [
        {vnid: 1377, rating: 10}, 
        {vnid: 7771, rating: 9.9}, 
        {vnid: 2002, rating: 9.8},
        {vnid: 92, rating: 9.7}, 
        {vnid: 18717, rating: 9.6}, 
        {vnid: 2016, rating: 9.5},
        {vnid: 17909, rating: 9.4}, 
        {vnid: 19987, rating: 9.3}, 
        {vnid: 17, rating: 9.2},
        {vnid: 1299, rating: 9}
    ]
    const params = {
        userid: props.userid.toString(), 
        language_filters: props.language_filters.toString(), 
        platform_filters: props.platform_filters.toString()
    }
    const response = await fetch(API_URL + new URLSearchParams(params));
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data;
}
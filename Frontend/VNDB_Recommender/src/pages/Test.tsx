import {useState, useEffect} from 'react';
import { Button, Flex, Group, Text } from "@mantine/core";

function Test() {
    const [stats, setStats] = useState({
        chars: 0,
        producers: 0,
        releases: 0,
        staff: 0,
        tags: 0,
        traits: 0,
        vn: 0
    })

    const [n_result, setN_result] = useState({
        results: []
    })

    const [novel, setNovel] = useState({
        image: "",
        title: ""
    })

    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('https://api.vndb.org/kana/stats')
        .then(response => response.json())
        .then(res => setStats(res))
    }, [])

    useEffect(() => {
        fetch('https://api.vndb.org/kana/vn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: '{\n    "filters": ["id", "=", "v17"],\n    "fields": "title, image.url"\n}',
            body: JSON.stringify({
                'filters': [
                    'id',
                    '=',
                    'v2002'
                ],
                'fields': 'title, image.url'
            })
        })
        .then(response => response.json())
        .then(res => setN_result(res))
    }, [])

    function incrementCount(){
        setCount(prevCount => prevCount + 1)
    }

    return (
        <Flex justify={"center"} direction={"column"} align={"center"}>
            <h1>This is a test page!</h1>
            <Button
            onClick={incrementCount}
            variant="gradient"
            gradient={{from: 'aqua', to: 'aquamarine', deg: 143}}
            c="dark">
                This is a button!
            </Button>
            <p>You have clicked the button {count} times!</p>

            <h1>Here's a visual novel:</h1>
            <p>Title: {}</p>
            

            <h1>Here are some VNDB stats:</h1>
            <p>VNs: {stats.vn}</p>
            <p>Releases: {stats.releases}</p>
            <p>Characters: {stats.chars}</p>
            <p>Tags: {stats.tags}</p>
            <p>Traits: {stats.traits}</p>
            <p>Staff: {stats.staff}</p>
            <p>Producers: {stats.producers}</p>
        </Flex>
    );
}

export default Test;
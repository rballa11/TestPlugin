import { AuditResult } from "./Results";
import { Figma} from "./App"

const BASE = 'http://localhost:8000'



//change to post
const getResults = () : Promise<AuditResult> => {
    return fetch(`${BASE}/review`).then(r => r.json());

}


export const postResults = (data: Figma) : Promise<AuditResult> => {
    return fetch(`${BASE}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(r => r.json())
}

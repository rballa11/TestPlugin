from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class subFigma(BaseModel):
    width: int
    height: int
    desc: str | None

class figma(BaseModel):
    description: list[subFigma] | None



# class for into and out .toJson method

# create model class for nielsen
# display this into figma plugin
# link code.tsx, second page, and api (conditional render with buffer)



groq = Groq(
    api_key= os.getenv("GROQ_API_KEY"),

)
class returnObject(BaseModel):
    firstR: int
    firstD: str
    secondR: int
    secondD: str
    thirdR: int
    thirdD: str
    fourthR: int
    fourthD: str
    fifthR: int
    fifthD: str
    sixthR: int
    sixthD: str
    seventR: int
    seventhD: str
    eigthR: int
    eightD: str
    ninthR: int
    ninthD: str
    tenthR: int
    tenthD: str
    overallR: int
    overall: str

#https://www.nngroup.com/articles/ten-usability-heuristics/
"""
Visibility of system status
Match between system and the real world
User control and freedom
Consistency and standards
Error prevention
Recognition rather than recall
Flexibility and efficiency of use
Aesthetic and minimalist design
Help users recognize, diagnose, and recover from errors
Help and documentation
"""
@app.post('/review', response_model=returnObject)
def review(item: figma):
    stream = groq.chat.completions.create(
        messages= [
            {
                "role": "system",
                "content": "Rate this figma design on the 10 Nielsen Principles from 1 to 10. Each spot in the json list inputted represents a node and a description of that node. We used BFS on the overall Figma Tree to get this JSON list."
                "For each principle, output a rating and a description of why that rating. Each description should be 2-3 sentences or less. At the end, inlude an overall rating from 1 to 100 and description too. Return whole answer in JSON Format."
                "10 Nielsen Principles: Visibility of system status, Match between system and the real world, User control and freedom, Consistency and standards, Error prevention, Recognition rather than recall, Flexibility and efficiency of use, Aesthetic and minimalist design, Help users recognize, diagnose, and recover from errors, Help and documentation"
                "JSON Schema: class returnObject(BaseModel): firstR: int firstD: str secondR: int secondD: str thirdR: int  thirdD: str  fourthR: int fourthD: str fifthR: int fifthD: str sixthR: int sixthD: str seventR: int seventhD: str eigthR: int eightD: str ninthR: int ninthD: str tenthR: int tenthD: str overallR: int overall: str"
                
            },
            {
                "role": "user",
                "content": item.model_dump_json()
            }
        ],
        model="llama-3.3-70b-versatile",
        response_format={"type": "json_object"}
    )
    return returnObject.model_validate_json(stream.choices[0].message.content)


    




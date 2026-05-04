from fastapi import FastAPI
from groq import Groq
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

class object(BaseModel):
    width: float
    height: float
    description: str | None

# create system prompt
# create class for nielsen
# make output of llm match this nielsen class by putting class desc in prompt
# create description maker in figma
# class for into and out .toJson method
# display this into figma plugin



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
@app.post('/review', response_class= returnObject)
def review(item: object):
    stream = groq.chat.completions.create(
        messages= [
            {
                "role": "system",
                "message": ""
            },
            {
                "role": "user",
                "message": item.model_dump_json()
            }
        ],
        model="llama-3.3-70b-versatile"
    )
    return stream.choices[0].message.content


    




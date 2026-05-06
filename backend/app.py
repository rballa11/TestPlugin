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
    width: float
    height: float
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
SYSTEM_PROMPT = f"""Rate this Figma design on the 10 Nielsen Usability Principles. Each item in the input list is a node from a BFS traversal of the Figma tree.

For each principle give a rating (1-10) and a 1-2 sentence explanation. Also give an overall score (1-100) and summary.

You MUST return valid JSON that exactly matches this schema — no extra keys, no missing keys:
{returnObject.model_json_schema()}

10 Nielsen Principles (in order):
1. Visibility of system status
2. Match between system and the real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation"""

@app.post('/review', response_model=returnObject)
def review(item: figma):
    for attempt in range(3):
        try:
            response = groq.chat.completions.create(
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": item.model_dump_json()}
                ],
                model="llama-3.3-70b-versatile",
                response_format={"type": "json_object"}
            )
            return returnObject.model_validate_json(response.choices[0].message.content)
        except Exception as e:
            if attempt == 2:
                raise e
            continue


    




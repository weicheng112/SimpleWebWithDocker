from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class NumberInput(BaseModel):
    number: int

@app.post("/submit-number/")
async def submit_number(input: NumberInput):
    return {"received_number": input.number}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
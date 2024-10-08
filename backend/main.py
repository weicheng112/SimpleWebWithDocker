from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()



app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],  # React app runs on port 3000
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

class NumberInput(BaseModel):
    number: int

@app.post("/submit-number/")
async def submit_number(input: NumberInput):
    return {"received_number": input.number}

@app.get("/health")
async def health_check():
    """Simple health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
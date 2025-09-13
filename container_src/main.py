from fastapi import FastAPI
import os

# Create FastAPI app
app = FastAPI()

# Get environment variables
MESSAGE = os.environ.get("MESSAGE", "Hello from Python!")
INSTANCE_ID = os.environ.get("CLOUDFLARE_DEPLOYMENT_ID", "local")

@app.get("/")
async def root():
    """Main endpoint"""
    return f'Hi, I\'m a container and this is my message: "{MESSAGE}", my instance ID is: {INSTANCE_ID}'

@app.get("/container")
async def container():
    """Container info endpoint"""
    return f'Hi, I\'m a container and this is my message: "{MESSAGE}", my instance ID is: {INSTANCE_ID}'

@app.get("/health")
async def health():
    """Health check"""
    return {"status": "healthy", "instance": INSTANCE_ID}

@app.get("/error")
async def error():
    """Test error handling"""
    raise Exception("This is a panic")
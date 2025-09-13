# Use Python slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY container_src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY container_src/main.py .

# The port must match what's in your Worker code (8080)
EXPOSE 8080

# Run the FastAPI app with Uvicorn on port 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
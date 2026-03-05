"""
AI Assistant API endpoints
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.services.assistant_service import AssistantService
from app.utils.logger import logger

router = APIRouter()
assistant_service = AssistantService()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None
    history: Optional[List[Message]] = None


class ChatResponse(BaseModel):
    message: str
    role: str
    sources: Optional[List[Dict[str, Any]]] = None


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with AI assistant"""
    try:
        logger.info(f"Processing chat request: {request.message[:50]}...")
        
        response = await assistant_service.chat(
            message=request.message,
            context=request.context or {},
            history=request.history or [],
        )
        
        return ChatResponse(
            message=response["message"],
            role="assistant",
            sources=response.get("sources"),
        )
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/explain")
async def explain_concept(request: dict):
    """Explain a concept using AI"""
    try:
        concept = request.get("concept", "")
        level = request.get("level", "intermediate")
        
        explanation = await assistant_service.explain_concept(concept, level)
        
        return {"success": True, "data": {"explanation": explanation}}
    except Exception as e:
        logger.error(f"Explain error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/quiz")
async def generate_quiz(request: dict):
    """Generate quiz questions"""
    try:
        topic = request.get("topic", "")
        num_questions = request.get("num_questions", 5)
        
        questions = await assistant_service.generate_quiz(topic, num_questions)
        
        return {"success": True, "data": {"questions": questions}}
    except Exception as e:
        logger.error(f"Quiz generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


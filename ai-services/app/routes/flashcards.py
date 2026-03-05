"""
Flashcards API endpoints
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.flashcard_service import FlashcardService
from app.utils.logger import logger

router = APIRouter()
flashcard_service = FlashcardService()


class FlashcardRequest(BaseModel):
    topic: str
    num_cards: int = 10
    difficulty: str = "intermediate"


class Flashcard(BaseModel):
    front: str
    back: str


@router.post("/generate")
async def generate_flashcards(request: FlashcardRequest):
    """Generate flashcards from a topic"""
    try:
        cards = await flashcard_service.generate_flashcards(
            topic=request.topic,
            num_cards=request.num_cards,
            difficulty=request.difficulty,
        )
        return {"success": True, "data": cards}
    except Exception as e:
        logger.error(f"Flashcard generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/summarize")
async def summarize_content(request: dict):
    """Summarize content for flashcards"""
    try:
        content = request.get("content", "")
        summary = await flashcard_service.summarize_for_flashcards(content)
        return {"success": True, "data": {"summary": summary}}
    except Exception as e:
        logger.error(f"Summarization error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


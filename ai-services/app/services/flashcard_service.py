"""
Flashcard Generation Service
"""
from typing import List, Dict, Any
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from app.config import settings
from app.utils.logger import logger


class FlashcardService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0.3,
            max_tokens=settings.MAX_TOKENS,
            openai_api_key=settings.OPENAI_API_KEY,
        )
    
    async def generate_flashcards(
        self,
        topic: str,
        num_cards: int = 10,
        difficulty: str = "intermediate",
    ) -> List[Dict[str, str]]:
        """Generate flashcards for a topic"""
        prompt = f"""Generate {num_cards} flashcards about '{topic}' at a {difficulty} level.
Return in JSON format as an array of objects with 'front' and 'back' fields.
The front should be the question/term, and back should be the answer/definition."""
        
        messages = [
            SystemMessage(content="You are an expert educator. Generate clear, concise flashcards."),
            HumanMessage(content=prompt),
        ]
        
        try:
            response = self.llm(messages)
            import json
            content = response.content
            
            # Extract JSON
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0]
            elif "```" in content:
                content = content.split("```")[1].split("```")[0]
            
            cards = json.loads(content.strip())
            return cards
        except Exception as e:
            logger.error(f"Flashcard generation error: {e}")
            return []
    
    async def summarize_for_flashcards(self, content: str) -> str:
        """Summarize content into key points for flashcards"""
        prompt = f"""Summarize the following content into key points suitable for creating flashcards.
Focus on:
- Key definitions
- Important concepts
- Essential facts
- Relationships between concepts

Content:
{content[:2000]}"""
        
        messages = [
            SystemMessage(content="You are an expert at creating educational summaries."),
            HumanMessage(content=prompt),
        ]
        
        response = self.llm(messages)
        return response.content


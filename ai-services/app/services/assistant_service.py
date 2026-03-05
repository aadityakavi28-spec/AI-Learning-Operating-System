"""
AI Assistant Service
"""
from typing import List, Dict, Any, Optional
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from app.config import settings
from app.utils.logger import logger


class AssistantService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=settings.TEMPERATURE,
            max_tokens=settings.MAX_TOKENS,
            openai_api_key=settings.OPENAI_API_KEY,
        )
        self.system_prompt = """You are an AI Learning Assistant helping students learn effectively.
You provide clear, concise explanations and adapt to the student's learning level.
Always encourage critical thinking and guide rather than just giving answers."""
    
    async def chat(
        self,
        message: str,
        context: Dict[str, Any] = {},
        history: List[Dict[str, str]] = [],
    ) -> Dict[str, Any]:
        """Process chat message and return response"""
        messages = [SystemMessage(content=self.system_prompt)]
        
        # Add conversation history
        for msg in history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                messages.append(AIMessage(content=msg["content"]))
        
        # Add current message
        messages.append(HumanMessage(content=message))
        
        try:
            response = self.llm(messages)
            return {
                "message": response.content,
                "sources": context.get("sources", []),
            }
        except Exception as e:
            logger.error(f"Chat error: {e}")
            return {
                "message": "I apologize, but I encountered an error processing your request.",
                "sources": [],
            }
    
    async def explain_concept(self, concept: str, level: str = "intermediate") -> str:
        """Explain a concept at the specified level"""
        prompt = f"""Explain the concept of '{concept}' at a {level} level.
Include:
1. A clear definition
2. Real-world examples
3. Key points to remember
4. Common misconceptions"""
        
        messages = [
            SystemMessage(content=self.system_prompt),
            HumanMessage(content=prompt),
        ]
        
        response = self.llm(messages)
        return response.content
    
    async def generate_quiz(self, topic: str, num_questions: int = 5) -> List[Dict[str, Any]]:
        """Generate quiz questions for a topic"""
        prompt = f"""Generate {num_questions} multiple choice questions about '{topic}'.
Return in JSON format:
[
  {{
    "question": "question text",
    "options": ["A", "B", "C", "D"],
    "correct_answer": "A",
    "explanation": "why this is correct"
  }}
]"""
        
        messages = [
            SystemMessage(content="You are a quiz generator. Always respond with valid JSON."),
            HumanMessage(content=prompt),
        ]
        
        response = self.llm(messages)
        
        try:
            import json
            # Extract JSON from response
            content = response.content
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0]
            elif "```" in content:
                content = content.split("```")[1].split("```")[0]
            
            return json.loads(content.strip())
        except Exception as e:
            logger.error(f"Quiz parsing error: {e}")
            return []


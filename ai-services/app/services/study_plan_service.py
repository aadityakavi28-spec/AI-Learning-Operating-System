"""
Study Plan Generation Service
"""
from typing import List, Dict, Any
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from app.config import settings
from app.utils.logger import logger


class StudyPlanService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0.5,
            max_tokens=settings.MAX_TOKENS,
            openai_api_key=settings.OPENAI_API_KEY,
        )
    
    async def generate_plan(
        self,
        topic: str,
        duration_days: int,
        goal: str,
        current_level: str = "intermediate",
    ) -> Dict[str, Any]:
        """Generate a personalized study plan"""
        prompt = f"""Create a comprehensive {duration_days}-day study plan for learning '{topic}'.
        
Current level: {current_level}
Goal: {goal}

Return a JSON object with:
{{
    "title": "Study Plan Title",
    "description": "Brief description",
    "duration_days": {duration_days},
    "tasks": [
        {{
            "day": 1,
            "title": "Task title",
            "description": "What to learn",
            "duration_minutes": 30,
            "type": "video|reading|practice|review"
        }}
    ],
    "milestones": ["What user will achieve"],
    "tips": ["Study tips"]
}}"""
        
        messages = [
            SystemMessage(content="You are an expert learning strategist. Create effective, realistic study plans."),
            HumanMessage(content=prompt),
        ]
        
        try:
            response = self.llm(messages)
            import json
            content = response.content
            
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0]
            elif "```" in content:
                content = content.split("```")[1].split("```")[0]
            
            plan = json.loads(content.strip())
            return plan
        except Exception as e:
            logger.error(f"Study plan generation error: {e}")
            return {"title": "", "tasks": [], "error": str(e)}
    
    async def optimize_plan(self, plan: Dict[str, Any]) -> Dict[str, Any]:
        """Optimize an existing study plan"""
        prompt = f"""Optimize this study plan for better learning outcomes:

{plan}

Consider:
- Spaced repetition
- Active recall
- Practical exercises
- Break distribution
- Learning fatigue prevention

Return optimized JSON."""
        
        messages = [
            SystemMessage(content="You are an expert at optimizing learning schedules."),
            HumanMessage(content=prompt),
        ]
        
        response = self.llm(messages)
        
        try:
            import json
            content = response.content
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0]
            return json.loads(content.strip())
        except Exception as e:
            logger.error(f"Plan optimization error: {e}")
            return plan


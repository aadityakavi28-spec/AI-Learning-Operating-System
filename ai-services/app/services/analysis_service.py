"""
Learning Analysis Service - AI-powered learning diagnostics
"""
from typing import List, Dict, Any, Optional
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from app.config import settings
from app.utils.logger import logger


class AnalysisService:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0.3,
            max_tokens=settings.MAX_TOKENS,
            openai_api_key=settings.OPENAI_API_KEY,
        )
    
    async def diagnose_learning_issues(
        self,
        study_sessions: List[Dict[str, Any]],
        resource_completions: List[Dict[str, Any]],
        quiz_results: List[Dict[str, Any]],
        time_spent: Dict[str, int],
    ) -> Dict[str, Any]:
        """Analyze learning data and diagnose issues"""
        
        prompt = f"""Analyze the following learning data and diagnose any issues:

Study Sessions: {study_sessions}
Resource Completions: {resource_completions}
Quiz Results: {quiz_results}
Time Spent: {time_spent}

Provide a diagnosis in JSON format:
{{
    "overall_health": "good|needs_improvement|poor",
    "issues": [
        {{
            "type": "lack_of_consistency|too_much_theory|not_enough_practice|burnout",
            "severity": "high|medium|low",
            "description": "Issue description",
            "recommendation": "Specific recommendation"
        }}
    ],
    "strengths": ["What user is doing well"],
    "action_plan": ["Priority actions to take"]
}}"""
        
        messages = [
            SystemMessage(content="You are an expert learning analyst. Provide actionable insights."),
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
            
            return json.loads(content.strip())
        except Exception as e:
            logger.error(f"Diagnosis error: {e}")
            return {"error": str(e)}
    
    async def generate_insights(self, user_id: str) -> Dict[str, Any]:
        """Generate personalized learning insights"""
        
        prompt = f"""Generate personalized learning insights for user {user_id}.

Consider:
- Learning patterns
- Time management
- Topic preferences
- Performance trends

Provide insights in JSON format:
{{
    "insights": ["Key insight 1", "Key insight 2"],
    "patterns": ["Learning pattern observed"],
    "recommendations": ["Actionable recommendation"]
}}"""
        
        messages = [
            SystemMessage(content="You are an AI learning analyst providing personalized insights."),
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
            logger.error(f"Insights error: {e}")
            return {"error": str(e)}
    
    async def predict_performance(self, user_id: str) -> Dict[str, Any]:
        """Predict future performance based on trends"""
        
        prompt = f"""Predict future learning performance for user {user_id}.

Based on their learning history, predict:
- Expected quiz scores
- Completion rates
- Suggested focus areas

Provide prediction in JSON format:
{{
    "predicted_score_range": "70-85%",
    "confidence": "medium",
    "factors": ["What will influence performance"],
    "suggestions": ["How to improve prediction"]
}}"""
        
        messages = [
            SystemMessage(content="You are an AI learning predictor."),
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
            logger.error(f"Prediction error: {e}")
            return {"error": str(e)}


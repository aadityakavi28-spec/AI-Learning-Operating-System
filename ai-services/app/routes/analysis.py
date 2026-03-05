"""
Learning Analysis API endpoints
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.services.analysis_service import AnalysisService
from app.utils.logger import logger

router = APIRouter()
analysis_service = AnalysisService()


class LearningData(BaseModel):
    study_sessions: List[Dict[str, Any]]
    resource_completions: List[Dict[str, Any]]
    quiz_results: List[Dict[str, Any]]
    time_spent: Dict[str, int]


@router.post("/diagnose")
async def diagnose_learning_issues(request: LearningData):
    """Diagnose learning issues and provide recommendations"""
    try:
        diagnosis = await analysis_service.diagnose_learning_issues(
            study_sessions=request.study_sessions,
            resource_completions=request.resource_completions,
            quiz_results=request.quiz_results,
            time_spent=request.time_spent,
        )
        return {"success": True, "data": diagnosis}
    except Exception as e:
        logger.error(f"Diagnosis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/insights")
async def get_learning_insights(request: dict):
    """Get AI-powered learning insights"""
    try:
        user_id = request.get("user_id")
        insights = await analysis_service.generate_insights(user_id)
        return {"success": True, "data": insights}
    except Exception as e:
        logger.error(f"Insights error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/predict")
async def predict_performance(request: dict):
    """Predict future performance based on current trends"""
    try:
        user_id = request.get("user_id")
        prediction = await analysis_service.predict_performance(user_id)
        return {"success": True, "data": prediction}
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


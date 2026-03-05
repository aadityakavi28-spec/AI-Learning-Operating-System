"""
Study Plan API endpoints
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.study_plan_service import StudyPlanService
from app.utils.logger import logger

router = APIRouter()
study_plan_service = StudyPlanService()


class StudyPlanRequest(BaseModel):
    topic: str
    duration_days: int
    goal: str
    current_level: str = "intermediate"


class StudyTask(BaseModel):
    title: str
    description: str
    resource_id: Optional[str] = None
    duration_minutes: int
    day: int


@router.post("/generate")
async def generate_study_plan(request: StudyPlanRequest):
    """Generate a personalized study plan"""
    try:
        plan = await study_plan_service.generate_plan(
            topic=request.topic,
            duration_days=request.duration_days,
            goal=request.goal,
            current_level=request.current_level,
        )
        return {"success": True, "data": plan}
    except Exception as e:
        logger.error(f"Study plan generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/optimize")
async def optimize_study_plan(request: dict):
    """Optimize an existing study plan"""
    try:
        plan = request.get("plan", {})
        optimized = await study_plan_service.optimize_plan(plan)
        return {"success": True, "data": optimized}
    except Exception as e:
        logger.error(f"Study plan optimization error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


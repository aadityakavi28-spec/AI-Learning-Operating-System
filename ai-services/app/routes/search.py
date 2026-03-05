"""
Search API endpoints for AI-powered learning resource search
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.search_service import SearchService
from app.utils.logger import logger

router = APIRouter()
search_service = SearchService()


class SearchRequest(BaseModel):
    query: str
    filters: Optional[dict] = None
    page: int = 1
    limit: int = 20


class SearchResult(BaseModel):
    id: str
    type: str
    title: str
    description: str
    url: str
    thumbnail: Optional[str] = None
    source: str
    duration: Optional[int] = None
    difficulty: str
    tags: List[str] = []


@router.post("/")
async def search_resources(request: SearchRequest):
    """Search for learning resources using AI"""
    try:
        logger.info(f"Searching for: {request.query}")
        
        results = await search_service.search(
            query=request.query,
            filters=request.filters or {},
            page=request.page,
            limit=request.limit,
        )
        
        return {
            "success": True,
            "data": results,
            "total": len(results),
        }
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/suggestions")
async def get_search_suggestions(q: str):
    """Get search suggestions"""
    try:
        suggestions = await search_service.get_suggestions(q)
        return {"success": True, "data": suggestions}
    except Exception as e:
        logger.error(f"Suggestions error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


"""
Search Service - AI-powered learning resource search
"""
from typing import List, Dict, Any, Optional
import httpx
from app.config import settings
from app.utils.logger import logger


class SearchService:
    def __init__(self):
        self.youtube_api_key = settings.YOUTUBE_API_KEY
        
    async def search(
        self, 
        query: str, 
        filters: Dict[str, Any] = None,
        page: int = 1,
        limit: int = 20
    ) -> List[Dict[str, Any]]:
        """Search for learning resources across multiple sources"""
        results = []
        
        # Search YouTube
        youtube_results = await self._search_youtube(query, limit)
        results.extend(youtube_results)
        
        # Search articles (placeholder - integrate with actual article API)
        article_results = await self._search_articles(query, limit)
        results.extend(article_results)
        
        # Apply filters
        if filters:
            results = self._apply_filters(results, filters)
            
        # Paginate
        start = (page - 1) * limit
        end = start + limit
        return results[start:end]
    
    async def _search_youtube(self, query: str, limit: int) -> List[Dict[str, Any]]:
        """Search YouTube for educational content"""
        if not self.youtube_api_key:
            logger.warning("YouTube API key not configured")
            return []
            
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    "https://www.googleapis.com/youtube/v3/search",
                    params={
                        "part": "snippet",
                        "q": f"{query} tutorial",
                        "type": "video",
                        "maxResults": limit,
                        "key": self.youtube_api_key,
                        "videoDefinition": "high",
                        "order": "relevance",
                    },
                    timeout=10.0,
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return [
                        {
                            "id": item["id"]["videoId"],
                            "type": "video",
                            "title": item["snippet"]["title"],
                            "description": item["snippet"]["description"],
                            "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
                            "source": "YouTube",
                            "duration": None,  # Requires additional API call
                            "difficulty": "intermediate",
                            "tags": [query],
                        }
                        for item in data.get("items", [])
                    ]
        except Exception as e:
            logger.error(f"YouTube search error: {e}")
            
        return []
    
    async def _search_articles(self, query: str, limit: int) -> List[Dict[str, Any]]:
        """Search for articles (placeholder)"""
        # Implement article search integration
        return []
    
    def _apply_filters(
        self, 
        results: List[Dict[str, Any]], 
        filters: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Apply filters to search results"""
        filtered = results
        
        if resource_type := filters.get("type"):
            filtered = [r for r in filtered if r.get("type") == resource_type]
            
        if difficulty := filters.get("difficulty"):
            filtered = [r for r in filtered if r.get("difficulty") == difficulty]
            
        return filtered
    
    async def get_suggestions(self, query: str) -> List[str]:
        """Get search suggestions"""
        # Placeholder for autocomplete suggestions
        return [
            f"{query} tutorial",
            f"{query} for beginners",
            f"{query} interview questions",
            f"{query} best practices",
        ]


"""
Logging utilities
"""
import logging
import sys
from loguru import logger


def setup_logging():
    """Setup application logging"""
    logger.remove()
    
    # Console output
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>",
        level=logging.INFO,
    )
    
    # File output
    logger.add(
        "logs/app.log",
        rotation="500 MB",
        retention="10 days",
        level=logging.DEBUG,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function} - {message}",
    )
    
    logger.info("Logging configured")
    return logger


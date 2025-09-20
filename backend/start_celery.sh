#!/bin/bash
# Script to start Celery worker

celery -A celery_app worker --loglevel=info

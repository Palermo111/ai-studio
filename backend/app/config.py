import os

from dotenv import load_dotenv

load_dotenv()

# ==========================
# Generation
# ==========================

DEFAULT_DURATION = 4
DEFAULT_RESOLUTION = "480p"
DEFAULT_ASPECT_RATIO = "9:16"

DEFAULT_MODEL = "bytedance/seedance-2.0"

POLL_INTERVAL = 5

DEFAULT_OUTPUT_DIR = "storage/videos"

# ==========================
# Backend
# ==========================

BASE_URL = os.getenv(
    "BASE_URL",
    "http://localhost:8000",
)

API_SECRET = os.getenv(
    "API_SECRET",
    "",
)

# ==========================
# Projects
# ==========================

PROJECTS_DIR = "projects"

ELEMENTS_FOLDER = "elements"

IMAGES_FOLDER = "images"

# ==========================
# Upload
# ==========================

ALLOWED_IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
}

MAX_ELEMENT_REFERENCES = 4
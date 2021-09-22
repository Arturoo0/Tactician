
from os import read
from flask import Flask
from flask_pymongo import PyMongo
from decouple import config
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from app.puzzles.util import PuzzleContainer

mongo = PyMongo()
bcrypt = Bcrypt()
puzzle_container = PuzzleContainer()

def create_app():
    app = Flask(__name__)
    CORS(app, support_credentials=True)
    mongo.init_app(app, config('DB_URI'))
    bcrypt.init_app(app)

    from .routes.auth import auth
    from .routes.puzzles import puzzles
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(puzzles, url_prefix='/puzzles')
    
    return app


from flask import Flask
from flask_pymongo import PyMongo
from decouple import config

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    mongo.init_app(app, config('DB_URI'))

    from .routes.auth import auth
    app.register_blueprint(auth, url_prefix='/auth')
    
    return app
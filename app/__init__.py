
from flask import Flask
from flask_pymongo import PyMongo
from decouple import config
from flask_bcrypt import Bcrypt
from flask_cors import CORS

mongo = PyMongo()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app, support_credentials=True)
    mongo.init_app(app, config('DB_URI'))
    bcrypt.init_app(app)

    from .routes.auth import auth
    app.register_blueprint(auth, url_prefix='/auth')
    
    return app
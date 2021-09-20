
from flask import Blueprint, request, jsonify
from ..models.user import User 
from ..models.session import Session
from .. import mongo, bcrypt
from operator import itemgetter
import logging 
from flask_cors import cross_origin
import uuid
import time

auth = Blueprint('auth', __name__)

@auth.route('/sign-up', methods=['POST'])
@cross_origin(supports_credentials=True)
def signup():
    try:
        body = dict(request.json)
        email, username, password = itemgetter('email', 'username', 'password')(body)

        if mongo.db[User.collection_name].find_one({'email': email}):
            return {
                'message': 'Email already exists'
            }, 401

        if mongo.db[User.collection_name].find_one({'username': username}):
            return {
                'message': 'Username already exists'
            }, 401

        password = bcrypt.generate_password_hash(password).decode('utf-8')

        newUser = User(email, username, password)
        generated_session_id = uuid.uuid4()
        newSession = Session(generated_session_id, time.time() + (60 * 60 * 24))
        mongo.db[User.collection_name].insert_one(newUser.generate_schema_dict())
        mongo.db[Session.collection_name].insert_one(newSession.generate_schema_dict())

        return {
            'message': 'Sign up succesful'
        }, 200, {'Set-Cookie': f"session_id={generated_session_id}"}
    except Exception as e:
        logging.error(e)
        error_msg = str(e)
        if (error_msg in User.value_error_mapper):
            return {
                'message': User.value_error_mapper[error_msg]
            }, 401
        return {
            'message': 'Was not able to sign up, something occured'
        }, 401

@auth.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    body = dict(request.json)
    email, username, password = itemgetter('email', 'username', 'password')(body)

    docMatch = {
        'email': email,
        'username': username
    }
    matchingDoc = mongo.db[User.collection_name].find_one(docMatch)
    if not matchingDoc:
        return {
            'message': 'No matching email/username found'
        }, 401
    if bcrypt.check_password_hash(matchingDoc['password'], password):
        newSession = Session(uuid.uuid4(), time.time() + (60 * 60 * 24))
        mongo.db[Session.collection_name].insert_one(newSession.generate_schema_dict())
        return {
            'message': 'Login succesful'
        }
    else:
        return {
            'message': 'Incorrect password was provided'
        }, 401

@auth.route('/test', methods=['POST'])
@cross_origin(supports_credentials=True)
def test():
    return {}, 200, {'Set-Cookie': f"session_id={'lol'}"}
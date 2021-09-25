
from flask import Blueprint, request, jsonify, make_response
from ..models.user import User 
from ..models.session import Session
from ..models.user_data import UserData
from .. import mongo, bcrypt
from operator import itemgetter
import logging 
from flask_cors import cross_origin, CORS
import uuid
import time

auth = Blueprint('auth', __name__)
CORS(auth)
cookie_key = 'session_id'

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
        user_data_identifier = uuid.uuid4()
        generated_session_id = uuid.uuid4()

        newUser = User(email, username, password, user_data_identifier)
        newUserData = UserData(username, user_data_identifier, [], [])
        newSession = Session(generated_session_id, time.time() + (60 * 60 * 24), user_data_identifier)

        mongo.db[User.collection_name].insert_one(newUser.generate_schema_dict())
        mongo.db[Session.collection_name].insert_one(newSession.generate_schema_dict())
        mongo.db[UserData.collection_name].insert_one(newUserData.generate_schema_dict())

        response = make_response({
            'message': 'Sign up succesful'
        }) 
        response.set_cookie(cookie_key, value=str(generated_session_id))
        return response 
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
        generated_session_id = uuid.uuid4()
        newSession = Session(generated_session_id, time.time() + (60 * 60 * 24), matchingDoc['user_data_identifier'])
        mongo.db[Session.collection_name].insert_one(newSession.generate_schema_dict())
        return {
            'message': 'Login succesful'
        }, 200, {'Set-Cookie': f"{cookie_key}={generated_session_id}"}
    else:
        return {
            'message': 'Incorrect password was provided'
        }, 401

@auth.route('/is-valid-session', methods=['GET'])
@cross_origin(supports_credentials=True)
def is_valid_session():
    cookies = dict(request.cookies)
    if cookie_key in cookies:
        session_id = cookies[cookie_key]
        matching_sessions = mongo.db[Session.collection_name].find_one({cookie_key: uuid.UUID(session_id)})
        if not matching_sessions: return {}, 401
        return {}, 200
    else:
        return {}, 401

@auth.route('/signout', methods=['POST'])
@cross_origin(supports_credentials=True)
def signout():
    cookies = dict(request.cookies)
    if 'session_id' not in cookies: 
        return {}, 401
    session_id = cookies[cookie_key]
    matching_session = mongo.db[Session.collection_name].find_one({cookie_key: uuid.UUID(session_id)})
    if matching_session:
        mongo.db[Session.collection_name].remove({'session_id': uuid.UUID(session_id)})
    return {}
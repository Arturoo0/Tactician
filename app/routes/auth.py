
from flask import Blueprint, request, jsonify
from ..models.user import User 
from .. import mongo, bcrypt
from operator import itemgetter
import logging 
from flask_cors import cross_origin

auth = Blueprint('auth', __name__)

@auth.route('/sign-up', methods=['POST'])
def signup():
    try:
        body = dict(request.form)
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
        mongo.db[User.collection_name].insert_one(newUser.generate_schema_dict())
        return {
            'message': 'Sign up succesful'
        }
    except Exception as e:
        logging.error(e)
        error_msg = str(e)
        if (error_msg in User.value_error_mapper):
            return {
                'message': User.value_error_mapper[error_msg]
            }
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
        return {
            'message': 'Login succesful'
        }
    else:
        return {
            'message': 'Incorrect password was provided'
        }, 401
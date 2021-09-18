
from flask import Blueprint, request
from ..models.user import User 
from .. import mongo, bcrypt
from operator import itemgetter
import logging 

auth = Blueprint('auth', __name__)

@auth.route('/sign-up', methods=['POST'])
def signup():
    try:
        body = dict(request.form)
        email, username, password = itemgetter('email', 'username', 'password')(body)

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
        }
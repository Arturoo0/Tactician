
from flask import Blueprint, request
from flask_cors import cross_origin, CORS
from .puzzles import check_user_validity

user = Blueprint('user', __name__)
CORS(user)

@user.route('/username', methods=['GET'])
@cross_origin(supports_credentials=True)
def username():
    user_data_doc = check_user_validity(request.cookies)
    return {
        'username': user_data_doc['username']
    }
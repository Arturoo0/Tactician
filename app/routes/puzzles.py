
from re import match
from flask import Blueprint, request
from flask_cors import cross_origin, CORS
from .. import puzzle_container, mongo
from ..models.user_data import UserData
from ..models.session import Session
import uuid

puzzles = Blueprint('puzzles', __name__)
CORS(puzzles)

@puzzles.route('/<rating>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_puzzle(rating):
    cookies = dict(request.cookies)
    if 'session_id' not in cookies: return {}, 401
    session_doc = mongo.db[Session.collection_name].find_one({
        'session_id': uuid.UUID(cookies['session_id'])
    })
    if not session_doc: return {}, 401
    user_data_doc = mongo.db[UserData.collection_name].find_one({
        'user_data_identifier': session_doc['user_data_identifier']
    })
    if not user_data_doc: return {}, 401

    print(user_data_doc['rating'])
    pulledPuzzle = puzzle_container.pull_tactic(user_data_doc['rating'])


    matchTo = { 'user_data_identifier' : user_data_doc['user_data_identifier']}
    mongo.db[UserData.collection_name].update_one(matchTo, {
        '$push': {'puzzles_served': pulledPuzzle['PuzzleId']}
    })

    return pulledPuzzle



from re import match
from flask import Blueprint, request
from flask_cors import cross_origin, CORS
from .. import puzzle_container, mongo
from ..models.user_data import UserData
from . import check_user_validity

puzzles = Blueprint('puzzles', __name__)
CORS(puzzles)

@puzzles.route('/<rating>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_puzzle(rating):
    user_data_doc = check_user_validity(request.cookies)
    if user_data_doc == 401:
        return {}, 401

    pulledPuzzle = puzzle_container.pull_tactic(user_data_doc['rating'])

    matchTo = { 'user_data_identifier' : user_data_doc['user_data_identifier']}
    mongo.db[UserData.collection_name].update_one(matchTo, {
        '$push': {'puzzles_served': pulledPuzzle['PuzzleId']}
    })
    pulledPuzzle['user_rating'] = user_data_doc['rating']
    return pulledPuzzle

@puzzles.route('/user-submission', methods=['POST'])
@cross_origin(supports_credentials=True)
def user_submission():
    user_data_doc = check_user_validity(request.cookies)
    if user_data_doc == 401:
        return {}, 401
    matchTo = {'user_data_identifier' : user_data_doc['user_data_identifier']}

    user_rating = user_data_doc['rating']

    user_rating = 10 ** (user_rating/400)
    puzzle_rating = 10 ** (int(request.json['Rating'])/400)

    expected_user = user_rating / (user_rating + puzzle_rating)

    game_score_value = 1 if request.json['Correct'] == True else 0
    new_user_rating = user_data_doc['rating'] + ((32) * (game_score_value - expected_user))

    mongo.db[UserData.collection_name].update_one(matchTo, {
        '$push': {'puzzles_completed': {
            'puzzle_id': request.json['PuzzleId'],
            'correct': request.json['Correct']
        }},
        '$set': {'rating': new_user_rating}
    })
    return {}

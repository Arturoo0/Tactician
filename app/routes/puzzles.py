
from os import supports_bytes_environ
from re import match
from flask import Blueprint, request
from flask_cors import cross_origin, CORS
from .. import puzzle_container, mongo
from ..models.user_data import UserData
from . import check_user_validity

puzzles = Blueprint('puzzles', __name__)
CORS(puzzles)

@puzzles.route('/heartbeat', methods=['GET'])
@cross_origin(supports_credentials=True)
def heartbeat():
    return {}

@puzzles.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_puzzle():
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
        return {'rating_change': 0}
    matchTo = {'user_data_identifier' : user_data_doc['user_data_identifier']}
    if user_data_doc['puzzles_completed']:
        if user_data_doc['puzzles_completed'][-1]['puzzle_id'] == request.json['PuzzleId']:
            return {'rating_change': 0}

    user_rating = user_data_doc['rating']

    user_rating = 10 ** (user_rating/400)
    puzzle_rating = 10 ** (int(request.json['Rating'])/400)

    expected_user = user_rating / (user_rating + puzzle_rating)

    game_score_value = 1 if request.json['Correct'] == True else 0
    new_user_rating = user_data_doc['rating'] + ((32) * (game_score_value - expected_user))
            
    mongo.db[UserData.collection_name].update_one(matchTo, {
        '$push': {'puzzles_completed': {
            'puzzle_id': request.json['PuzzleId'],
            'correct': request.json['Correct'],
            'time_elapsed_in_seconds': request.json['TimeElapsed']
        }},
        '$set': {'rating': new_user_rating}
    })
    return {
        'rating_change': new_user_rating - user_data_doc['rating']
    }

@puzzles.route('/user-history', methods=['GET'])
@cross_origin(supports_credentials=True)
def user_history():
    user_data_doc = check_user_validity(request.cookies)
    if user_data_doc == 401: return {}, 401
    return {
        'completed_matches': user_data_doc['puzzles_completed']
    }

@puzzles.route('/number-of-history-pages/<per_page>', methods=['GET'])
@cross_origin(supports_credentials=True)
def number_of_history_pages(per_page):
    user_data_doc = check_user_validity(request.cookies)
    if user_data_doc == 401: return {}, 401
    per_page = int(per_page)
    completed_games = user_data_doc['puzzles_completed']
    if len(completed_games) <= per_page:
        return { 'pages' : 1 }
    remainingHistory = len(completed_games) % per_page
    pages = ((len(completed_games) - remainingHistory)//per_page) + 1
    return { 'pages' : pages }

@puzzles.route('/history-page/<page>/<per_page>', methods=['GET'])
@cross_origin(supports_credentials=True)
def history_page(page, per_page):
    user_data_doc = check_user_validity(request.cookies)
    if user_data_doc == 401: return {}, 401
    page, per_page = int(page) - 1, int(per_page)
    leftRange = per_page * page
    rightRange = leftRange + per_page
    return {
        'current_page_games' : user_data_doc['puzzles_completed'][::-1][leftRange:rightRange],
        'respective_numerical_serve' : [serveNumber for serveNumber in range(leftRange, rightRange+1)]
    }

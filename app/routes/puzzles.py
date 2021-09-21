
from flask import Blueprint
from flask_cors import cross_origin, CORS
from .. import puzzle_container

puzzles = Blueprint('puzzles', __name__)
CORS(puzzles)

@puzzles.route('/<rating>', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_puzzle(rating):
    return {}



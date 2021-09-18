
from flask import Blueprint
from ..models.user import User 
from .. import mongo 

auth = Blueprint('auth', __name__)

@auth.route('/sign-up')
def signup():
    newUser = User('kcd', 'njasdv', 'kcdms')
    return newUser.generateSchemaDict()
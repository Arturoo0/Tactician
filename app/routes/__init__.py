from .. import mongo
from ..models.session import Session
from ..models.user_data import UserData
import uuid

def check_user_validity(cookies):
    cookies = dict(cookies)
    if 'session_id' not in cookies: 401
    session_doc = mongo.db[Session.collection_name].find_one({
        'session_id': uuid.UUID(cookies['session_id'])
    })
    if not session_doc: 401
    user_data_doc = mongo.db[UserData.collection_name].find_one({
        'user_data_identifier': session_doc['user_data_identifier']
    })
    if not user_data_doc: 401
    return user_data_doc

class Session:
    collection_name = 'sessions'
    def __init__(self, session_id, expiry, user_data_identifier):
        self.session_id = session_id
        self.expiry = expiry
        self.user_data_identifier = user_data_identifier
    
    def generate_schema_dict(self):
        return {
            'session_id': self.session_id,
            'expiry': self.expiry,
            'user_data_identifier': self.user_data_identifier
        }
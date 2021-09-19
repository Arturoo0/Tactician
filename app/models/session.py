
class Session:
    collection_name = 'sessions'
    def __init__(self, session_id, expiry):
        self.session_id = session_id
        self.expiry = expiry
    
    def generate_schema_dict(self):
        return {
            'session_id': self.session_id,
            'expiry': self.expiry
        }
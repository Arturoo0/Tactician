import re

class User:
    collection_name = 'users'
    value_error_mapper = {
        'emailErr' : 'Provided email is not a valid shape'
    }
    def __init__(self, email, username, password, user_data_identifier):
        self.validate_email_shape(email)
        self.email = email
        self.username = username
        self.password = password
        self.user_data_identifier = user_data_identifier

    def validate_email_shape(self, email):
        pattern = re.compile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
        matched = bool(pattern.match(email))
        if not matched:
            raise ValueError('emailErr')

    def generate_schema_dict(self):
        return {
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'user_data_identifier': self.user_data_identifier
        }
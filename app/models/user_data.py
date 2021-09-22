
class UserData:
    collection_name = 'user_data'
    def __init__(self, user_data_identifier, puzzles_served, puzzles_completed, rating=1000):
        self.user_data_identifier = user_data_identifier
        self.puzzles_served = puzzles_served
        self.puzzles_completed = puzzles_completed
        self.rating = rating
    
    def generate_schema_dict(self):
        return {
            'user_data_identifier' : self.user_data_identifier,
            'puzzles_served': self.puzzles_served,
            'puzzles_completed': self.puzzles_completed,
            'rating': self.rating
        }
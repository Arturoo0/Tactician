import csv 
import random
import json

class PuzzleContainer:
    def __init__(self):
        # self.convert_csv_to_dict()
        return 

    def convert_csv_to_dict(self):
        id_mapped_puzzles = {}
        puzzles_by_rating = {}
        with open('app/puzzles/lichess_db_puzzle.csv') as f:
            reader = csv.DictReader(f)
            counter = 0
            for row in reader:
                rating = int(row['Rating'])
                rounded_rating = rating - (rating % 100)
                puzzle_id = row['PuzzleId']
                id_mapped_puzzles[puzzle_id] = row

                rating_to_position = rounded_rating//100
                puzzles_by_rating[counter] = {
                    'adjusted_rating': rating_to_position,
                    'id': puzzle_id
                }
                counter += 1
        with open('app/puzzles/puzzle.json', 'w+') as fp:
            json.dump(id_mapped_puzzles, fp)
        with open('app/puzzles/puzzle_ratings.json', 'w+') as fp:
            json.dump(puzzles_by_rating, fp)


    def pull_tactic(self, rating, mongo):
        normalized_rating = int((rating - (rating % 100))/100)
        res = mongo.db['puzzles_by_rating'].aggregate([
            { '$match': { 'adjusted_rating': normalized_rating } },
            { '$sample': { 'size': 1 } }
        ])
        res = list(res)
        if len(res) == 0:
            return {}
        else:
            return res.pop()['id']


            
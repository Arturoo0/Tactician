import csv 
import random
import json

class PuzzleContainer:
    def __init__(self):
        mapped_by_id, mapped_by_rating = self.convert_csv_to_dict()
        self.id_mapped_puzzles = mapped_by_id
        self.puzzles_by_rating = mapped_by_rating

    def convert_csv_to_dict(self):
        id_mapped_puzzles = {}
        puzzles_by_rating = [[] for arr in range(100)]
        with open('app/puzzles/lichess_db_puzzle.csv') as f:
            reader = csv.DictReader(f)
            for row in reader:
                rating = int(row['Rating'])
                rounded_rating = rating - (rating % 100)
                id_mapped_puzzles[row['PuzzleId']] = row
                puzzles_by_rating[rounded_rating//100].append(row)
        with open('app/puzzles/puzzle.json', 'w+') as fp:
            json.dump(id_mapped_puzzles, fp)
        with open('app/puzzles/puzzle_ratings.json', 'w+') as fp:
            json.dump({'puzzles_by_rating': puzzles_by_rating}, fp)
        return (id_mapped_puzzles, puzzles_by_rating)

    def pull_tactic(self, rating):
        normalized_rating = int((rating - (rating % 100))/100)
        return random.choice(self.puzzles_by_rating[normalized_rating])


            
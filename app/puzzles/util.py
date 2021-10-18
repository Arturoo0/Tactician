import csv 

class PuzzleContainer:
    def __init__(self):
        self.id_mapped_puzzles = self.convert_csv_to_dict()
        self.puzzles_by_rating = []
        self.convert_csv_to_dict()

    def convert_csv_to_dict(self):
        try:
            id_mapped_puzzles = {}
            with open('app/puzzles/lichess_db_puzzle.csv') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    id_mapped_puzzles[row['PuzzleId']] = row
            return id_mapped_puzzles
        except:
            print('Something occured parsing the lichess CSV file.')

            
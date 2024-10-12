import pandas as pd

# Replace 'your_file.csv' with the actual path to your CSV file
df = pd.read_csv('data/transactions.csv') 

print(df.head()) # Print the first 5 rows of the dataframe

if __name__ == "__main__":
    print("Hello, World!")
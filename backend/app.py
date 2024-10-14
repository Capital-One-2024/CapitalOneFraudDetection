import pandas as pd

# Replace 'your_file.csv' with the actual path to your CSV file
df = pd.read_csv('data/transactions.csv') 

def load_data():
    # Read the CSV files into DataFrames
    accounts_df = pd.read_csv('data/accounts.csv')  # First DataFrame
    transactions_df = pd.read_csv('data/transactions.csv')  # Second DataFrame
    customers_df = pd.read_csv('data/customers.csv')  # Third DataFrame

    # Merge the DataFrames
    merged_df = pd.merge(accounts_df, transactions_df, on='accountId', how='inner')
    final_df = pd.merge(merged_df, customers_df, on='customerId', how='inner')

    # Drop Vendor Name
    df = final_df.drop("vendorName", axis=1)

    # Expand datetime values for later manipulation
    df['transactionDate'] = pd.to_datetime(df['transactionDate'])
    df['transactionYear'] = df['transactionDate'].dt.year
    df['transactionMonth'] = df['transactionDate'].dt.month
    df['transactionDay'] = df['transactionDate'].dt.day
    df['transactionHour'] = df['transactionDate'].dt.hour
    df['transactionMinute'] = df['transactionDate'].dt.minute
    df['transactionSecond'] = df['transactionDate'].dt.second

    # Calculate total transactions per customer
    df['total_transactions'] = df.groupby('customerId')['amount'].transform('count')

    # Calculate mean transaction amount
    df['mean_transaction_amount'] = df.groupby('customerId')['amount'].transform('mean')

    # Calculate standard deviation of transaction amount
    df['std_transaction_amount'] = df.groupby('customerId')['amount'].transform('std')

    # Calculate minimum and maximum transaction amount
    df['min_transaction_amount'] = df.groupby('customerId')['amount'].transform('min')
    df['max_transaction_amount'] = df.groupby('customerId')['amount'].transform('max')

    # Calculate unique locations used
    df['unique_locations'] = df.groupby('customerId')['transactionLocation'].transform(lambda x: x.nunique())

    # Calculate time since last transaction
    df['time_since_last_transaction'] = (df['transactionDate'] - df.groupby('customerId')['transactionDate'].transform('max')).dt.total_seconds()

    # Extract day of the week
    df['transaction_day_of_week'] = df['transactionDate'].dt.dayofweek  # Monday=0, Sunday=6

    # Add cumulative transaction amount
    df['cumulative_transaction_amount'] = df.groupby('customerId')['amount'].cumsum()

    return df

if __name__ == "__main__":
    df = load_data()
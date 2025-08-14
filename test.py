from pymongo import MongoClient

try:
    client = MongoClient("mongodb+srv://tester:iRHqmObblSlIQxku@cluster0.v5oappx.mongodb.net/")
    # Try a simple command to verify connection
    client.admin.command('ping')
    print("MongoDB connected successfully!")
except Exception as e:
    print("MongoDB connection failed!")
    print(e)

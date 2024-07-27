from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError


class MongoDBHandler:
    def __init__(self, uri: str, db_name: str):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def create_collection(self, collection_name: str, schema: dict):
        # Check if the collection already exists
        if collection_name not in self.db.list_collection_names():
            self.db.create_collection(
                collection_name, validator={"$jsonSchema": schema}
            )
            print(f"Collection '{collection_name}' created with schema validation.")
        else:
            print(f"Collection '{collection_name}' already exists.")

    def insert_document(self, collection_name: str, document: dict):
        collection = self.db[collection_name]
        try:
            collection.insert_one(document)
            print(f"Document inserted into '{collection_name}' collection.")
        except DuplicateKeyError:
            print("Document with the same key already exists.")

    def get_document_by_field(self, collection_name: str, field_name: str, field_value):
        collection = self.db[collection_name]
        document = collection.find_one({field_name: field_value})
        if document:
            return document
        else:
            print(f"Document not found in '{collection_name}' collection.")
            return None

    def update_document(
        self, collection_name: str, field_name: str, field_value, update_data: dict
    ):
        collection = self.db[collection_name]
        result = collection.update_one({field_name: field_value}, {"$set": update_data})
        if result.matched_count > 0:
            print(f"Document in '{collection_name}' collection updated successfully.")
        else:
            print(f"Document not found in '{collection_name}' collection.")

    def delete_document(self, collection_name: str, field_name: str, field_value):
        collection = self.db[collection_name]
        result = collection.delete_one({field_name: field_value})
        if result.deleted_count > 0:
            print(f"Document deleted from '{collection_name}' collection.")
        else:
            print(f"Document not found in '{collection_name}' collection.")

    def close_connection(self):
        self.client.close()

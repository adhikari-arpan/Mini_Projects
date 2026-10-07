import ollama
import json

def extract_listing(listing):
    # Function for Interaction with ollama
    def ask_ollama(model: str, prompt: str) -> str:
        """
        Ask a question to the Ollama model and return the response.

        Args:
            model (str): The name of the Ollama model to use.
            prompt (str): The question or prompt to send to the model.

        Returns:
            str: The response from the Ollama model.
        """
        client = ollama.Client()
        response = client.generate(model=model, prompt=prompt)
        return response.response

    # Model and prompt to be used
    model = "qwen3:1.7b"
    prompt = f"""
    Extract the following rental listing into JSON.

    Return ONLY valid JSON.

    Fields:
    - price
    - location
    - rooms
    - furnished
    
    Listing:
    {listing}
    
    Use null if a field is not mentioned.
    """

    answer_string = ask_ollama(model,prompt)
    # The obtained answer is still in string even though it looks like dictionary. We need to convert it to python dictionary.

    # Converting String to JSON:
    try:
        answer_json = json.loads(answer_string)
        print(answer_json)

    except json.JSONDecodeError:
        print("The model didn't return valid JSON.")

# Open External File
# Notes: By using with we don't need to write file.close()
with open("listings.txt","r", encoding="utf-8") as file:
    listings = file.read()
    
# Separate Individual listing
listings = listings.split("\n\n")
# Separates listing wherever there is two \n\n (two line breaks are separating listings in data)

# Extract Information from each listing
for listing in listings:
    extract_listing(listing)
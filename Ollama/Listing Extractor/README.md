# 🏠 Rental Listing Extractor

Turns rental listings written in plain English into structured JSON using a local AI model running through [Ollama](https://ollama.com).

**Tech:** Python 3 · Ollama · Qwen3 (1.7B)

## What It Does
The script reads rental listings from `listings.txt` and sends each one to a local LLM. The model returns these fields as JSON:

| Field | Description |
|-------|-------------|
| `price` | Monthly rent |
| `location` | Area and city |
| `rooms` | Number of rooms |
| `furnished` | Furnishing status |

If a field isn't mentioned in the listing, the model returns `null`, which Python prints as `None`.

## Concepts Practised
- Running an LLM locally with the `ollama` Python client
- Prompt engineering: asking for JSON only and saying what to do with missing data
- Inserting each listing into the prompt with an f-string
- Converting the model's text reply to a Python dictionary with `json.loads`
- Handling invalid model output with `try/except`
- Reading a file with a `with` block and splitting it into separate listings

## Example

**Input** (`listings.txt`, listings separated by a blank line):
```
Listing 1:
2 BHK apartment available for rent in Balkumari, Lalitpur. Monthly rent is NPR 25,000. The apartment is fully furnished and has WiFi, parking, and a balcony.

Listing 2:
Looking for tenants for a 1-bedroom room near Koteshwor. Rent is Rs. 15,000 per month. The room is semi-furnished and parking is available.

Listing 3:
Spacious 3 room flat available in Baneshwor, Kathmandu. Located close to colleges, supermarkets and public transport. The flat is unfurnished and has two bathrooms.
...
```

**Output:**
```
{'price': 25000, 'location': 'Balkumari, Lalitpur', 'rooms': 2, 'furnished': 'fully furnished'}
{'price': 15000, 'location': 'Koteshwor', 'rooms': 1, 'furnished': 'semi-furnished'}
{'price': None, 'location': 'Baneshwor, Kathmandu', 'rooms': 3, 'furnished': 'unfurnished'}
{'price': None, 'location': 'Imadol, Lalitpur', 'rooms': 2, 'furnished': 'furnished'}
{'price': 32000, 'location': 'Chabahil, Kathmandu', 'rooms': 2, 'furnished': True}
```

Results to note:
- Prices written as "NPR 25,000" and "Rs. 15,000" become plain numbers.
- Listings 3 and 4 give no rent, so `price` is `None` rather than a made-up value.
- "2 BHK" and "1-bedroom" are both read correctly as a number of rooms.

## Known Limitation
The `furnished` field isn't consistent. The model sometimes copies the listing's wording (`'fully furnished'`) and sometimes returns a true/false value (`True`). This happens because the prompt names the fields but doesn't say what type of value each should hold.

**Planned improvement:** describe each field's type in the prompt, pass a JSON schema with Ollama's `format=` parameter, and set `temperature` to `0` so the output always has the same shape.

## Run Locally
1. Install [Ollama](https://ollama.com/download) and download the model:
   ```bash
   ollama pull qwen3:1.7b
   ```
2. Install the Python client:
   ```bash
   pip install ollama
   ```
3. Run the script from this folder:
   ```bash
   python listing_extractor.py
   ```

To try your own listings, edit `listings.txt` and keep a blank line between each listing.

## Files
```
Listing Extractor/
├── listing_extractor.py   # Reads listings, prompts the model, parses JSON
└── listings.txt           # Sample rental listings
```

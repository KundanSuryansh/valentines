# Quiz Questions JSON Format

## Format Structure

The `quizQuestions` field in the Google Sheet "home" tab should contain a **JSON array** of question objects.

Each question object has:
- `q` - The question text (string)
- `a` - Array of 4 answer options (array of 4 strings)
- `c` - Correct answer index (number: 0, 1, 2, or 3)

**Important:** The answer index `c` is **0-based**:
- `0` = First option
- `1` = Second option  
- `2` = Third option
- `3` = Fourth option

## Complete Example JSON

Copy this entire JSON string into the `quizQuestions` cell in your Google Sheet "home" tab:

```json
[{"q":"What's my favorite thing about you?","a":["Your laugh","Your smile","Your kindness","Everything"],"c":3},{"q":"Where would I take you for a perfect date?","a":["Somewhere cozy","Somewhere adventurous","Anywhere you are","A surprise"],"c":2},{"q":"What do I love most about us?","a":["Our conversations","Our adventures","Our quiet moments","All of the above"],"c":3},{"q":"What's your favorite memory of us?","a":["Our first date","When we laughed until we cried","That quiet morning together","All of them"],"c":3},{"q":"What makes me smile the most?","a":["Your jokes","Your voice","Your presence","Everything about you"],"c":3}]
```

## Formatted (for readability)

Here's the same example formatted for easier editing:

```json
[
  {
    "q": "What's my favorite thing about you?",
    "a": ["Your laugh", "Your smile", "Your kindness", "Everything"],
    "c": 3
  },
  {
    "q": "Where would I take you for a perfect date?",
    "a": ["Somewhere cozy", "Somewhere adventurous", "Anywhere you are", "A surprise"],
    "c": 2
  },
  {
    "q": "What do I love most about us?",
    "a": ["Our conversations", "Our adventures", "Our quiet moments", "All of the above"],
    "c": 3
  },
  {
    "q": "What's your favorite memory of us?",
    "a": ["Our first date", "When we laughed until we cried", "That quiet morning together", "All of them"],
    "c": 3
  },
  {
    "q": "What makes me smile the most?",
    "a": ["Your jokes", "Your voice", "Your presence", "Everything about you"],
    "c": 3
  }
]
```

## How to Use

1. **Write your questions** in the formatted version above (easier to read/edit)
2. **Minify the JSON** using [jsonformatter.org](https://jsonformatter.org) or any JSON minifier
3. **Copy the minified version** (single line, no spaces)
4. **Paste into Google Sheet** in the "home" tab, Column B, row with `quizQuestions` in Column A

## Field Details

### Question Object Structure

```json
{
  "q": "Your question text here?",
  "a": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "c": 0
}
```

- **`q`** (required): The question text
- **`a`** (required): Array of exactly 4 answer options
- **`c`** (required): Index of the correct answer (0-3)

### Answer Index Reference

- `c: 0` → First option is correct
- `c: 1` → Second option is correct
- `c: 2` → Third option is correct
- `c: 3` → Fourth option is correct

## Tips

1. **Always provide exactly 4 options** - The quiz UI expects 4 answers
2. **Use 0-based indexing** - Remember that `c: 0` means the first answer
3. **Minify before pasting** - Google Sheets works best with single-line JSON
4. **Test your JSON** - Use [jsonlint.com](https://jsonlint.com) to validate before pasting
5. **Escape quotes** - If your question/answers contain quotes, escape them: `"What's your favorite \"thing\"?"`

## Example with Special Characters

```json
[{"q":"What's your favorite \"memory\" of us?","a":["Option 1","Option 2","Option 3","Option 4"],"c":0}]
```

## Troubleshooting

- **Quiz not showing?** - Check that `quizQuestions` is spelled correctly in Column A
- **JSON parse error?** - Validate your JSON at jsonlint.com
- **Wrong answers marked correct?** - Double-check your `c` values (remember 0-based indexing)
- **Missing options?** - Ensure you have exactly 4 items in the `a` array

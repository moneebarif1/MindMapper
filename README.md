# KeyWord Summarizer Chrome Extension

A Chrome extension that uses Google's Summarizer API to create summaries of selected text with keyword-based context.

## Demo

Watch the extension in action: [YouTube Demo](https://youtu.be/ILvvBo81DCE)

## Features

- Select and summarize any text from web pages
- Add keywords for context-based summarization
- Clean, bullet-point presentation of summaries
- Easy-to-use interface

## Known Issues

### Keyword Context Issue
While the extension successfully summarizes selected text, there's a current limitation with the keyword context functionality:
- The summarizer is not consistently picking up the provided keywords in the context
- This appears to be a limitation with how the context is being processed by the summarizer API
- The summaries are still generated but may not be as specifically focused on the provided keywords as intended

## How to Use

1. Install the extension
2. Enter your keywords in the input field (comma-separated)
3. Select text on any webpage
4. Click "Summarize selected text"
5. View your bullet-point summary

## Technical Details

- Built with React and TypeScript
- Uses Google Chrome's Summarizer API
- Implements modern UI/UX practices

## Future Improvements

- Improve keyword context processing
- Add support for multiple summarization styles
- Implement summary saving functionality
- Add export options for summaries

## Contributing

Feel free to contribute to this project by:
1. Reporting bugs
2. Suggesting improvements
3. Creating pull requests

## License

This project is part of a developer competition testing Google Chrome's Summarizer API.

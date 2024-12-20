# YouTube Transcript Node for n8n

This is a custom node for n8n that retrieves the transcript of a YouTube video using its video ID. It integrates the functionality provided by the `youtube-transcript` library.

## Features
- Fetches the transcript of a YouTube video.
- Outputs the transcript in a structured JSON format, including offset, duration, language, and text.
- Supports error handling with an option to continue on failure.

## Installation
You can install this node into your n8n instance using the community node feature:

1. Open your n8n project.
2. Navigate to **Settings** > **Community Nodes**.
3. Search for the custom node repository and install it into your project.
4. Restart your n8n instance if necessary.

Alternatively, you can clone this repository into your n8n custom nodes folder and build the project.

## Node Parameters
- **Video ID**: The ID of the YouTube video for which you want to fetch the transcript. This parameter is required.

## Example Usage
1. Add the **YouTube Transcript** node to your n8n workflow.
2. Provide the `Video ID` parameter with the ID of the YouTube video you want to process.
3. Execute the workflow.

### Example Output
Below is an example of the JSON output:

```json
{
  "youtubeId": "fdsadas3",
  "transcript": [
    {
      "text": "Hey guys, welcome to leonardo grigorio channel",
      "duration": 6.12,
      "offset": 1,
      "lang": "pt"
    },
    {
      "text": "we will be talking a lot on AI development",
      "duration": 6.601,
      "offset": 3.719,
      "lang": "pt"
    },
    {
      "text": "and langchain",
      "duration": 5.12,
      "offset": 7.12,
      "lang": "pt"
    }
  ]
}
```

## Acknowledgments
This node integrates the [`youtube-transcript`](https://github.com/Kakulukian/youtube-transcript) library created by Kakulukian. The library performs the actual job of fetching the transcript from YouTube. Full credit for the transcript functionality belongs to its creator.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy using the YouTube Transcript Node in your n8n workflows! If you encounter any issues, feel free to contribute or report them in the project's repository.

/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
/* eslint-disable n8n-nodes-base/node-class-description-outputs-wrong */
/* eslint-disable n8n-nodes-base/node-class-description-inputs-wrong-regular-node */
import {
	IDataObject,
	NodeConnectionType,
	NodeOperationError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import YTDlpWrap from 'yt-dlp-wrap';

export class YoutubeTranscripter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YouTube Transcript',
		name: 'youtubeTranscripter',
		icon: 'file:youtube.svg',
		group: ['transform'],
		version: 1,
		description: 'Fetches the transcript of a YouTube video using yt-dlp',
		defaults: {
			name: 'YouTube Transcript',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Video ID or URL',
				name: 'videoId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID or URL of the YouTube video to fetch the transcript for',
			},
			{
				displayName: 'Binary Path',
				name: 'binaryPath',
				type: 'string',
				required: true,
				default: 'yt-dlp',
				description: 'Path to the yt-dlp binary',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const videoId = this.getNodeParameter('videoId', itemIndex) as string;
				const binaryPath = this.getNodeParameter('binaryPath', itemIndex) as string;

				if (!videoId) {
					throw new NodeOperationError(this.getNode(), 'The video ID/URL parameter is empty.', {
						itemIndex,
					});
				}

				const ytDlp = new YTDlpWrap(binaryPath);

				// Convert video ID to URL if needed
				const videoUrl = videoId.includes('youtube.com') || videoId.includes('youtu.be') 
					? videoId 
					: `https://www.youtube.com/watch?v=${videoId}`;

				// Get video info including subtitles
				const videoInfo = await ytDlp.getVideoInfo(videoUrl);

				// Extract automatic captions or manual subtitles
				const subtitles = videoInfo.subtitles || {};
				const autoCaptions = videoInfo.automatic_captions || {};

				// Try to get English subtitles first, then fall back to auto-generated captions
				const transcript = subtitles.en || subtitles.en_US || autoCaptions.en || autoCaptions.en_US;

				if (!transcript) {
					throw new NodeOperationError(this.getNode(), 'No English transcript found for this video.', {
						itemIndex,
					});
				}

				// Format transcript entries
				const formattedTranscript = transcript.map((entry: any) => ({
					text: entry.text,
					start: entry.start,
					duration: entry.duration,
				}));

				returnData.push({
					json: {
						youtubeId: videoId,
						transcript: formattedTranscript,
						metadata: {
							title: videoInfo.title,
							duration: videoInfo.duration,
							uploader: videoInfo.uploader,
							uploadDate: videoInfo.upload_date,
						},
					},
				});
			} catch (error: unknown) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message } as IDataObject,
						pairedItem: { item: itemIndex },
					});
					continue;
				}

				throw error;
			}
		}
		return [returnData];
	}
}

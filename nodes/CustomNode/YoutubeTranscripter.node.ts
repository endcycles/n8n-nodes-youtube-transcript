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
import { YoutubeTranscript } from 'youtube-transcript';

export class YoutubeTranscripter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YouTube Transcript',
		name: 'youtubeTranscripter',
		icon: 'file:youtube.svg',
		group: ['transform'],
		version: 1,
		description: 'Fetches the transcript of a YouTube video using the video ID.',
		defaults: {
			name: 'YouTube Transcript',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Video ID',
				name: 'videoId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the YouTube video to fetch the transcript for',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
	
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const videoId = this.getNodeParameter('videoId', itemIndex) as string;
	
				if (!videoId) {
					throw new NodeOperationError(this.getNode(), 'The video ID parameter is empty.', {
						itemIndex,
					});
				}
	
				const transcript = await YoutubeTranscript.fetchTranscript(videoId);

				returnData.push({
					json: {
						youtubeId: videoId,
						transcript,
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


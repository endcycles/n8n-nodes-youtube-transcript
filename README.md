# Get the Source Documents from the Q&A Chain Agent

**Custom n8n Node for Question-Answering with Source Document Output**

---

## Overview

`n8n-nodes-chain-retrieval-qa` is a custom n8n node that leverages the LangChain library to perform question-answering tasks using retrieved documents. This node includes an optional feature to output the source documents that contributed to the response, providing enhanced traceability and transparency.

## Features

- **Question Answering**: Ask questions based on retrieved documents.
- **Source Document Output**: Enable optional output of source documents for better traceability.
- **Integration with LangChain**: Uses LangChain's Retrieval QA Chain for powerful retrieval and response generation.

### Add to Your n8n Setup

1. Place the installed package into your n8n custom node directory.
2. Restart your n8n instance to load the new node.

---

## Usage

### Input

This node requires two inputs:

1. **Model**: A language model for generating responses (e.g., OpenAI, HuggingFace).
2. **Retriever**: A retriever to fetch relevant documents from a data source.

### Parameters

- **Query**: The question or input for the QA system.
- **Return Source Documents**: Enable this option to include the documents that contributed to the response in the output.
- **Options**:
  - **System Prompt Template**: Customize the system prompt for context-aware responses.

### Output

The output includes:

1. **Response**: The generated answer to the query.
2. **Source Documents (optional)**: An array of documents used to generate the response (if enabled).

---

## Examples

### Example Workflow

1. Add the `Question and Answer Chain with Source Documents` node to your workflow.
2. Connect it to:
   - A language model node (e.g., OpenAI or HuggingFace).
   - A retriever node for fetching relevant documents.
3. Configure the parameters as needed.

#### Example Output

```json
{
	"response": "n8n is a powerful workflow automation tool.",
	"documents": [
		{ "content": "n8n is an open-source workflow automation tool." },
		{ "content": "It allows users to automate tasks across various services." }
	]
}
```

### n8n Node example:

```json
{
	"nodes": [
		{
			"parameters": {
				"options": {}
			},
			"type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
			"typeVersion": 1,
			"position": [80, -140],
			"id": "fe2997f6-f581-419d-be40-ff85fac3b6e8",
			"name": "OpenAI Chat Model",
			"credentials": {
				"openAiApi": {
					"id": "7KA1OCyTLjMmwqUx",
					"name": "OpenAi account"
				}
			}
		},
		{
			"parameters": {},
			"type": "@n8n/n8n-nodes-langchain.retrieverVectorStore",
			"typeVersion": 1,
			"position": [260, -120],
			"id": "cc94a29c-8b8f-4fbc-b7bf-0f3df0fc8b02",
			"name": "Vector Store Retriever"
		},
		{
			"parameters": {
				"options": {}
			},
			"type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
			"typeVersion": 1.1,
			"position": [480, 100],
			"id": "77a18ee1-8586-48a0-b4b9-f7bd0b9582b6",
			"name": "Embeddings OpenAI",
			"credentials": {
				"openAiApi": {
					"id": "7KA1OCyTLjMmwqUx",
					"name": "OpenAi account"
				}
			}
		},
		{
			"parameters": {},
			"type": "n8n-nodes-base.executeWorkflowTrigger",
			"typeVersion": 1,
			"position": [-220, -520],
			"id": "92dae8a6-d6b7-4ae5-b5d6-4cc58d743208",
			"name": "Execute Workflow Trigger"
		},
		{
			"parameters": {
				"options": {}
			},
			"type": "CUSTOM.chainRetrievalQaWithSourceDocuments",
			"typeVersion": 1.4,
			"position": [120, -520],
			"id": "097833c9-30cf-4786-b50a-32f3ecc9a651",
			"name": "Question and Answer Chain With Source Documents"
		}
	],
	"connections": {
		"OpenAI Chat Model": {
			"ai_languageModel": [
				[
					{
						"node": "Question and Answer Chain With Source Documents",
						"type": "ai_languageModel",
						"index": 0
					}
				]
			]
		},
		"Vector Store Retriever": {
			"ai_retriever": [
				[
					{
						"node": "Question and Answer Chain With Source Documents",
						"type": "ai_retriever",
						"index": 0
					}
				]
			]
		},
		"Embeddings OpenAI": {
			"ai_embedding": [[]]
		},
		"Execute Workflow Trigger": {
			"main": [
				[
					{
						"node": "Question and Answer Chain With Source Documents",
						"type": "main",
						"index": 0
					}
				]
			]
		}
	},
	"pinData": {
		"Execute Workflow Trigger": [
			{
				"query": {
					"message": "Are there any one bedroom apartment?"
				}
			}
		]
	}
}
```

---

## Development

### Prerequisites

- Node.js >= 18.10
- pnpm >= 9.1

### Clone and Build

1. Clone the repository:
   ```bash
   git clone https://github.com/leonardogrig/n8n-metadata-chain-retrieval-qa.git
   cd n8n-metadata-chain-retrieval-qa
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Author

**Leonardo Grigorio Araujo**  
Email: [leonardogrig@gmail.com](mailto:leonardogrig@gmail.com)  
GitHub: [leonardogrig](https://github.com/leonardogrig)

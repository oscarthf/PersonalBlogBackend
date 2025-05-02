import express, { Request, Response } from 'express'
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID!

app.get('/posts', async (req: Request, res: Response) => {
  const response = await notion.databases.query({ database_id: databaseId });

  const posts = response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Name.title[0]?.plain_text || 'No title',
    content: page.properties.Content?.rich_text[0]?.plain_text || 'No content'
  }));

  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

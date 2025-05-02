import express, { Request, Response } from 'express'
import cors from 'cors';
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

app.set('trust proxy', true);

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
  ? 'https://personalblog-x8vq.onrender.com'
  : 'http://localhost:3000',
  credentials: true
}));

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID!

app.get('/posts', async (req: Request, res: Response) => {
  const response = await notion.databases.query({ database_id: databaseId });

  const posts = response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Name.title[0]?.plain_text || 'No title',
    content: page.properties.Content?.rich_text[0]?.plain_text || 'No content',
    published: page.properties.Published.checkbox || false,
    date: page.properties.Date.date?.start || 'No date',
    slug: page.properties.Slug.rich_text[0]?.plain_text || 'No slug'
  }));

  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

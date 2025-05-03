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
    const start = parseInt(req.query.start as string) || 0
    const limit = parseInt(req.query.limit as string) || 10

    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [{ property: 'Date', direction: 'descending' }],
        page_size: 100
    });

    const allPosts = response.results
        .filter((page: any) => page.properties.Published.checkbox)
        .sort((a: any, b: any) => {
            const dateA = a.properties.Date?.date?.start
            const dateB = b.properties.Date?.date?.start
          
            // Push null dates to the end
            if (!dateA && !dateB) return 0
            if (!dateA) return 1
            if (!dateB) return -1
          
            return new Date(dateB).getTime() - new Date(dateA).getTime()
        })
        .map((page: any) => ({
            id: page.id,
            title: page.properties.Name.title[0]?.plain_text || 'No title',
            content: page.properties.Content?.rich_text[0]?.plain_text || 'No content',
            published: true,
            date: page.properties.Date?.date?.start || 'No date',
            slug: page.properties.Slug.rich_text[0]?.plain_text || 'No slug'
        }))

    const visiblePosts = allPosts.slice(start, start + limit)

    res.json(visiblePosts)
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
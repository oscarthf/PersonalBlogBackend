# PersonalBlogBackend

### About
#### This is the repository for the backend of my personal blog (https://github.com/oscarthf/PersonalBlog). Anyone can use this code to create their own website.

## Stack:

```
Notion CMS for blog posts
```

## To do:

```
0. Add caching for Notion API requests.
```

## Environment Variables needed:

```
NOTION_TOKEN=<NOTION_TOKEN>
NOTION_POSTS_DATABASE_ID=<NOTION_POSTS_DATABASE_ID>
NOTION_SECTIONS_DATABASE_ID=<NOTION_SECTIONS_DATABASE_ID>
PRODUCTION_URL=<PRODUCTION_URL>
```

## To create .env file

```
0. Create a blank text file called ".env" with no other extension.
1. Copy the above environment variables and remove the place holders.
2. Follow the steps bellow to obtain the above environment variables.
```

## To create Notion API Token and Database ID:

```
0. Create a Notion account.
1. Create a Notion integration and obtain the API token.
2. Create a Notion database for blog posts and obtain the database ID.
    * Select new blank page.
    * Type /database and select Database (full page).
    * Select the new table and rename it to Posts.
    * Add the following properties (and types):
        * Name (title)
        * Slug (text)
        * Published (checkbox)
        * Date (date)
        * Content (text)
3. Create a Notion database for sections and obtain the database ID.
    * Select new blank page.
    * Type /database and select Database (full page).
    * Select the new table and rename it to Sections.
    * Add the following properties (and types):
        * Name (title)
        * Section (text)
        * Header (text)
        * Content (text)
    * Currently the sections are hardcoded in the frontend (["home", "blog", "about"]), but this will be changed in the future.
4. Currenty the header and content may contain breaks using "\n" and links using the format:
    [Display text](https://www.yourpage.com)
```

## For Local Deployment (With Docker):

```
0. Clone this repo using the command:
    git clone https://github.com/oscarthf/PersonalBlogBackend
1. Navigate to the root folder of the repo using the command:
    cd PersonalBlogBackend
2. Build the container using the command:
    docker build -t personal-blog-backend .
3. Run the container using the command:
    docker run -p 5000:5000 personal-blog-backend
4. Open your browser and go to http://localhost:5000/posts or http://localhost:5000/sections
```

## For Local Deployment (No Docker):

```
0. Clone this repo using the command:
    git clone https://github.com/oscarthf/PersonalBlogBackend
1. Navigate to the root folder of the repo using the command:
    cd PersonalBlogBackend
2. Install the dependencies using the command:
    npm install
    npx tsc
3. Run the express.js server using the command:
    node dist/index.js
4. Open your browser and go to http://localhost:5000/posts or http://localhost:5000/sections
```

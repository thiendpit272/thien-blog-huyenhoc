import {BlogDetail, BlogPost} from '../types/blog'
import {discussionDetailGql, discusstionGql} from './gql'

const API_URL = 'https://api.github.com/graphql'
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID

export async function getBlogs(): Promise<BlogPost[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: discusstionGql(DISCUSSION_CATEGORY_ID)}),
  })
  let res = await response.json()
  const discussions = res.data.repository.discussions.nodes
  const posts = discussions.map((discussion: any): BlogPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = discussion
    const url = `/blog/${id}`
    const authorUrl = author.url
    const authorName = author.login
    const tags: string[] = labels.nodes.map((tag: {name: string}) => {
      return tag.name
    })
    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags,
      createdAt,
      lastEdited,
      author: {url: authorUrl, name: authorName},
    }
    return post
  })
  return posts
}

export async function getBlogDetail(blogId: number): Promise<BlogDetail> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query: discussionDetailGql(blogId)}),
  })
  let res = await response.json()
  let discussion = res.data.repository.discussion
  const {
    author: {url: authorUrl, login: authorName},
    createdAt,
    title: title,
    bodyHTML: html,
  } = discussion
  const detail = {
    author: {url: authorUrl, name: authorName},
    createdAt,
    title,
    bodyHTML: html,
  }
  return detail
}
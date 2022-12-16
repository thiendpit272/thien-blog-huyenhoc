export function discusstionGql(
  githubDiscusstionCategoryId: string | undefined
) {
  return `{
    repository(owner: "thiendpit272", name: "thien-blog-huyenhoc") {
      discussions(first: 100, categoryId: "${githubDiscusstionCategoryId}") {
        nodes {
          title
          url
          bodyText
          number
          bodyHTML
          createdAt
          lastEditedAt
          author {
            login
            url
          }
          labels(first: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }`
}

//single post
// Single post
export function discussionDetailGql(postId: number | undefined) {
  return `{
    repository(owner: "thiendpit272", name: "thien-blog-huyenhoc") {
      discussion(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
        }
      }
    }
  }`
}

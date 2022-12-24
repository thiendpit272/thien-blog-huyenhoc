import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {useMemo, useState} from 'react'
import BlogPreview from '../components/BlogPreview'
import {getBlogs} from '../server/blogs'
import {BlogPost} from '../types/blog'

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter))
        })
      : blogData
  }, [filterWord])

  const filterLabel = (tag: any, idx: number) => {
    if (selectedIndex.includes(idx)) {
      setSelectedIndex(selectedIndex.filter((id) => id !== idx))
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText))
    } else {
      setSelectedIndex([...selectedIndex, idx])
      setFilterWord([...filterWord, tag.innerText])
    }
  }

  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center text-neutral-900 font-comfortaa">
      <title>Trang chủ</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem] text-red-500">Huyền Học Khai Tâm</h1>
          <p>
            Đây là nơi chia sẻ kiến thức huyền học chính thống nhất của Kiều
            Phước Thiện.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center text=[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, idx: number) => {
            return (
              <button
                className={`${
                  selectedIndex.includes(idx)
                    ? 'label-selected hover:bg-sky-400 transition-all duration-300'
                    : 'label hover:bg-sky-400 transition-all duration-300'
                }`}
                key={idx}
                onClick={(e) => filterLabel(e.target, idx)}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-slate-800 hover:text-neutral-500 transition-all duration-300 mb-3"
              key={blog.id}
            >
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  console.log(tags)
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  }
}

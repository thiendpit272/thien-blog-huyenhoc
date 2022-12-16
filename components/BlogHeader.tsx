import React from 'react'

interface headerProps {
  createdAt: string
  author: {
    name: string
    url: string
  }
}

const BlogHeader: React.FC<headerProps> = (props) => {
  const {createdAt, author} = props
  return (
    <div className="flex flex-col">
      <p className="font-semibold text=[1rem]">Kiều Phước Thiện</p>
      <p className="list-none font-normal text=[0.85rem] mb-2">
        https://www.facebook.com/kieuphuocthien9
      </p>
    </div>
  )
}

export default BlogHeader

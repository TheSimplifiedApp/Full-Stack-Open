import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    user: 'user1Id1',
    title: 'blog1',
    author: 'author1',
    url: 'url1',
    likes: 0,
  }

  const likeButtonClicked = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} likeBlog={likeButtonClicked} />
    ).container
  })

  test('5.13: renders a blog\'s title and author, but not URL or number of likes by default', () => {
    const title_author = screen.getByText('blog1 - author1')
    expect(title_author).toBeDefined()

    const blogDetail = container.querySelector('.blogDetails')
    expect(blogDetail).toHaveStyle('display: none')
  })

  test('5.14: click to show url and number of likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const blogDetail = container.querySelector('.blogDetails')
    expect(blogDetail).toHaveStyle('display: block')
  })

  test('5.15: click like button twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(likeButtonClicked.mock.calls).toHaveLength(2)
  })
})

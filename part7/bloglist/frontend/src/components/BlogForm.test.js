import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('5.16: BlogForm', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const component = render(<BlogForm create={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'blog title')
  await user.type(authorInput, 'blog author')
  await user.type(urlInput, 'blog url')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'blog title',
    author: 'blog author',
    url: 'blog url',
  })
})

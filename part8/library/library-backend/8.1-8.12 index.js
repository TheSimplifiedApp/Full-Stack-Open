const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `
type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}

type Book {
  title: String!
  published: Int!
  author: String!
  genres: [String!]!
  id: ID!
}

type Query {
  authorCount: Int!
  bookCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}

type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

const resolvers = {
  Query: {
    // 8.1: The number of books and authors
    bookCount: () => books.length,
    authorCount: () => authors.length,

    // 8.2: All books
    // allBooks: () => books,

    // 8.3: All authors
    allAuthors: () => authors,

    // 8.4: Books of an author
    // 8.5: Books by genre
    allBooks: (root, args) => {

      if (args.author && args.genre) return books.filter(b => b.author === args.author && b.genres.includes(args.genre))

      if (args.author) return books.filter(b => b.author === args.author)

      if (args.genre) return books.filter(b => b.genres.includes(args.genre))

      return books

    }
  },
  // 8.3: All authors
  Author: {
    bookCount: (root) => {
      return books.filter(b => b.author === root.name).length
    }
  },

  Mutation: {
    // 8.6: Adding a book
    addBook: (root, args) => {

      if(books.find(b => b.title === args.title)) {
        throw new GraphQLError('Book already exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)

      if (!authors.find(a => a.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuid() })
      }

      return book
    },
    // 8.7: Updating the birth year of an author
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, { listen: { port: 4000 } })
  .then(({ url }) => { console.log(`Server ready at ${url}`) })
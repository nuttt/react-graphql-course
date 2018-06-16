const resolvers = require('./resolvers')

describe('Query', () => {
  describe('posts', () => {
    it('returns all posts', async () => {
      const findMock = jest.fn().mockReturnValue([{
        title: 'พบศพ'
      }, {}, {}])
      const context = {
        models: {
          Post: {
            find: findMock
          }
        }
      }
      const posts = await resolvers.Query.posts({}, {}, context)
      expect(posts).toHaveLength(3)
      expect(posts[0].title).toEqual('พบศพ')
      expect(findMock).toHaveBeenCalledTimes(1)
    })
  })
})

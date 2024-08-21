import { test } from '@japa/runner'

test.group('Conversions store', () => {
  test('make conversion', async ({ assert, client }) => {
    const sourceUrlMock = 'https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt'
    const payload = {
      sourceUrl: sourceUrlMock,
    }

    const response = await client.post('/v1/conversions').json(payload)
    const body = response.body()

    assert.properties(body, ['id', 'url', 'sourceUrls', 'createdAt'])
    assert.isString(body.id)
    assert.isString(body.url)
    assert.isArray(body.sourceUrls)
    assert.include(body.sourceUrls, sourceUrlMock)
    assert.isObject(body.createdAt)
  })
})

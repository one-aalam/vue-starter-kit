export default (req, res) => {
    const url = new URL('http://example.com' + req.url)
    console.log('-- Call Props', url.searchParams.toString())

    const routeName = url.searchParams.get('name') || ''
    const isClient = url.searchParams.get('client') && url.searchParams.get('client') == true || false

    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=86400, stale-while-revalidate'
    )

    const resp = JSON.stringify({
        server: !isClient,
        message: `This is page "${routeName.toUpperCase()}"`,
    })

    res.end(
      resp
    )
}

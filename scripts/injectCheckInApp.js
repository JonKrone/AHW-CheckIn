/**
 * This file is intended to be loaded as a script in a site.
 * It will then inject the AHW Check-in app into the site in an element with an ID of 'check-in-app'
 */

;(function() {
  const CDN_URI_BASE = 'https://cdn.jsdelivr.net/gh/JonKrone/ahw-check-in'

  /**
   * @param {string} extra
   * @param {string} sha
   */
  const createURI = (sha, extra) => `${CDN_URI_BASE}@${sha}/build/${extra}`

  // Get the ref of the master branch for cache-busting
  const fetchMasterSHA = () =>
    fetch('https://api.github.com/repos/jonkrone/ahw-check-in/git/refs')
      .then(d => d.json())
      .then(refs => {
        const master = refs.find(({ ref }) => /refs\/heads\/master/.test(ref))
        if (master) {
          return master.object.sha
        }

        throw new Error(
          'Was not able to fetch SHA of ahw-check-in master branch'
        )
      })

  /** @param {any} sha */
  const fetchManifest = sha =>
    fetch(createURI(sha, 'asset-manifest.json')).then(d => d.json())

  /** @param {string} src */
  const addScript = src => {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
  }

  /** @param {string} href */
  const addLink = href => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }

  fetchMasterSHA().then(sha => {
    return (
      fetchManifest(sha)
        // data is of shape { files: Record<string, string>, entrypoints: string[] }
        .then(data => {
          data.entrypoints
            .map(entry => createURI(sha, entry))
            .forEach(entry => {
              if (/.css$/.test(entry)) addLink(entry)
              else addScript(entry)
            })
        })
    )
  })
})()

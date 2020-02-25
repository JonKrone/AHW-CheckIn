/**
 * This file is intended to be loaded as a scrit in a site.
 * It will then inject the AHW Check-in app into the app, pulling from CRA's manifest
 */

const CDN_URI_BASE = 'https://cdn.jsdelivr.net/gh/JonKrone/ahw-check-in@latest'

/** @param {string} extra */
const createURI = extra => `${CDN_URI_BASE}/${extra}`

const fetchManifest = () =>
  fetch(createURI('build/asset-manifest.json')).then(d => d.json())

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

// data is of shape { files: Record<string, string>, entrypoints: string[] }
fetchManifest().then(data => {
  /** @param {string} entry */
  data.entrypoints.map(createURI).forEach(entry => {
    if (/.css$/.test(entry)) addLink(entry)
    else addScript(entry)
  })
})

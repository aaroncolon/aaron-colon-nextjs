// Generate Map of all Page Slugs for SSG
export function getAllPageIdsCatchAll() {
  const parsedMenu = []

  menuPrimary.forEach((item) => {
    parsedMenu.push({
      params: {
        slug: [item.slug]
      }
    })

    if (item.children.length) {
      item.children.forEach((child) => {
        if (!child.skipCatchAll) {
          parsedMenu.push({
            params: {
              slug: [item.slug, child.slug]
            }
          })
        }
      })
    }
  })

  return parsedMenu

  // return [
  //   {
  //     params: {
  //       slug: ['vaccines']
  //     }
  //   },
  //   {
  //     params: {
  //       slug: ['vaccines', 'ingredients']
  //     }
  //   },
  //   {
  //     params: {
  //       slug: ['emf']
  //     }
  //   }
  // ]
}

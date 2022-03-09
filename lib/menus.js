import { fetchApi } from './api'

export async function getMenuByName(name) {
  const q = {
    query: `
      query MenuQuery($id: ID = "") {
        menu(
          id: $id,
          idType: NAME
        ) {
          id
          menuItems {
            nodes {
              url
              title
              target
              cssClasses
              databaseId
              parentId
              id
              linkRelationship
              label
            }
          }
        }
      }
    `,
    variables: {
      "id": name
    }
  }

  const data = await fetchApi(q)

  return data
}

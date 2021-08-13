//this qeury check if userLogged have already a chatRoom whit user
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          chatRoom{
           id
           chatRoomUsers{
             items{
                chatRoomID
               user{
                 id
                 name
                 imageUri
               }
             }
           }
         }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
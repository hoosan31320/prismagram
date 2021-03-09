export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        id
        text
        user{
          email
          username
          firstName
        }
    }
`;
import createDataContext from './createDataContext';


const blogReducer = (state, action) => {
   switch (action.type) {
      case 'add_blogPost':
         return [...state,
         {
            id: Math.floor(Math.random() * 99999),
            title: action.payload.title,
            content: action.payload.content
         }]
      case 'delete_blogPost':
         return state.filter(((blogPost) => blogPost.id !== action.payload));

      case 'update_blogPost':
         return state.map((blogPost) => {
            return blogPost.id === action.payload.id ? action.payload : blogPost

         })
      default:
         return state;
   }
}
const addBlogPost = (dispatch) => {
   return (title, content, callbackFunc) => {
      dispatch({ type: 'add_blogPost', payload: { title: title, content: content } });
      if (callbackFunc)
         callbackFunc();
   }
}

const deleteBlogPost = (dispatch) => {
   return (id) => {
      dispatch({ type: 'delete_blogPost', payload: id })
   }
}

const updateBlogPost = (dispatch) => {
   return (id, title, content, callbackFunc) => {
      dispatch(
         {
            type: 'update_blogPost',
            payload:
            {
               id: id,
               title: title,
               content: content
            }
         });
      if (callbackFunc)
         callbackFunc();
   }
}



export const { Context, Provider } = createDataContext(
   blogReducer,
   {
      addBlogPostFunc: addBlogPost,
      deleteBlogPostFunc: deleteBlogPost,
      updateBlogPost
   }, [{ id: 1, title: "Blog Post #1", content: 'Content for blog post 1 ' }]
)
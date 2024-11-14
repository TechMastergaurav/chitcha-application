import express from "express"

import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../middlewares/multer.js"
import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentOfPosts, getUserPost, likePost } from "../controllers/post.controller.js"
const router = express.Router()
router.route("/addpost").post(isAuthenticated,upload.single('image'),addNewPost)
router.route("/all").post(isAuthenticated,getAllPost)
router.route("/userpost/all").get(isAuthenticated,getUserPost)
router.route('/:id/like').get(isAuthenticated,likePost)
router.route('/:id/dislike').post(isAuthenticated,dislikePost)
router.route('/:id/comment').post(isAuthenticated,addComment)
router.route('/:id/comment/all').get(isAuthenticated,getCommentOfPosts)
router.route('/delete/:id').post(isAuthenticated,deletePost)
router.route("/:id/bookmark").post(isAuthenticated,bookMarkPost)

export default router;